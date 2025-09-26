// server.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // your MySQL password
  database: 'CrimeRecordDB'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL Database');
});

// Test root route
app.get('/', (req, res) => {
  res.send('Crime Management System API is running');
});

// --------------------- API ROUTES ---------------------

// 1️⃣ Police Stations
app.get('/api/stations', (req, res) => {
  db.query('SELECT * FROM Police_Station', (err, results) => {
    if(err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/stations', (req, res) => {
  const { station_name, location, contact_number } = req.body;
  db.query('INSERT INTO Police_Station (station_name, location, contact_number) VALUES (?, ?, ?)',
    [station_name, location, contact_number],
    (err, result) => {
      if(err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// 2️⃣ Police Officers
app.get('/api/officers', (req, res) => {
  db.query('SELECT * FROM Police_Officer', (err, results) => {
    if(err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/officers', (req, res) => {
  const { name, officer_rank, station_id } = req.body;
  db.query('INSERT INTO Police_Officer (name, officer_rank, station_id) VALUES (?, ?, ?)',
    [name, officer_rank, station_id],
    (err, result) => {
      if(err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// 3️⃣ Criminals
app.get('/api/criminals', (req, res) => {
  db.query('SELECT * FROM Criminal', (err, results) => {
    if(err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/criminals', (req, res) => {
  const { name, age, gender, address, crime_history } = req.body;
  db.query('INSERT INTO Criminal (name, age, gender, address, crime_history) VALUES (?, ?, ?, ?, ?)',
    [name, age, gender, address, crime_history],
    (err, result) => {
      if(err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// 4️⃣ Victims
app.get('/api/victims', (req, res) => {
  db.query('SELECT * FROM Victim', (err, results) => {
    if(err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/victims', (req, res) => {
  const { name, age, gender, address } = req.body;
  db.query('INSERT INTO Victim (name, age, gender, address) VALUES (?, ?, ?, ?)',
    [name, age, gender, address],
    (err, result) => {
      if(err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// 5️⃣ Crimes
app.get('/api/crimes', (req, res) => {
  db.query('SELECT * FROM Crime', (err, results) => {
    if(err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/crimes', (req, res) => {
  const { crime_type, date_of_crime, location, station_id, officer_id } = req.body;
  db.query('INSERT INTO Crime (crime_type, date_of_crime, location, station_id, officer_id) VALUES (?, ?, ?, ?, ?)',
    [crime_type, date_of_crime, location, station_id, officer_id],
    (err, result) => {
      if(err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// 6️⃣ Crime Reports
app.get('/api/reports', (req, res) => {
  db.query('SELECT * FROM Crime_Report', (err, results) => {
    if(err) return res.status(500).send(err);
    res.json(results);
  });
});

app.post('/api/reports', (req, res) => {
  const { crime_id, criminal_id, victim_id, status, remarks } = req.body;
  db.query('INSERT INTO Crime_Report (crime_id, criminal_id, victim_id, status, remarks) VALUES (?, ?, ?, ?, ?)',
    [crime_id, criminal_id, victim_id, status, remarks],
    (err, result) => {
      if(err) return res.status(500).send(err);
      res.json({ id: result.insertId });
    }
  );
});

// --------------------- SERVER ---------------------
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
