import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
<<<<<<< HEAD
  database: 'farmacia1',
=======
  database: 'farmacia',
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;
