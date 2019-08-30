require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const pg = require('pg');


const Client = pg.Client;
const client = new Client(process.env.DATABASE_URL);
client.connect();

const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');

const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
            SELECT id, email, hash, display_name as "displayName"
            FROM users
            WHERE email = $1
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        console.log(hash);
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "displayName";
        `,
        [user.email, hash, user.displayName]
        ).then(result => result.rows[0]);
    }
});


const app = express();
const PORT = process.env.PORT;
app.use(cors());
app.use(morgan('dev')); 
app.use(express.static('public'));
app.use(express.json()); 


app.use('/api/auth', authRoutes);

app.use('/api', ensureAuth);

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
        WHERE task = $1
        RETURNING *;
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
        VALUES($1, $2)
        RETURNING *;
    `,
    [task.task, task.completed])
        .then(result => {
            console.log('result', result);
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

