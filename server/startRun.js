import { spawn, execSync } from 'child_process';
import * as fs from 'fs';

async function startRun(form, runId) {

  // create run directory on monsoon
  const path = '/projects/pearson_lab/trans_simulation';
  const runPath = `${path}/runs/run-${runId}`;
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
  // run_repeat_small and run_repeat_large scripts expect:
  //    ./script.sh json_config_file path_to_output repetitions
  // 
  // run_single script expects:
  //    ./script.sh json_config_file path_to_output
  var startCommand;
  const baseCommand = `sbatch -J sim-run-${runId} `;
  if (form['repetitions'] > 25) {
    startCommand = baseCommand + `${path}/run_repeat_large.sh ${runPath}/run-${runId}-config.json ${runPath} ${form["repetitions"]}`;
  } else if (form['repetitions'] > 1) {
    startCommand = baseCommand + `${path}/run_repeat_small.sh ${runPath}/run-${runId}-config.json ${runPath} ${form["repetitions"]}`;
  } else {
    startCommand = baseCommand + `${path}/run_single.sh ${runPath}/run-${runId}-config.json ${runPath}`;
  }
  execSync(`ssh ${monsoon} ${startCommand}`);

  execSync(`rm ${configFile}`);
}

export default startRun;
