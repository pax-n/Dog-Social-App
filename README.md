# DogGO - A Social Media App for Dogs

A social media application built using the PERN stack for the Lighthouse Labs Final Project. It is designed with a development mode presentation in mind: some best practices are ignored and a 'happy path' is assumed.

## Screengrabs

### TITLE
!["CAPTION"](https://LINK)

### TITLE
!["CAPTION"](https://LINK)

### TITLE
!["CAPTION"](https://LINK)

### TITLE
!["CAPTION"](https://LINK)

## Front end Setup

1. From the client directory, run `npm i`
2. Copy the .env file and fill in a google API KEY (note: this method is safe only for a localhost in development mode)
3. Run `npm start` to run the server

## Back end Setup

1. From the server directory, run `npm i`
2. Copy the .env file and fill in the appropriate info (DB info can be found below, PORT is whatever you choose, KEY1 and KEY2 are for cookies and can be set to whatever you choose)
3. Run `npm start` to run the server

## Database Setup

1. Open PSQL
2. Create a user and password (or use an existing one) - `CREATE ROLE labber WITH LOGIN password 'labber';`
3. Create a new database using the above user - `CREATE DATABASE final OWNER labber;`
4. Fill in the server side .env with the proper info - 
`DB_HOST=localhost
DB_USER=labber
DB_PASS=labber
DB_NAME=final
DB_PORT=5432`
5. From the server directory, run `npm run db:reset` to populate/reset the database with seeds


## Dependencies

* React v17.0.2
* PostgreSQL 9.x
* Express v4.16.1
* pg v8.7.3
* dotenv v2.0.0
* cors v2.8.5
* cookie-session v2.0.0
* http-errors v1.6.3
* cookie-parser v1.4.4
* body-parser v1.19.2
* morgan v1.9.1
* mui:
  * @mui/icons-material v5.5.1
  * @mui/lab v5.0.0-alpha.74
  * @mui/material v5.5.1
* axios v0.26.1
* react-dom v17.0.2
* react-moment v1.1.1
* lodash v4.17.21
* autosuggest-highlight v3.2.1
