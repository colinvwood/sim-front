import { spawn } from 'child_process';
import * as fs from 'fs';
import checkVpn from './checkVpn.js';

async function vpnConnect(form) {

    if (await checkVpn()) {
        return 0;
    }

    const details = form['username'] + '\n' + form['password'] + '\n' + form['twoFactor'] + '\n';
    const printf = spawn('printf', [details], {
        stdio: ['ignore', 'pipe', 'ignore'],
        detach: true
    });
    printf.unref();

    const out = fs.openSync('out.txt', 'a');
    const openconnect = spawn('openconnect', ['vpn.nau.edu'], {
        stdio: [printf.stdout, out, 'ignore'], 
        detach: true
    });
    openconnect.unref();

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

    return pid;
}

export default vpnConnect;
