CREATE DATABASE CrimeRecordDB;
USE CrimeRecordDB;

-- 1. Police Station Table
CREATE TABLE Police_Station (
    station_id INT AUTO_INCREMENT PRIMARY KEY,
    station_name VARCHAR(100) NOT NULL,
    location VARCHAR(150),
    contact_number VARCHAR(15)
);

select * from Police_Station;

INSERT INTO Police_Station (station_name, location, contact_number) VALUES
('Mumbai Central', 'Mumbai, Maharashtra', '022-123456'),
('Pune City', 'Pune, Maharashtra', '020-987654'),
('Nagpur Central', 'Nagpur, Maharashtra', '0712-456789');

-- 2. Police Officer Table
CREATE TABLE Police_Officer (
    officer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    officer_rank VARCHAR(50),
    station_id INT,
    FOREIGN KEY (station_id) REFERENCES Police_Station(station_id)
);

INSERT INTO Police_Officer (name, officer_rank, station_id) VALUES
('Rajesh Sharma', 'Inspector', 1),
('Anita Deshmukh', 'Sub-Inspector', 1),
('Vikram Patil', 'Inspector', 2),
('Sanjay More', 'Constable', 3);

-- 3. Criminal Table
CREATE TABLE Criminal (
    criminal_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    address VARCHAR(150),
    crime_history TEXT
);

INSERT INTO Criminal (name, age, gender, address, crime_history) VALUES
('Ravi Kumar', 32, 'Male', 'Mumbai', 'Theft, Burglary'),
('Salman Sheikh', 28, 'Male', 'Pune', 'Fraud'),
('Meena Joshi', 40, 'Female', 'Nagpur', 'No previous record');

-- 4. Victim Table
CREATE TABLE Victim (
    victim_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    age INT,
    gender VARCHAR(10),
    address VARCHAR(150)
);


INSERT INTO Victim (name, age, gender, address) VALUES
('Amit Verma', 30, 'Male', 'Mumbai'),
('Priya Kulkarni', 25, 'Female', 'Pune'),
('Sunil Gupta', 45, 'Male', 'Nagpur');

-- 5. Crime Table
CREATE TABLE Crime (
    crime_id INT AUTO_INCREMENT PRIMARY KEY,
    crime_type VARCHAR(50),
    date_of_crime DATE,
    location VARCHAR(150),
    station_id INT,
    officer_id INT,
    FOREIGN KEY (station_id) REFERENCES Police_Station(station_id),
    FOREIGN KEY (officer_id) REFERENCES Police_Officer(officer_id)
);

INSERT INTO Crime (crime_type, date_of_crime, location, station_id, officer_id) VALUES
('Theft', '2025-09-01', 'Mumbai Market', 1, 1),
('Fraud', '2025-09-05', 'Pune IT Park', 2, 3),
('Assault', '2025-09-10', 'Nagpur Railway Station', 3, 4);

-- 6. Crime Report Table
CREATE TABLE Crime_Report (
    report_id INT AUTO_INCREMENT PRIMARY KEY,
    crime_id INT,
    criminal_id INT,
    victim_id INT,
    status VARCHAR(30),
    remarks TEXT,
    FOREIGN KEY (crime_id) REFERENCES Crime(crime_id),
    FOREIGN KEY (criminal_id) REFERENCES Criminal(criminal_id),
    FOREIGN KEY (victim_id) REFERENCES Victim(victim_id)
);

INSERT INTO Crime_Report (crime_id, criminal_id, victim_id, status, remarks) VALUES
(1, 1, 1, 'Closed', 'Criminal caught and jailed'),
(2, 2, 2, 'Under Investigation', 'Financial records being checked'),
(3, 3, 3, 'Open', 'Suspect identified, investigation ongoing');

-- Crimes handled by “Mumbai Central”
SELECT c.crime_id, c.crime_type, c.date_of_crime, ps.station_name
FROM Crime c
JOIN Police_Station ps ON c.station_id = ps.station_id
WHERE ps.station_name = 'Mumbai Central';

-- Criminals with multiple crime records
SELECT cr.name, COUNT(r.crime_id) AS total_crimes
FROM Crime_Report r
JOIN Criminal cr ON r.criminal_id = cr.criminal_id
GROUP BY cr.name
HAVING COUNT(r.crime_id) > 1;

-- Victims of a given crime
SELECT v.name, v.address
FROM Crime_Report r
JOIN Victim v ON r.victim_id = v.victim_id
WHERE r.crime_id = 2;

-- Most common crime type
SELECT crime_type, COUNT(*) AS total_cases
FROM Crime
GROUP BY crime_type
ORDER BY total_cases DESC
LIMIT 1;

-- Officers handling open cases 
SELECT o.name, o.officer_rank, c.crime_type, r.status
FROM Crime_Report r
JOIN Crime c ON r.crime_id = c.crime_id
JOIN Police_Officer o ON c.officer_id = o.officer_id
WHERE r.status = 'Open';

