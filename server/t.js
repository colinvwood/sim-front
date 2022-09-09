import pg from 'pg';
const Client = pg.Client;
const client = new Client({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'simulation',
});
await client.connect();
const res = await client.query('INSERT INTO run (name, date, parameters_id) VALUES (\'hi\', \'today\', 3);');
const res2 = await client.query('INSERT INTO run (name, date, parameters_id) VALUES (\'bye\', \'yesterday\', 4);');
console.log(res);
await client.end();
