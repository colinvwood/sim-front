import { spawn } from 'child_process';
import { processExists } from 'process-exists';
import * as fs from 'fs';

async function vpnConnect(form) {

    if (await processExists('openconnect')) {
        return 0;
    }

    const details = form['username'] + '\n' + form['password'] + '\n' + form['twoFactor'] + '\n';
    const printf = spawn('printf', [details], {
        stdio: ['ignore', 'pipe', 'ignore'],
        detach: true
    });

    const out = fs.openSync('out.txt', 'a');
    const openconnect = spawn('openconnect', ['vpn.nau.edu'], {
        stdio: [printf.stdout, out, 'ignore'], 
        detach: true
    });

    var connected = false;
    while (!connected) {
        var data = fs.readFileSync('out.txt');
        if (data) {
            var lines = data.toString().split("\n");
            for (var i = 0; i < lines.length; i++) {
                if (lines[i].includes("Established DTLS connection")) {
                    connected = true;
                }
            }
        }
    }

    fs.unlink('out.txt', (err) => {
        if (err) {
            console.log(err);
        }
    });
    
    const pid = openconnect.pid;
    openconnect.unref();

    return pid;
}

export default vpnConnect;
