import React, { useState, useEffect } from 'react';
import PoliceStations from './components/PoliceStations';
import Officers from './components/Officers';
import Criminals from './components/Criminals';
import Victims from './components/Victims';
import Crimes from './components/Crimes';
import CrimeReports from './components/CrimeReports';
import './App.css';

function App() {
  const [stations, setStations] = useState([]);
  const [officers, setOfficers] = useState([]);
  const [criminals, setCriminals] = useState([]);
  const [victims, setVictims] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/stations').then(res => res.json()).then(data => setStations(data));
    fetch('http://localhost:5000/api/officers').then(res => res.json()).then(data => setOfficers(data));
    fetch('http://localhost:5000/api/criminals').then(res => res.json()).then(data => setCriminals(data));
    fetch('http://localhost:5000/api/victims').then(res => res.json()).then(data => setVictims(data));
  }, []);

  return (
    <div className="container">
      <p id="slogan">One System, Zero Crime Confusion, Empowering Justice.</p>
      <p>"सद्रक्षणाय खलनिग्रहाय"</p>
      <h1>Crime Record Management System</h1>
      <PoliceStations stations={stations} setStations={setStations} />
      <Officers stations={stations} setOfficers={setOfficers} />
      <Criminals criminals={criminals} setCriminals={setCriminals} />
      <Victims victims={victims} setVictims={setVictims} />
      <Crimes stations={stations} officers={officers} />
      <CrimeReports criminals={criminals} victims={victims} />
    </div>
  );
}

export default App;
