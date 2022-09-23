import { processExists } from 'process-exists';

async function checkVpn() {
  if (await processExists('openconnect')) {
    return true;
  }
  return false;
}

export default checkVpn;