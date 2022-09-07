import { spawn } from 'child_process';
import * as fs from 'fs';

function vpnConnect(username, password, twoFactor) {

    const details = username + '\n' + password + '\n' + twoFactor + '\n';
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
