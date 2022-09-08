import sqlite3 from 'sqlite3';

function dbAddRun(form) {

  const db = new sqlite3.Database('/var/www/html/sim-front/db/simulation.db');

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
    console.log("inserted row id: ", this.lastID);
  });

  db.close();
  
}

export default dbAddRun;
