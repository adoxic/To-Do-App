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
app.use(morgan('dev')); 
app.use(express.static('public'));
app.use(express.json()); 

app.get('/api/tasks', (req, res) => {
    client.query(`
        SELECT
            task,
            completed
        FROM tasks;
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

app.put('/api/tasks', (req, res) => {
    const task = req.body;
    console.log(task);
    client.query(`
        UPDATE tasks
        SET completed = true
        WHERE task = $1;
    `,
    [task.task])
        .then(result => {
            console.log(result.rows[0]);
            res.json(result.rows[0]);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        }); 
});

app.post('/api/tasks', (req, res) => {
    const task = req.body;

    client.query(`
        INSERT INTO tasks (task, completed)
        VALUES($1, $2);
    `,
    [task.task, task.completed])
        .then(result => {
            res.json(result.rows[0]);
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

