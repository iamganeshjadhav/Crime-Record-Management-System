import React, { useState } from 'react';

function PoliceStations({ stations, setStations }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [contact, setContact] = useState('');

  const handleAdd = (e) => {
    e.preventDefault();

    // Trim and convert to lowercase for proper comparison
    const newName = name.trim().toLowerCase();
    const newContact = contact.trim();

    // Check duplicate station name
    const nameExists = stations.some(s => s.station_name.trim().toLowerCase() === newName);
    if (nameExists) {
      alert("Station name already exists!");
      return;
    }

    // Check duplicate contact
    const contactExists = stations.some(s => s.contact_number.trim() === newContact);
    if (contactExists) {
      alert("Contact number already used!");
      return;
    }

    // Optional: validate phone number format
    const phoneRegex = /^[0-9]{6,15}$/;
    if (!phoneRegex.test(newContact)) {
      alert("Enter a valid contact number (6-15 digits only)");
      return;
    }

    // Add new station
    fetch('http://localhost:5000/api/stations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ station_name: name, location, contact_number: contact })
    })
      .then(res => res.json())
      .then(data => {
        const newStation = { station_id: data.id, station_name: name, location, contact_number: contact };
        setStations([...stations, newStation]);

        // Clear form fields
        setName('');
        setLocation('');
        setContact('');
      });
  };

  return (
    <div>
      <h2>Police Stations</h2>
      <form onSubmit={handleAdd} className="form">
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} required />
        <input placeholder="Contact" value={contact} onChange={e => setContact(e.target.value)} required />
        <button type="submit" className="btn">Add Station</button>
      </form>
      <table border="1">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Location</th><th>Contact</th></tr>
        </thead>
        <tbody>
          {stations.map(s => (
            <tr key={s.station_id}>
              <td>{s.station_id}</td>
              <td>{s.station_name}</td>
              <td>{s.location}</td>
              <td>{s.contact_number}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PoliceStations;
