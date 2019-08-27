require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');
// Application Setup
// - make an express app!
// - get the port on which to run the server


const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();


const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(morgan('dev')); // http logging
app.use(express.static('public'));
app.use(express.json()); 

app.get('/api/tasks', (req, res) => {
    client.query(`
        SELECT
            name,
            text,
        FROM tasks
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});



app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});

