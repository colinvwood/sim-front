import express from 'express';
import cors from 'cors';


import vpnConnect from './vpnConnect.js';
import dbAddRun from './dbAddRun.js';
import dbRetrieveName from './dbRetrieveName.js';
import startRun from './startRun.js';

const app = express();
app.use(express.json());
app.use(cors());


app.get('/express', (req, res) => {
    res.send('Hello World within react')
})

app.get('/express/api', (req, res) => {
    res.json({message: "hello from express"});
});

app.post('/express/sim-new', async (req, res) => {
    // update db
    const run_id = await dbAddRun(req.body);
    console.log('added run to db');

    // connect to vpn
    const pid = await vpnConnect(req.body);
    console.log('connected to vpn, pid: ', pid);

    console.log(req.body);
    // run sim on monsoon
    startRun(req.body, run_id);
    console.log('started run on monsoon');

    res.status(200);
});

app.post('/express/retrieve-name', async (req, res) => {
  console.log(req.body);
  await dbRetrieveName(req.body['simName']);    


});

app.post('/express/retrieve-number', (req, res) => {

});




app.listen(3333);
