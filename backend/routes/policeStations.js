const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all stations
router.get('/', (req, res) => {
  db.query('SELECT * FROM Police_Station', (err, results) => {
    if(err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add new station
router.post('/', (req, res) => {
  const { station_name, location, contact_number } = req.body;
  db.query('INSERT INTO Police_Station (station_name, location, contact_number) VALUES (?, ?, ?)',
    [station_name, location, contact_number],
    (err, result) => {
      if(err) return res.status(500).json(err);
      res.json({ message: 'Station added', id: result.insertId });
    });
});

module.exports = router;
