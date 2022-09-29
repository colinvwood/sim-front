import { execSync } from 'child_process';
import * as fs from 'fs/promises';

export async function retrieveRunStats(runId, comboString) {

  const path = '/projects/pearson_lab/trans_simulation';
  const monsoon = 'cvw29@monsoon.hpc.nau.edu';
  const transferPath = '/var/www/html/sim-front/'

  // combine stats if multiple reps
  const averageCommand = `ssh ${monsoon} "python ${path}/compute_averages.py ${runId} ${comboString}"`;
  execSync(averageCommand);

  const getStatsCommand = `scp ${monsoon}:${path}/runs/run-${runId}/stats-run-${runId}.json ${transferPath}`;
  execSync(getStatsCommand);

  return transferPath.concat(`stats-run-${runId}.json`);
}

export async function statsToCsv(runId, statsFile) {
  const path = '/var/www/html/sim-front/'

  var data;
  try {
    data = await fs.readFile(statsFile, {encoding: 'utf8'});
  } catch (error) {
    console.log("Error reading stats file.");
  }

  const stats = JSON.parse(data);
  for (var combo_size in stats) {
    var csvString = 
      `${combo_size}
       ,tier 1 raw,${stats[combo_size]['tier 1 raw'].join()}
       ,tier 2 raw,${stats[combo_size]['tier 2 raw'].join()}
       ,combined raw,${stats[combo_size]['combined raw'].join()}
       ,tier 1 average,${stats[combo_size]['tier 1 average']}
       ,tier 2 average,${stats[combo_size]['tier 2 average']}
       ,combined average,${stats[combo_size]['combined average']}\n\n`;
    
    try {
      await fs.writeFile(`${path}stats-run-${runId}.csv`, csvString, { flag: 'a' });
    } catch (error) {
      console.log("Error writing csv file.");
    }
  }

  return `${path}stats-run-${runId}.csv`;
}
