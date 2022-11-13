import { spawn, execSync } from 'child_process';
import * as fs from 'fs';
import checkVpn from './checkVpn.js';

async function vpnConnect(form, client_ip) {

    if (await checkVpn()) {
        return 0;
    }

    // keep default gateway for client
    try {
        execSync(`route add -host ${client_ip} gw 104.168.219.1`);
    } catch (err) {
        // route might already exist from previous use
        console.log("Error adding route: ", err);
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

    var timeout = false;
    var connected = false;
    var counter = 0;
    while (!connected && !timeout) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        if  (counter++ > 10) {
            timeout = true;
        }
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
    
    if (timeout) {
        return -1;
    }

    const pid = openconnect.pid;
    return pid;
}

export default vpnConnect;
