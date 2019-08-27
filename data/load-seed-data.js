require('dotenv').config();
const pg = require('pg');
const Client = pg.Client;
const tasks = require('./tasks');

const client = new Client(process.env.DATABASE_URL);

client.connect()

    .then(() => {
        return Promise.all(
            tasks.map(task => {
                return client.query(`
                    INSERT INTO tasks (task, completed)
                    VALUES($1, $2);
                `,
                [task.task, task.completed]);
            })
        );
    })
    .then(
        () => console.log('seed data load complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });