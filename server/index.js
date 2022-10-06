import express from 'express';
import cors from 'cors';
import * as fs from 'fs';

import vpnConnect from './vpnConnect.js';
import dbAddRun from './dbAddRun.js';
import dbRetrieve from './dbRetrieve.js';
import startRun from './startRun.js';
import checkVpn from './checkVpn.js';
import { retrieveRunStats, statsToCsv } from './retrieveRunStats.js';

const app = express();
app.use(express.json());
app.use(cors());


app.get('/express/check-vpn', async (req, res) => {
    const vpnStatus = await checkVpn();
    console.log('vpn status: ', vpnStatus);
    res.json( {vpnStatus: vpnStatus} );
});

app.post('/express/vpn-connect', async (req, res) => {
    console.log('connecting to vpn');
    const pid = await vpnConnect(req.body);
    console.log('connected to vpn, pid: ', pid);

    if (pid == -1) {
        console.log("bad login");
        res.json({ status: 'error' });
        res.end();
    } else {
        console.log("good login");
        res.json({ status: 'success' });
        res.end();
    }
});

app.post('/express/sim-new', async (req, res) => {
    // update db
    const runId = await dbAddRun(req.body);
    console.log('added run to db');

    // run sim on monsoon
    startRun(req.body, runId);
    console.log('started run on monsoon');

    res.status(200);
    res.end();
});

app.post('/express/retrieve-records', async (req, res) => {
    console.log("in retrieve records");
    console.log("body:  ", req.body);
    let records;
    if (req.body['simName']) {
        console.log("name retrieve");
        records = await dbRetrieve(req.body['simName'], null);
    } else if (req.body['recentNumber']) {
        console.log("number retrieve");
        records = await dbRetrieve(null, req.body['recentNumber']);
    }
    
    res.json({ records: records });  
});

app.post('/express/retrieve-stats', async (req, res) => {
    const runId = req.body.run_id;
    const comboString = req.body.combinations;

    const jsonStatsFile = await retrieveRunStats(runId, comboString);
    const csvStatsFile = await statsToCsv(runId, jsonStatsFile);

    res.json({ csvStatsFile: csvStatsFile });
});

app.get('/express/retrieve-stats', (req, res) => {
    res.download(req.query.file);
});



app.listen(3333);
