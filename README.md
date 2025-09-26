# Project Name:

Crime Management System

# Project Description:

The Crime Management System (CMS) is a full-stack web application designed to manage and track crimes, police stations, officers, criminals, victims, and crime reports efficiently. It provides an easy-to-use interface for administrators or law enforcement personnel to add, update, and view all crime-related information.

One of the key features of this system is ensuring that duplicate Police Station names are not allowed, maintaining data integrity for stations.

# Key Features:

1. Police Stations Management

Add new police stations with name, location, and contact number.

Prevents duplicate station names to ensure each station is unique.

View all registered police stations in a table.

2. Police Officers Management

Add officers with name, rank, and assign to a station.

Dropdowns for stations are dynamically updated when a new station is added.

3. Criminals Management

Add criminals with name, age, gender, address, and crime history.

4. Victims Management

Add victims with name, age, gender, and address.

5. Crimes Management

Record new crimes with type, date, location, station, and officer.

Dropdowns for stations and officers update dynamically.

6. Crime Reports Management

Add reports linking crimes, criminals, and victims.

Include status and remarks for each report.

7. Dynamic Dropdown Updates

Adding a new station updates stations in officers and crimes forms automatically.

8. Frontend & Backend

Built using React.js with plain CSS.

Backend using Node.js and Express.js with MySQL database.

# Key Rule: Duplicate Police Station names are strictly prevented.