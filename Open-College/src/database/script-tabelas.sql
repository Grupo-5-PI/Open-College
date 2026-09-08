-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE opencollege;
USE opencollege;

CREATE TABLE tblInstituicao (
    idInstituicao INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    cnpj CHAR(14) UNIQUE NOT NULL
);

CREATE TABLE tblAreaGeral (
    idAreaGeral INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) UNIQUE NOT NULL,
    descricao VARCHAR(500)
);

CREATE TABLE tblAreaEspecifica (
    idAreaEspecifica INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) UNIQUE NOT NULL,
    descricao VARCHAR(500),
    idAreaGeral INT NOT NULL,
    CONSTRAINT FK_tblAreaEspecifica_tblAreaGeral 
		FOREIGN KEY (idAreaGeral) 
			REFERENCES tblAreaGeral (idAreaGeral)
);

CREATE TABLE tblCurso (
    idCurso INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    formacao VARCHAR(20) NOT NULL,
    idAreaEspecifica INT NOT NULL,
    CONSTRAINT FK_tblCurso_tblAreaEspecifica 
		FOREIGN KEY (idAreaEspecifica) 
			REFERENCES tblAreaEspecifica (idAreaEspecifica),
    CONSTRAINT CK_tblCurso_formacao 
		CHECK (formacao IN ('Bacharelado', 'Licenciatura', 'Tecnólogo'))
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
    idPolo INT PRIMARY KEY AUTO_INCREMENT,
    idInstituicao INT NOT NULL,
    cep CHAR(8) NOT NULL,
    uf CHAR(2) NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    rua VARCHAR(150) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    CONSTRAINT FK_tblPolo_tblInstituicao 
		FOREIGN KEY (idInstituicao) 
			REFERENCES tblInstituicao (idInstituicao),
    CONSTRAINT CK_tblPolo_uf 
		CHECK (uf IN (
        'AC','AL','AP','AM','BA','CE','DF','ES','GO',
        'MA','MT','MS','MG','PA','PB','PR','PE','PI',
        'RJ','RN','RS','RO','RR','SC','SP','SE','TO'))
);

CREATE TABLE tblInstituicaoPoloCurso (
    idInstituicao INT NOT NULL,
    idPolo INT NOT NULL,
    idCurso INT NOT NULL,
    qtdVagas INT NOT NULL,
    qtdMatriculas INT NOT NULL DEFAULT 0,
    tipoModalidade VARCHAR(20) NOT NULL,
    PRIMARY KEY (idInstituicao, idPolo, idCurso),
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
		CHECK (tipoModalidade IN ('Presencial', 'Semipresencial', 'EAD'))
);

CREATE TABLE tblAtualizacao (
    idAtualizacao INT PRIMARY KEY AUTO_INCREMENT,
    idUsuario INT NOT NULL,
    idCurso INT,
    idAreaGeral INT,
    idAreaEspecifica INT,
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
			REFERENCES tblAreaGeral (idAreaGeral),
    CONSTRAINT FK_tblAtualizacao_tblAreaEspecifica 
		FOREIGN KEY (idAreaEspecifica) 
			REFERENCES tblAreaEspecifica (idAreaEspecifica)
);

CREATE TABLE tblCenso (
    idCenso INT PRIMARY KEY AUTO_INCREMENT,
    ano INT NOT NULL,
    uf CHAR(2) NOT NULL,
    idMunicipio CHAR(7) NOT NULL,
    tipoOrganizacaoAcademica VARCHAR(100) NOT NULL,
    idCurso INT NOT NULL,
    tipoGrauAcademico VARCHAR(50) NOT NULL,
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




