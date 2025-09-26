import React, { useState, useEffect } from 'react';

function Officers({ stations, setOfficers }) {
  const [officers, setLocalOfficers] = useState([]);
  const [name, setName] = useState('');
  const [rank, setRank] = useState('');
  const [stationId, setStationId] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/officers')
      .then(res => res.json())
      .then(data => { setLocalOfficers(data); setOfficers(data); });
  }, [setOfficers]);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/officers', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, officer_rank: rank, station_id: parseInt(stationId) })
    })
    .then(res => res.json())
    .then(data => {
      const newOfficer = { officer_id: data.id, name, officer_rank: rank, station_id: parseInt(stationId) };
      setLocalOfficers([...officers, newOfficer]);
      setOfficers(prev => [...prev, newOfficer]); // Update global state for Crimes
      setName(''); setRank(''); setStationId('');
    });
  }

  return (
    <div>
      <h2>Police Officers</h2>
      <form onSubmit={handleAdd} className="form">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Rank" value={rank} onChange={e => setRank(e.target.value)} required />
        <select value={stationId} onChange={e => setStationId(e.target.value)} required>
          <option value="">Select Station</option>
          {stations.map(s => <option key={s.station_id} value={s.station_id}>{s.station_name}</option>)}
        </select>
        <button type="submit" className="btn">Add Officer</button>
      </form>
      <table border="1">
        <thead><tr><th>ID</th><th>Name</th><th>Rank</th><th>Station ID</th></tr></thead>
        <tbody>
          {officers.map(o => <tr key={o.officer_id}><td>{o.officer_id}</td><td>{o.name}</td><td>{o.officer_rank}</td><td>{o.station_id}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default Officers;
