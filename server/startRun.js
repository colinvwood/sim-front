import { spawn, execSync } from 'child_process';
import * as fs from 'fs';

async function startRun(form, runId) {

  // create run directory on monsoon
  const path = '/projects/pearson_lab/trans_simulation';
  const monsoon = 'cvw29@monsoon.hpc.nau.edu';
  const dirCommand = `mkdir -p ${path}/runs/run-${runId}/`;
  execSync(`ssh ${monsoon} ${dirCommand}`);

  // write config file
  const config = {
    "run_id": runId,
    "repetitions": parseInt( form['repetitions'] ),
    "mutation rate": parseFloat( form['mutationRate'] ),
    "genome size": parseInt( form['genomeSize'] ),
    "carrying capacity": parseInt( form['capacity'] ),
    "source generations": parseInt( form['srcGen'] ),
    "bottleneck": parseInt( form['bottleneck'] ),
    "recipient generations": parseInt( form['recGen'] ),
    "sample size": parseInt( form['sampleSize'] ),
    "combo sizes": form['combos'].split(',').map(n => parseInt(n))
  }
  const configFile = `/var/www/html/sim-front/run-${runId}-config.json`; 
  fs.writeFileSync(configFile, JSON.stringify(config));

  // copy config file to monsoon
  const configPath = `${monsoon}:${path}/runs/run-${runId}/run-${runId}-config.json`;
  execSync(`scp ${configFile} ${configPath}`);

  // begin simulation on monsoon
  var startCommand;
  if (form['repetitions'] > 25) {
    startCommand = `sbatch -J sim-run-${runId} ${path}/run_repeat_large.sh ${path}/runs/run-${runId}/run-${runId}-config.json ${form["repetitions"]}`;
  } else if (form['repetitions'] > 1) {
    startCommand = `sbatch -J sim-run-${runId} ${path}/run_repeat_small.sh ${path}/runs/run-${runId}/run-${runId}-config.json ${form["repetitions"]}`;
  } else {
    startCommand = `sbatch -J sim-run-${runId} ${path}/run_single.sh ${path}/runs/run-${runId}/run-${runId}-config.json`;
  }
  execSync(`ssh ${monsoon} ${startCommand}`);

  execSync(`rm ${configFile}`);
}

export default startRun;
