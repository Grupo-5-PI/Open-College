-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/

CREATE DATABASE projeto;

USE projeto;

CREATE TABLE usuario (
	idUsuario INT PRIMARY KEY AUTO_INCREMENT,
	nome VARCHAR(50),
	email VARCHAR(50),
	senha VARCHAR(50)
	
);

CREATE TABLE pontuacao (
	id INT PRIMARY KEY AUTO_INCREMENT,
	pontuacao INT,
	fkUsuario INT,
	acertos INT,
	erros INT,
	FOREIGN KEY (fkUsuario) REFERENCES usuario (idUsuario)
);




