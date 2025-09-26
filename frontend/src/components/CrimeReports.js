import React, { useState, useEffect } from 'react';

function CrimeReports({ criminals, victims }) {
  const [reports, setReports] = useState([]);
  const [crimes, setCrimes] = useState([]);
  const [crimeId, setCrimeId] = useState('');
  const [criminalId, setCriminalId] = useState('');
  const [victimId, setVictimId] = useState('');
  const [status, setStatus] = useState('');
  const [remarks, setRemarks] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/reports').then(res => res.json()).then(data => setReports(data));
    fetch('http://localhost:5000/api/crimes').then(res => res.json()).then(data => setCrimes(data));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ crime_id: parseInt(crimeId), criminal_id: parseInt(criminalId), victim_id: parseInt(victimId), status, remarks })
    })
    .then(res => res.json())
    .then(data => {
      const newReport = { report_id: data.id, crime_id: parseInt(crimeId), criminal_id: parseInt(criminalId), victim_id: parseInt(victimId), status, remarks };
      setReports([...reports, newReport]);
      setCrimeId(''); setCriminalId(''); setVictimId(''); setStatus(''); setRemarks('');
    });
  }

  return (
    <div>
      <h2>Crime Reports</h2>
      <form onSubmit={handleAdd} className="form">
        <select value={crimeId} onChange={e => setCrimeId(e.target.value)} required>
          <option value="">Select Crime</option>
          {crimes.map(c => <option key={c.crime_id} value={c.crime_id}>{c.crime_type}</option>)}
        </select>
        <select value={criminalId} onChange={e => setCriminalId(e.target.value)} required>
          <option value="">Select Criminal</option>
          {criminals.map(c => <option key={c.criminal_id} value={c.criminal_id}>{c.name}</option>)}
        </select>
        <select value={victimId} onChange={e => setVictimId(e.target.value)} required>
          <option value="">Select Victim</option>
          {victims.map(v => <option key={v.victim_id} value={v.victim_id}>{v.name}</option>)}
        </select>
        <input placeholder="Status" value={status} onChange={e => setStatus(e.target.value)} required />
        <input placeholder="Remarks" value={remarks} onChange={e => setRemarks(e.target.value)} />
        <button type="submit" className="btn">Add Report</button>
      </form>
      <table border="1">
        <thead><tr><th>ID</th><th>Crime ID</th><th>Criminal ID</th><th>Victim ID</th><th>Status</th><th>Remarks</th></tr></thead>
        <tbody>
          {reports.map(r => <tr key={r.report_id}><td>{r.report_id}</td><td>{r.crime_id}</td><td>{r.criminal_id}</td><td>{r.victim_id}</td><td>{r.status}</td><td>{r.remarks}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default CrimeReports;
