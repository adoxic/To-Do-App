require('dotenv').config();

const pg = require('pg');

const Client = pg.Client;

const client = new Client(process.env.DATABASE_URL);

client.connect()
    .then (() => {
        return client.query(`
            CREATE TABLE tasks (
                id SERIAL PRIMARY KEY NOT NULL,
                task VARCHAR(256) NOT NULL,
                completed BOOLEAN NOT NULL
            );
            CREATE TABLE users (
                id SERIAL PRIMARY KEY NOT NULL,
                email VARCHAR(256) NOT NULL,
                hash VARCHAR(256) NOT NULL,
                display_name VARCHAR(256) NOT NULL
            );
            
        `);
    })
    .then(
        () => console.log('creat tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });
