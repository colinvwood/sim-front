import { spawn, execSync } from 'child_process';
import * as fs from 'fs';

function startRun(form, runId) {
  
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
  const configFile = '/var/www/html/sim-front/run-' + runId + '-config.json'; 
  fs.writeFileSync(configFile, JSON.stringify(config));

  // copy config file to monsoon
  const configPath = `${monsoon}:${path}/runs/run-${runId}/`;
  execSync(`scp ${configFile} ${configPath}`);

  // begin simulation on monsoon
  var startCommand;
  if (form['repetitions'] > 1) {
    startCommand = `sbatch ${path}/run_repeat.sh ${path}/runs/run-${runId}/run-${runId}-config.json ${form["repetitions"]}`;
  } else {
    startCommand = `sbatch ${path}/run_single.sh ${path}/runs/run-${runId}/run-${runId}-config.json`;
  }
  execSync(`ssh ${monsoon} ${startCommand}`);


  execSync(`rm ${configFile}`);
}



const test = {
  mutationRate: 1.6000000000000002e-10,
  genomeSize: 2800000,
  repetitions: 1,
  name: 'test',
  srcGen: '100',
  recGen: '1',
  bottleneck: '1',
  capacity: '1000',
  sampleSize: '10',
  username: 'cvw29',
  password: 'Gmajors3001!',
  twoFactor: 'push'
}
//startRun(test, 1);

export default startRun;
