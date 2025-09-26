import React, { useState, useEffect } from 'react';

function Crimes({ stations, officers }) {
  const [crimes, setCrimes] = useState([]);
  const [crimeType, setCrimeType] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [stationId, setStationId] = useState('');
  const [officerId, setOfficerId] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/crimes')
      .then(res => res.json())
      .then(data => setCrimes(data));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/crimes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crime_type: crimeType, date_of_crime: date, location, station_id: parseInt(stationId), officer_id: parseInt(officerId) })
    })
    .then(res => res.json())
    .then(data => {
      const newCrime = { crime_id: data.id, crime_type: crimeType, date_of_crime: date, location, station_id: parseInt(stationId), officer_id: parseInt(officerId) };
      setCrimes([...crimes, newCrime]);
      setCrimeType(''); setDate(''); setLocation(''); setStationId(''); setOfficerId('');
    });
  }

  return (
    <div>
      <h2>Crimes</h2>
      <form onSubmit={handleAdd} className="form">
        <input placeholder="Crime Type" value={crimeType} onChange={e => setCrimeType(e.target.value)} required />
        <input type="date" value={date} onChange={e => setDate(e.target.value)} required />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
        <select value={stationId} onChange={e => setStationId(e.target.value)} required>
          <option value="">Select Station</option>
          {stations.map(s => <option key={s.station_id} value={s.station_id}>{s.station_name}</option>)}
        </select>
        <select value={officerId} onChange={e => setOfficerId(e.target.value)} required>
          <option value="">Select Officer</option>
          {officers.map(o => <option key={o.officer_id} value={o.officer_id}>{o.name}</option>)}
        </select>
        <button type="submit" className="btn">Add Crime</button>
      </form>
      <table border="1">
        <thead><tr><th>ID</th><th>Type</th><th>Date</th><th>Location</th><th>Station ID</th><th>Officer ID</th></tr></thead>
        <tbody>
          {crimes.map(c => <tr key={c.crime_id}><td>{c.crime_id}</td><td>{c.crime_type}</td><td>{c.date_of_crime}</td><td>{c.location}</td><td>{c.station_id}</td><td>{c.officer_id}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default Crimes;
