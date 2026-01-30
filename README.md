# WeatherForYou

A full-stack weather application with automated CI/CD deployment.

## Project Structure
- **backend**: Node.js/Express API
- **frontend**: React Application
- **infra**: Infrastructure configuration
- **scripts**: Helper scripts for development/verification

## MongoDB & Ports
This project runs using Docker Compose.

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: 
    - Internal Docker Port: `27017`
    - **Host Machine Port**: `27018`

**Important:** If you want to connect to the database from your terminal (e.g., using `mongosh` or `Compass`), you MUST use port **27018**.

Example:
```bash
mongosh --port 27018
```

## Verification
If you believe data is not being saved, run the verification script:
```bash
node scripts/verify_db.js
```
This script explicitly connects to `localhost:27018` to check for registered users.
