import React, { useState } from 'react';

function Victims({ victims, setVictims }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/victims', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: parseInt(age), gender, address })
    })
    .then(res => res.json())
    .then(data => {
      const newVictim = { victim_id: data.id, name, age: parseInt(age), gender, address };
      setVictims([...victims, newVictim]);
      setName(''); setAge(''); setGender(''); setAddress('');
    });
  }

  return (
    <div>
      <h2>Victims</h2>
      <form onSubmit={handleAdd} className="form">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />
        <input placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} required />
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <button type="submit" className="btn">Add Victim</button>
      </form>
      <table border="1">
        <thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Address</th></tr></thead>
        <tbody>
          {victims.map(v => <tr key={v.victim_id}><td>{v.victim_id}</td><td>{v.name}</td><td>{v.age}</td><td>{v.gender}</td><td>{v.address}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default Victims;
