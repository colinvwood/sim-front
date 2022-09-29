import { execSync } from 'child_process';

function checkRunStatus(runId, repetitions) {
  const path = '/projects/pearson_lab/trans_simulation';
  const monsoon = 'cvw29@monsoon.hpc.nau.edu';
  const checkCommand = `ls ${path}/runs/run-${runId}/`;

  try {
    const files = execSync(`ssh ${monsoon} ${checkCommand}`, {
      encoding: 'utf8'
    });
    console.log("files: ", files);

    if (files.length == repetitions + 1) {
      return 'finished';
    }
    return 'in progress';
  }
  catch (error) {
    return 'not found';
  }

}

export default checkRunStatus;
