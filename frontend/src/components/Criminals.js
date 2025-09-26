import React, { useState } from 'react';

function Criminals({ criminals, setCriminals }) {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [address, setAddress] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();
    fetch('http://localhost:5000/api/criminals', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, age: parseInt(age), gender, address })
    })
    .then(res => res.json())
    .then(data => {
      const newCriminal = { criminal_id: data.id, name, age: parseInt(age), gender, address };
      setCriminals([...criminals, newCriminal]);
      setName(''); setAge(''); setGender(''); setAddress('');
    });
  }

  return (
    <div>
      <h2>Criminals</h2>
      <form onSubmit={handleAdd} className="form">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Age" value={age} onChange={e => setAge(e.target.value)} required />
        <input placeholder="Gender" value={gender} onChange={e => setGender(e.target.value)} required />
        <input placeholder="Address" value={address} onChange={e => setAddress(e.target.value)} required />
        <button type="submit" className="btn">Add Criminal</button>
      </form>
      <table border="1">
        <thead><tr><th>ID</th><th>Name</th><th>Age</th><th>Gender</th><th>Address</th></tr></thead>
        <tbody>
          {criminals.map(c => <tr key={c.criminal_id}><td>{c.criminal_id}</td><td>{c.name}</td><td>{c.age}</td><td>{c.gender}</td><td>{c.address}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}

export default Criminals;
