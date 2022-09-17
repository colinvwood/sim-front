import pg from 'pg';
const Client = pg.Client;

async function dbRetrieveName(name) {

  const client = new Client({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'simulation',
  });
  await client.connect();

  var sql = `SELECT run.date, run.run_id, parameters.source_generations, parameters.recipient_generations,
              parameters.bottleneck FROM run 
             INNER JOIN parameters ON run.parameters_id = parameters.parameters_id 
             WHERE run.name='${name.toLowerCase()}';`;
  const runResults = await client.query(sql);
  console.log(runResults.rows);

  for (let i = 0; i < runResults.rows.length; i++) {
    sql = `SELECT * FROM repetition WHERE run_id=${runResults.rows[i]['run_id']}`;
    var repResults = await client.query(sql);
    runResults.rows[i]['repetitions'] = repResults.rows.length;
  }
  console.log(runResults.rows);
}

export default dbRetrieveName;
