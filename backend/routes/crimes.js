const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', (req, res) => {
  db.query('SELECT * FROM Crime', (err, results) => {
    if(err) return res.status(500).json(err);
    res.json(results);
  });
});

router.post('/', (req, res) => {
  const { crime_type, date_of_crime, location, station_id, officer_id } = req.body;
  db.query('INSERT INTO Crime (crime_type, date_of_crime, location, station_id, officer_id) VALUES (?, ?, ?, ?, ?)',
    [crime_type, date_of_crime, location, station_id, officer_id],
    (err, result) => {
      if(err) return res.status(500).json(err);
      res.json({ message: 'Crime added', id: result.insertId });
    });
});

module.exports = router;
