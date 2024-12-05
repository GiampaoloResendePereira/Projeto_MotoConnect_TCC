CREATE DATABASE moto_connect ;

USE moto_connect ;

CREATE TABLE cadastro_administrador (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO cadastro_administrador (nome, email, senha) 
VALUES ('Giampaolo', 'giampaolo@gmail.com', 'giam123');

CREATE TABLE cadastro_cliente (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO cadastro_cliente (nome, email, senha) 
VALUES ('Vitor', 'vitor@gmail.com', 'vitor123');


CREATE TABLE cadastro_motoboy (
  id INT(11) NOT NULL AUTO_INCREMENT,
  nome VARCHAR(255) NOT NULL,
  cpf VARCHAR(20) NOT NULL,
  telefone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  senha VARCHAR(255) NOT NULL,
  placa_moto VARCHAR(20) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO cadastro_motoboy (nome, cpf, telefone, email, senha, placa_moto) 
VALUES ('Motoboy Nome', '123.456.789-00', '21987654321', 'gabriel@gmail.com', 'gabriel123', 'ABC-1234');


CREATE TABLE parametro_frete (
  id INT AUTO_INCREMENT PRIMARY KEY,
  menos_1kg DECIMAL(10, 2) NOT NULL,
  entre_1kge3kg DECIMAL(10, 2) NOT NULL,
  entre_3kge8kg DECIMAL(10, 2) NOT NULL,
  entre_8kge12kg DECIMAL(10, 2) NOT NULL,
  acima_12kg VARCHAR(255) NOT NULL,
  km_rodado DECIMAL(10, 2) NOT NULL,
  tempo_deslocamento DECIMAL(10, 2) NOT NULL
);

INSERT INTO parametro_frete (menos_1kg, entre_1kge3kg, entre_3kge8kg, entre_8kge12kg, acima_12kg, km_rodado, tempo_deslocamento)
VALUES (3.00, 5.00, 9.00, 12.00, 'Não é possível transportar', 0.50, 0.30);

 CREATE TABLE distancias_cep (
  id INT NOT NULL AUTO_INCREMENT,
  cep_origem VARCHAR(8) NOT NULL,
  cep_destino VARCHAR(8) NOT NULL,
  distancia_km DECIMAL(10,2) NOT NULL,
  tempo_deslocamento_min DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE cep (
id INT NOT NULL AUTO_INCREMENT,
cep VARCHAR(8) NOT NULL,
 PRIMARY KEY (id)
);

INSERT INTO cep (cep) VALUES
(36010000),
(36020000),
(36030000),
(36107979),
(36010971),
(36013970);



INSERT INTO distancias_cep (cep_origem, cep_destino, distancia_km, tempo_deslocamento_min) VALUES
(36010000, 36010000, 0.0, 5.0),
(36010000, 36020000, 2.5, 5.0),
(36010000, 36030000, 5.0, 10.0),
(36010000, 36107979, 15.0, 20.0),
(36010000, 36010971, 3.0, 6.0),
(36010000, 36013970, 6.0, 12.0),

(36020000, 36010000, 2.5, 5.0),
(36020000, 36020000, 0.0, 5.0),
(36020000, 36030000, 3.0, 7.0),
(36020000, 36107979, 10.0, 17.5),
(36020000, 36010971, 7.5, 13.0),
(36020000, 36013970, 5.5, 11.0),

(36030000, 36010000, 5.0, 10.0),
(36030000, 36020000, 3.0, 7.0),
(36030000, 36030000, 0.0, 5.0),
(36030000, 36107979, 15.0, 20.0),
(36030000, 36010971, 8.5, 16.0),
(36030000, 36013970, 9.0, 18.0),

(36107979, 36010000, 15.0, 20.0),
(36107979, 36020000, 10.0, 17.5),
(36107979, 36030000, 15.0, 20.0),
(36107979, 36107979, 0.0, 5.0),
(36107979, 36010971, 5.0, 10.0),
(36107979, 36013970, 11.0, 20.0),

(36010971, 36010000, 3.0, 6.0),
(36010971, 36020000, 7.5, 13.0),
(36010971, 36030000, 8.5, 16.0),
(36010971, 36107979, 5.0, 10.0),
(36010971, 36010971, 0.0, 5.0),
(36010971, 36013970, 8.0, 15.0),

(36013970, 36010000, 6.0, 12.0),
(36013970, 36020000, 5.5, 11.0),
(36013970, 36030000, 9.0, 18.0),
(36013970, 36107979, 11.0, 20.0),
(36013970, 36010971, 8.0, 15.0),
(36013970, 36013970, 0.0, 5.0);



CREATE TABLE solicitacoes_frete (
  id INT NOT NULL AUTO_INCREMENT,
  cep_origem VARCHAR(8) NOT NULL,
  endereco_origem VARCHAR(255) NOT NULL,
  bairro_origem VARCHAR(255) NOT NULL,
  numero_origem VARCHAR(10) NOT NULL,
  nome_origem VARCHAR(255) NOT NULL,
  telefone_origem VARCHAR(20) NOT NULL,
  cep_destino VARCHAR(8) NOT NULL,
  endereco_destino VARCHAR(255) NOT NULL,
  bairro_destino VARCHAR(255) NOT NULL,
  numero_destino VARCHAR(10) NOT NULL,
  nome_destino VARCHAR(255) NOT NULL,
  telefone_destino VARCHAR(20) NOT NULL,
  peso DECIMAL(5, 2) NOT NULL,
  altura DECIMAL(5, 2) NOT NULL,
  largura DECIMAL(5, 2) NOT NULL,
  comprimento DECIMAL(5, 2) NOT NULL,
  valor_frete DECIMAL(10, 2) NOT NULL,
  distancia DECIMAL(10, 2) NOT NULL,
  tempo_deslocamento DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'aguardando',
  PRIMARY KEY (id)
);

-- Pedidos Aguardando
INSERT INTO solicitacoes_frete (cep_origem, endereco_origem, bairro_origem, numero_origem, nome_origem, telefone_origem, cep_destino, endereco_destino, bairro_destino, numero_destino, nome_destino, telefone_destino, peso, altura, largura, comprimento, valor_frete, distancia, tempo_deslocamento, status) VALUES
(36010000, 'Rua A', 'Centro', '100', 'Maria Silva', '3216549870', 36020000, 'Rua B', 'São Mateus', '200', 'João Souza', '3216549871', 3.50, 10.00, 20.00, 30.00, 120.00, 5.00, 15.00, 'aguardando'),
(36020000, 'Rua C', 'Alto dos Passos', '101', 'Pedro Lima', '3216549872', 36030000, 'Rua D', 'Santa Luzia', '201', 'Carla Mendes', '3216549873', 4.75, 12.00, 22.00, 32.00, 130.00, 6.00, 20.00, 'aguardando'),
(36030000, 'Rua E', 'São Pedro', '102', 'Ana Paula', '3216549874', 36040000, 'Rua F', 'Nova Era', '202', 'Carlos Alberto', '3216549875', 2.80, 14.00, 24.00, 34.00, 110.00, 7.00, 18.00, 'aguardando'),
(36040000, 'Rua G', 'Benfica', '103', 'José Ferreira', '3216549876', 36010000, 'Rua H', 'Granbery', '203', 'Mariana Souza', '3216549877', 3.00, 16.00, 26.00, 36.00, 140.00, 8.00, 25.00, 'aguardando');

-- Pedidos Em Andamento
INSERT INTO solicitacoes_frete (cep_origem, endereco_origem, bairro_origem, numero_origem, nome_origem, telefone_origem, cep_destino, endereco_destino, bairro_destino, numero_destino, nome_destino, telefone_destino, peso, altura, largura, comprimento, valor_frete, distancia, tempo_deslocamento, status) VALUES
(36010000, 'Rua P', 'Santa Terezinha', '207', 'Letícia Ferreira', '3216549885', 36020000, 'Rua J', 'Progresso', '204', 'Lucas Andrade', '3216549879', 5.50, 18.00, 28.00, 38.00, 160.00, 9.00, 30.00, 'em andamento'),
(36020000, 'Rua K', 'Vitorino Braga', '105', 'Fábio Moreira', '3216549880', 36030000, 'Rua L', 'Barbosa Lage', '205', 'Juliana Almeida', '3216549881', 6.25, 20.00, 30.00, 40.00, 170.00, 10.00, 35.00, 'em andamento');

-- Pedidos Finalizados
INSERT INTO solicitacoes_frete (cep_origem, endereco_origem, bairro_origem, numero_origem, nome_origem, telefone_origem, cep_destino, endereco_destino, bairro_destino, numero_destino, nome_destino, telefone_destino, peso, altura, largura, comprimento, valor_frete, distancia, tempo_deslocamento, status) VALUES
(36030000, 'Rua M', 'Mariano Procópio', '106', 'Isabela Santos', '3216549882', 36040000, 'Rua N', 'Jardim Glória', '206', 'Vinicius Costa', '3216549883', 4.20, 22.00, 32.00, 42.00, 150.00, 11.00, 28.00, 'finalizado'),
(36040000, 'Rua O', 'Paula Lima', '107', 'Ricardo Silva', '3216549884', 36010000, 'Rua P', 'Santa Terezinha', '207', 'Letícia Ferreira', '3216549885', 2.90, 24.00, 34.00, 44.00, 125.00, 12.00, 22.00, 'finalizado');


INSERT INTO solicitacoes_frete (cep_origem, endereco_origem, bairro_origem, numero_origem, nome_origem, telefone_origem, cep_destino, endereco_destino, bairro_destino, numero_destino, nome_destino, telefone_destino, peso, altura, largura, comprimento, valor_frete, distancia, tempo_deslocamento, status) VALUES
(36010000, 'Rua A', 'Centro', '100', 'Maria Silva', '3216549870', 36020000, 'Rua B', 'São Mateus', '200', 'João Souza', '3216549871', 3.50, 10.00, 20.00, 30.00, 120.00, 5.00, 15.00, 'aguardando'),
(36020000, 'Rua C', 'Alto dos Passos', '101', 'Pedro Lima', '3216549872', 36030000, 'Rua D', 'Santa Luzia', '201', 'Carla Mendes', '3216549873', 4.75, 12.00, 22.00, 32.00, 130.00, 6.00, 20.00, 'aguardando'),
(36030000, 'Rua E', 'São Pedro', '102', 'Ana Paula', '3216549874', 36040000, 'Rua F', 'Nova Era', '202', 'Carlos Alberto', '3216549875', 2.80, 14.00, 24.00, 34.00, 110.00, 7.00, 18.00, 'aguardando'),
(36040000, 'Rua G', 'Benfica', '103', 'José Ferreira', '3216549876', 36010000, 'Rua H', 'Granbery', '203', 'Mariana Souza', '3216549877', 3.00, 16.00, 26.00, 36.00, 140.00, 8.00, 25.00, 'aguardando'),
(36010000, 'Rua I', 'Granville', '104', 'Fernanda Silva', '3216549878', 36020000, 'Rua J', 'Progresso', '204', 'Lucas Andrade', '3216549879', 5.50, 18.00, 28.00, 38.00, 160.00, 9.00, 30.00, 'aguardando'),
(36020000, 'Rua K', 'Vitorino Braga', '105', 'Fábio Moreira', '3216549880', 36030000, 'Rua L', 'Barbosa Lage', '205', 'Juliana Almeida', '3216549881', 6.25, 20.00, 30.00, 40.00, 170.00, 10.00, 35.00, 'aguardando'),
(36030000, 'Rua M', 'Mariano Procópio', '106', 'Isabela Santos', '3216549882', 36040000, 'Rua N', 'Jardim Glória', '206', 'Vinicius Costa', '3216549883', 4.20, 22.00, 32.00, 42.00, 150.00, 11.00, 28.00, 'aguardando'),
(36040000, 'Rua O', 'Paula Lima', '107', 'Ricardo Silva', '3216549884', 36010000, 'Rua P', 'Santa Terezinha', '207', 'Letícia Ferreira', '3216549885', 2.90, 24.00, 34.00, 44.00, 125.00, 12.00, 22.00, 'aguardando');
