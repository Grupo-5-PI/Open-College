-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
CREATE DATABASE IF NOT EXISTS opencollege;
USE opencollege;

CREATE TABLE tblInstituicao (
    idInstituicao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cnpj CHAR(14) UNIQUE NOT NULL
);

CREATE TABLE tblAreaGeral (
    idAreaGeral INT PRIMARY KEY,
    nome VARCHAR(150) UNIQUE NOT NULL,
    descricao VARCHAR(500)
);

CREATE TABLE tblCurso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(300) NOT NULL,
    formacao VARCHAR(20) NOT NULL,
    idAreaGeral INT,
    CONSTRAINT CK_tblCurso_formacao 
		CHECK (formacao IN ('Bacharelado', 'Licenciatura', 'Tecnólogo', 'Tecnológico')),
	CONSTRAINT FK_tblCurso_idAreaGeral 
		FOREIGN KEY (idAreaGeral) 
			REFERENCES tblAreaGeral (idAreaGeral)
);

CREATE TABLE tblUf(
  idUf INT PRIMARY KEY,
  sigla CHAR(2) NOT NULL,
  nome VARCHAR(30) NOT NULL,
  CONSTRAINT CK_tblUf_sigla 
    CHECK (sigla IN (
          'AC','AL','AP','AM','BA','CE','DF','ES','GO',
          'MA','MT','MS','MG','PA','PB','PR','PE','PI',
          'RJ','RN','RS','RO','RR','SC','SP','SE','TO'))
);

INSERT INTO tblUf (idUf, sigla, nome) VALUES 
(11, 'RO', 'Roraima'),
(12, 'AC', 'Acre'),
(13, 'AM', 'Amazonas'),
(14, 'RR', 'Roraima'),
(15, 'PA', 'Pará'),
(16, 'AP', 'Amapá'),
(17, 'TO', 'Tocantins'),
(21, 'MA', 'Maranhão'),
(22, 'PI', 'Piauí'),
(23, 'CE', 'Ceará'),
(24, 'RN', 'Rio Grande do Norte'),
(25, 'PB', 'Paraíba'),
(26, 'PE', 'Pernambuco'),
(27, 'AL', 'Alagoas'),
(28, 'SE', 'Sergipe'),
(29, 'BA', 'Bahia'),
(31, 'MG', 'Minas Gerais'),
(32, 'ES', 'Espírito Santo'),
(33, 'RJ', 'Rio de Janeiro'),
(35, 'SP', 'São Paulo'),
(41, 'PR', 'Paraná'),
(42, 'SC', 'Santa Catarina'),
(43, 'RS', 'Rio Grande do Sul'),
(50, 'MS', 'Mato Grosso do Sul'),
(51, 'MT', 'Mato Grosso'),
(52, 'GO', 'Goiás'),
(53, 'DF', 'Distrito Federal');

CREATE TABLE tblMunicipio(
  idMunicipio INT PRIMARY KEY AUTO_INCREMENT,
  idUf INT NOT NULL,
  nome VARCHAR(60) NOT NULL,
  CONSTRAINT FK_tblMunicipio_tblUf 
    FOREIGN KEY (idUf) 
      REFERENCES tblUf (idUf)
);

CREATE TABLE tblUsuario (
    idUsuario INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    cpf CHAR(11) UNIQUE NOT NULL,
    telefone VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    foto VARCHAR(255),
    tipo VARCHAR(30) NOT NULL,
    idInstituicao INT,
    administrador BIT NOT NULL,
    CONSTRAINT FK_tblUsuario_tblInstituicao 
    FOREIGN KEY (idInstituicao) 
      REFERENCES tblInstituicao (idInstituicao),
    CONSTRAINT CK_tblUsuario_tipo 
    CHECK (tipo IN ('Gerente de Marketing', 'Analista de Marketing', 'Investidor'))
);

CREATE TABLE tblPolo (
    idPolo INT,
    idInstituicao INT,
    idMunicipio INT, 
    bairro VARCHAR(100) NOT NULL,
    logradouro VARCHAR(150) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    CONSTRAINT PK_tblPolo
		PRIMARY KEY (idPolo, idInstituicao),
    CONSTRAINT FK_tblPolo_tblInstituicao 
		FOREIGN KEY (idInstituicao) 
			REFERENCES tblInstituicao (idInstituicao),
    CONSTRAINT FK_tblPolo_tblMunicipio 
      FOREIGN KEY (idMunicipio) 
        REFERENCES tblMunicipio (idMunicipio)
);

CREATE TABLE tblInstituicaoPoloCurso (
	  idInstituicaoPoloCurso INT NOT NULL,
    idInstituicao INT NOT NULL,
    idPolo INT NOT NULL,
    idCurso INT NOT NULL,
    qtdVagas INT NOT NULL DEFAULT 0,
    qtdMatriculas INT NOT NULL DEFAULT 0,
    tipoModalidade VARCHAR(20) NOT NULL,
    turno VARCHAR(20) NOT NULL, 
    dataUltimaAtualizacao DATE, 
    metaQtdMatriculas INT NOT NULL DEFAULT 0,
    metaData DATE, 
    PRIMARY KEY (idInstituicaoPoloCurso, idInstituicao, idPolo),
    CONSTRAINT FK_tblInstituicaoPoloCurso_tblInstituicao 
		FOREIGN KEY (idInstituicao) 
			REFERENCES tblInstituicao (idInstituicao),
    CONSTRAINT FK_tblInstituicaoPoloCurso_tblPolo 
		FOREIGN KEY (idPolo) 
			REFERENCES tblPolo (idPolo),
    CONSTRAINT FK_tblInstituicaoPoloCurso_tblCurso 
		FOREIGN KEY (idCurso) 
			REFERENCES tblCurso (idCurso),
    CONSTRAINT CK_tblInstituicaoPoloCurso_qtdVagas 
		CHECK (qtdVagas >= 0),
    CONSTRAINT CK_tblInstituicaoPoloCurso_qtdMatriculas 
		CHECK (qtdMatriculas >= 0),
    CONSTRAINT CK_tblInstituicaoPoloCurso_tipoModalidade 
		CHECK (tipoModalidade IN ('Presencial', 'Semipresencial', 'EAD')),
	CONSTRAINT CK_tblInstituicaoPoloCurso_turno
		CHECK (turno IN ('Diurno', 'Noturno'))
);

CREATE TABLE tblSolicitacaoEntrada(
	idInstituicao INT NOT NULL, 
    idUsuario INT NOT NULL, 
    dataSolicitacao DATE DEFAULT (CURRENT_DATE) NOT NULL,
    dataAtualizacaoSolicitacao DATE, 
    solicitacaoAceita BIT,
    PRIMARY KEY (idInstituicao, idUsuario), 
    CONSTRAINT FK_tblSolicitacaoEntrada_tblInstituicao 
		FOREIGN KEY (idInstituicao)
			REFERENCES tblInstituicao (idInstituicao),
	CONSTRAINT FK_tblSolicitacaoEntrada_tblUsuario 
		FOREIGN KEY (idUsuario) 
			REFERENCES tblUsuario (idUsuario)
);

CREATE TABLE tblAtualizacao (
    idAtualizacao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idCurso INT,
    idAreaGeral INT,
    tipo VARCHAR(50) NOT NULL,
    conteudo VARCHAR(500) NOT NULL,
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    lida BIT NOT NULL DEFAULT 0,
    CONSTRAINT FK_tblAtualizacao_tblUsuario 
		FOREIGN KEY (idUsuario) 
			REFERENCES tblUsuario (idUsuario),
    CONSTRAINT FK_tblAtualizacao_tblCurso 
		FOREIGN KEY (idCurso) 
			REFERENCES tblCurso (idCurso),
    CONSTRAINT FK_tblAtualizacao_tblAreaGeral 
		FOREIGN KEY (idAreaGeral) 
			REFERENCES tblAreaGeral (idAreaGeral)
);

CREATE TABLE tblCenso (
    idCenso INT PRIMARY KEY AUTO_INCREMENT,
    ano INT NOT NULL,
    uf CHAR(2) NULL,
    idMunicipio CHAR(7) NULL,
    tipoOrganizacaoAcademica VARCHAR(100) NOT NULL,
    idCurso INT NOT NULL,
    tipoGrauAcademico VARCHAR(50) NULL,
    tipoModalidadeEnsino VARCHAR(50) NOT NULL,
    tipoNivelAcademico VARCHAR(50) NOT NULL,
    qtdVagas INT NOT NULL DEFAULT 0,
    qtdVagasDiurno INT DEFAULT 0,
    qtdVagasNoturno INT DEFAULT 0,
    qtdVagasEAD INT DEFAULT 0,
    qtdVagasNovas INT DEFAULT 0,
    qtdInscritos INT DEFAULT 0,
    qtdIncritosDiurno INT DEFAULT 0,
    qtdIncritosNortuno INT DEFAULT 0,
    qtdIncritosEAD INT DEFAULT 0,
    qtdIncritosVagasNovas INT DEFAULT 0,
    qtdIngressantesFeminino INT DEFAULT 0,
    qtdIngressantesMasculino INT DEFAULT 0,
    qtdIngressantesDiurno INT DEFAULT 0,
    qtdIngressantesNoturno INT DEFAULT 0,
    qtdIngressantesVagasNovas INT DEFAULT 0,
    qtdIngressantes017 INT DEFAULT 0,
    qtdIngressantes1824 INT DEFAULT 0,
    qtdIngressantes2529 INT DEFAULT 0,
    qtdIngressantes3034 INT DEFAULT 0,
    qtdIngressantes3539 INT DEFAULT 0,
    qtdIngressantes4049 INT DEFAULT 0,
    qtdIngressantes5059 INT DEFAULT 0,
    qtdIngressantes60Mais INT DEFAULT 0,
    qtdMatricula INT DEFAULT 0,
    qtdMatriculaFeminino INT DEFAULT 0,
    qtdMatriculaMasculino INT DEFAULT 0,
    qtdMatriculaDiurno INT DEFAULT 0,
    qtdMatriculaNoturno INT DEFAULT 0,
    qtdMatricula017 INT DEFAULT 0,
    qtdMatricula1824 INT DEFAULT 0,
    qtdMatricula2529 INT DEFAULT 0,
    qtdMatricula3034 INT DEFAULT 0,
    qtdMatricula3539 INT DEFAULT 0,
    qtdMatricula4049 INT DEFAULT 0,
    qtdMatricula5059 INT DEFAULT 0,
    qtdMatricula60Mais INT DEFAULT 0,
    qtdConcluintes INT DEFAULT 0,
    qtdConcluintesFeminino INT DEFAULT 0,
    qtdConcluintesMaculino INT DEFAULT 0,
    qtdConcluintesDiurno INT DEFAULT 0,
    qtdConcluintesNoturno INT DEFAULT 0,
    qtdConcluintes017 INT DEFAULT 0,
    qtdConcluintes1824 INT DEFAULT 0,
    qtdConcluintes2529 INT DEFAULT 0,
    qtdConcluintes3034 INT DEFAULT 0,
    qtdConcluintes3539 INT DEFAULT 0,
    qtdConcluintes4049 INT DEFAULT 0,
    qtdConcluintes5059 INT DEFAULT 0,
    qtdConcluintes60Mais INT DEFAULT 0,
    qtdAlunosSitTrancada INT DEFAULT 0,
    qtdAlunosSitDesvinculada INT DEFAULT 0,
    qtdAlunosSitTransferida INT DEFAULT 0,
    qtdIngressantesRedePublica INT DEFAULT 0,
    qtdIngressantesRedePrivada INT DEFAULT 0,
    qtdMatriculaRedePublica INT DEFAULT 0,
    qtdMatriculaRedePrivada INT DEFAULT 0,
    qtdConcluintesRedePublica INT DEFAULT 0,
    qtdConcluintesRedePrivada INT DEFAULT 0,
    CONSTRAINT FK_tblCenso_tblCurso 
		FOREIGN KEY (idCurso) 
			REFERENCES tblCurso (idCurso)
);

CREATE TABLE tblNoticia (
    idNoticia INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(150) NOT NULL,
    url VARCHAR(255) NOT NULL,
    dtNoticia DATETIME,
    setor VARCHAR(50),
    nota INT,
    descricao VARCHAR(500),
    fkUsuario INT,
    CONSTRAINT chUsuario
    FOREIGN KEY(fkUsuario)
    REFERENCES tblUsuario (idUsuario)
);

CREATE TABLE tblDashboardPersonalizado (
    idUsuario INT PRIMARY KEY,
    kpi VARCHAR(50) NULL,
    grafico VARCHAR(50) NULL,
    atualizadoEm TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT FK_tblDashboardPersonalizado_tblUsuario
        FOREIGN KEY (idUsuario)
        REFERENCES tblUsuario (idUsuario)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

    
CREATE TABLE tblLog (
    idLog INT PRIMARY KEY AUTO_INCREMENT,
    tipo VARCHAR(10) NOT NULL,
    descricao VARCHAR(2000) NOT NULL,
    dataHora DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT CK_tblLog_tipo
        CHECK (tipo IN ('INFO', 'AVISO', 'ERRO'))
);



