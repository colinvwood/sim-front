import pg from 'pg';
const Client = pg.Client;

const client = new Client({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'simulation',
});
await client.connect();


const sql = "ALTER TABLE run ADD COLUMN description TEXT;";
await client.query(sql);
await client.end();