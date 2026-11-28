import os
from pathlib import Path
import requests
import spacy
import mysql.connector
from datetime import datetime
from dotenv import load_dotenv

caminho_env = Path(__file__).resolve().parents[2] / ".env"
load_dotenv(dotenv_path=caminho_env)

nlp = spacy.load("pt_core_news_sm")


NEWS_API_URL = "https://newsapi.org/v2/everything"
NEWS_API_KEY = os.getenv("NEWS_API_KEY")

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "port": int(os.getenv("DB_PORT", 3306)),
    "user": os.getenv("DB_USER"),
    "password": os.getenv("DB_PASSWORD"),
    "database": os.getenv("DB_DATABASE") or os.getenv("DB_NAME") or "opencollege"
}

def definir_setor(lemas):
    if any(t in lemas for t in ["tecnologia", "ti", "software", "programação", "programador",
        "desenvolvedor", "dados", "ia", "artificial", "computação", "sistema", "digital"]):
        return "tecnologia"

    if any(t in lemas for t in ["saúde", "medicina", "médico", "enfermagem", "enfermeiro",
        "hospital", "psicologia", "fisioterapia", "nutrição", "farmácia", "odontologia"]):
        return "saude"

    if any(t in lemas for t in ["engenharia", "engenheiro", "indústria", "industrial",
        "construção", "civil", "elétrica", "mecânica", "automação", "infraestrutura"]):
        return "engenharia"

    if any(t in lemas for t in ["administração", "negócio", "gestão", "gestor", "financeiro",
        "finanças", "economia", "contabilidade", "vendas", "comercial", "empreendedorismo", "rh"]):
        return "administracao"

    if any(t in lemas for t in ["direito", "jurídico", "advogado", "advocacia", "justiça", "tribunal"]):
        return "direito"

    if any(t in lemas for t in ["comunicação", "marketing", "publicidade", "jornalismo", "mídia", "branding"]):
        return "comunicacao"

    if any(t in lemas for t in ["design", "designer", "ux", "ui", "interface", "gráfico", "arquitetura"]):
        return "design"

    if any(t in lemas for t in ["educação", "ensino", "professor", "docente", "pedagogia",
        "escola", "faculdade", "universidade", "graduação", "licenciatura"]):
        return "educacao"

    return "geral"

def calcular_pontuacao(titulo, descricao):
    texto_inteiro = f"{titulo} {descricao}".lower()
    doc = nlp(texto_inteiro)
    lemas = [token.lemma_ for token in doc]
    
    nota = 0
    
    if any(termo in lemas for termo in ["mercado", "trabalho", "trabalhar", "empregabilidade",
        "emprego", "vaga", "carreira", "profissional", "contratação",
        "demissão", "demitir", "layoff", "crise", "desemprego"]):
        nota += 3
    
    if any(termo in lemas for termo in ["graduação", "graduar", "graduado", "ensino", "superior",
        "faculdade", "universidade", "universitário", "curso", "educação", "formação"]):
        nota += 2
    
    if any(termo in lemas for termo in ["futebol", "famoso", "polícia", "trânsito"]):
        nota -= 3
        
    setor = definir_setor(lemas)
    return nota, setor


def envio_banco():
    if not NEWS_API_KEY:
        print("ERRO: A chave de API NEWS KEY não foi encontrada no arquivo .env")
        return
    
    print("1. Buscando notícias na NewsAPI...")
    params = {
        "q": '"mercado de trabalho" OR "empregabilidade" OR "ensino superior"',
        "language": "pt",
        "sortBy": "publishedAt",
        "pageSize": 25,
        "apiKey": NEWS_API_KEY
    }
    
    
    response = requests.get(NEWS_API_URL, params=params)
    
    if response.status_code != 200:
        print(f"Erro ao acessar NewsAPI (Status {response.status_code}): {response.text}")
        return
    
    artigos = response.json().get("articles", [])
    print(f"2. {len(artigos)} notícias recebidas. Processando com spaCy...")
    
    try:
        conexao = mysql.connector.connect(**DB_CONFIG)
        cursor = conexao.cursor()
    except mysql.connector.Error as erro:
        print(f"Erro ao conectar no MySQL: {erro}")
        return
    
    
    fk_usuario_teste = 1
    noticias_salvas = 0
    
    for artigo in artigos:
        titulo = (artigo.get("title") or "").strip()[:150]
        descricao = (artigo.get("description") or "").strip()
        url = (artigo.get("url") or "").strip()[:255]
        data = artigo.get("publishedAt")
        
        
        if not titulo or not url or titulo == "[Removed]":
            continue
        
        nota, setor = calcular_pontuacao(titulo, descricao)
        
        print(f"   -> Nota {nota} [{setor}]: {titulo[:65]}...")
        
        if nota >= 3:
            cursor.execute("SELECT idNoticia FROM tblNoticia WHERE url = %s", (url,))
            if cursor.fetchone() is not None:
                continue
            
            data_noticia = (
                datetime.strptime(data[:19], "%Y-%m-%dT%H:%M:%S")
                if data else datetime.now()
            )
            
            sql_insert = """
                INSERT INTO tblNoticia (titulo, descricao, url, dtNoticia, setor, nota, fkUsuario)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
            """
            valores = (
                titulo,
                descricao,
                url,
                data_noticia,
                setor,
                nota,
                fk_usuario_teste
            )

            cursor.execute(sql_insert, valores)
            conexao.commit()
            noticias_salvas += 1
            print(f"   [SALVA | Nota {nota}] {titulo}")

    cursor.close()
    conexao.close()
    print(f"3. Concluído! {noticias_salvas} novas notícias inseridas na tblNoticia.")
    
if __name__ == "__main__":
    envio_banco()