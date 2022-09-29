import pg from 'pg';
const Client = pg.Client;

const client = new Client({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'simulation',
});
await client.connect();

const tables_sql = 
    `
    DROP TABLE IF EXISTS parameters CASCADE;
    DROP TABLE IF EXISTS run CASCADE;
    DROP TABLE IF EXISTS stats CASCADE;
    DROP TABLE IF EXISTS repetition;

    CREATE TABLE parameters(
        parameters_id SERIAL PRIMARY KEY, 
        source_generations INTEGER, 
        recipient_generations INTEGER, 
        carrying_capacity INTEGER, 
        mutation_rate REAL, 
        genome_size INTEGER,  
        bottleneck INTEGER,
        combinations TEXT
    );

    CREATE TABLE run(
        run_id SERIAL PRIMARY KEY, 
        name TEXT, 
        date TEXT, 
        parameters_id INTEGER, 
        FOREIGN KEY (parameters_id) REFERENCES parameters (parameters_id)
    );
    
    CREATE TABLE stats(
        stats_id SERIAL PRIMARY KEY, 
        stats jsonb 
    );

    CREATE TABLE repetition(
        repetition INTEGER, 
        run_id INTEGER, 
        stats_id INTEGER, 
        FOREIGN KEY (run_id) REFERENCES run (run_id), 
        FOREIGN KEY (stats_id) REFERENCES stats (stats_id), 
        PRIMARY KEY (repetition, run_id)
    );
    `;

await client.query(tables_sql);

await client.end();
