import mysql from 'mysql2/promise';

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "moto_connect"
};

let db;
try {
  db = await mysql.createConnection(dbConfig);
  console.log('Conectado ao banco de dados MySQL');
} catch (error) {
  console.error('Erro ao conectar ao banco de dados:', error);
}

export default db;
