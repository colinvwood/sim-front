import sqlite3 from 'sqlite3';

function dbAddRun(form) {

  const db = new sqlite3.Database('/var/www/html/sim-front/db/simulation.db');

  // insert into parameters table
  var sql = 
    `INSERT INTO 
      parameters 
        (source_generations, recipient_generations, carrying_capacity, 
         mutation_rate, genome_size, bottleneck) 
        VALUES (${form['srcGen']}, ${form['recGen']}, ${form['capacity']}, 
                ${form['mutationRate']}, ${form['genomeSize']},
                ${form['bottleneck']});
    `;
  db.run(sql, function() {
    var param_id = this.lastID;
  });

  
  // insert into run table
  sql = 
    `INSERT INTO 
      run
        (name, date, parameters_id)
        VALUES (${form['name']}, ${new Date()}, ${param_id});
    `;
  db.run(sql, function() {
    var run_id = this.lastID;
  });

  // for each simulation repetition
  for (var repetition = 0; i < parseInt(form['repetitions']); repetition++) {

    // insert into stats table
    sql = 
      `INSERT INTO
        stats
          (stats)
          VALUES (${ "{status: \"in progress\"}" });
      `;
    db.run(sql, function() {
      var stats_id = this.lastID;
    });   

    // insert into repetition table
    sql = 
      `INSERT INTO
        repetition
          (repetition, run_id, stats_id)
          VALUES (${repetition + 1}, ${run_id}, ${stats_id});
      `;
      db.run(sql);
  }
  
  db.close();
  
}

export default dbAddRun;
