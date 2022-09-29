import pg from 'pg';
const Client = pg.Client;

async function dbAddRun(form) {

  const client = new Client({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'simulation',
  });
  await client.connect();

  var sql = `INSERT INTO parameters (source_generations, recipient_generations, carrying_capacity, 
              mutation_rate, genome_size, bottleneck, combinations) 
             VALUES (${form['srcGen']}, ${form['recGen']}, ${form['capacity']}, ${form['mutationRate']}, 
              ${form['genomeSize']}, ${form['bottleneck']}, '${form['combos']}') 
             RETURNING parameters_id;`;

  var res = await client.query(sql);
  const parameters_id = res.rows[0]['parameters_id'];

  sql = `INSERT INTO run (name, date, parameters_id) 
          VALUES ('${form['name'].toLowerCase()}', '${new Date()}', ${parameters_id}) 
         RETURNING run_id;`;
  res = await client.query(sql);
  const run_id = res.rows[0]['run_id'];

  // for each simulation repetition
  for (var repetition = 0; repetition < parseInt(form['repetitions']); repetition++) {

    sql = `INSERT INTO stats (stats) VALUES ('{"status": "in progress"}') RETURNING stats_id;`;
    res = await client.query(sql);
    var stats_id = res.rows[0]['stats_id'];

    sql = `INSERT INTO repetition (repetition, run_id, stats_id)
            VALUES (${repetition + 1}, ${run_id}, ${stats_id});`;
    await client.query(sql);
  }

  await client.end();
  return run_id;
}

export default dbAddRun;
