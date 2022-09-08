import sqlite3 from 'sqlite3';

function dbAddRun(form) {

  const db = new sqlite3.Database('../db/simulation.db', sqlite3.OPEN_READWRITE);

  var sql = 
    `INSERT INTO 
      parameters 
        (source_generations, recipient_generations, carrying_capacity, 
         mutation_rate, genome_size, bottleneck) 
        VALUES (${form['srcGen']}, ${form['recGen']}, ${form['capacity']}, 
                ${form['mutationRate']}, ${form['genomeSize']},
                ${form['bottleneck']});
    `;

  db.run(sql);
  
}

export default dbAddRun;