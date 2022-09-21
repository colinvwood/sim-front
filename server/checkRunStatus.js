import { execSync } from 'child_process';

function checkRunStatus(runId, repetitions) {
  const path = '/projects/pearson_lab/trans_simulation';
  const monsoon = 'cvw29@monsoon.hpc.nau.edu';
  const checkCommand = `ls ${path}/runs/run-${runId}/`;
  const files = execSync(`ssh ${monsoon} ${checkCommand}`);
  


}

export default checkRunStatus;
