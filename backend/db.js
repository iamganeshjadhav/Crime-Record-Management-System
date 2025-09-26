const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',   // your MySQL password
  database: 'CrimeRecordDB'
});

db.connect(err => {
  if(err) {
    console.error('Database connection error:', err);
  } else {
    console.log('Connected to CrimeRecordDB');
  }
});

module.exports = db;
