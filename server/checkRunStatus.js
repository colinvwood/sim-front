import { execSync } from 'child_process';

function checkRunStatus(runId) {
  const monsoon = 'cvw29@monsoon.hpc.nau.edu';
  const checkCommand = `squeue --user cvw29 --format="%30j"`;

  try {
    const files = execSync(`ssh ${monsoon} ${checkCommand}`, {
      encoding: 'utf8'
    });
    
    if (files.includes(`sim-run-${runId}`)) {
      return { status: "running" }
    } else {
      return { status: "finished" }
    }

  }
  catch (error) {
    return { status: "not found" };
  }

}

export default checkRunStatus;
