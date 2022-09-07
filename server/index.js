import express from 'express';
import cors from 'cors';


import vpnConnect from './vpnConnect.js';

const app = express();
app.use(express.json());
app.use(cors());


app.get('/express', (req, res) => {
    res.send('Hello World within react')
})

app.get('/express/api', (req, res) => {
    res.json({message: "hello from express"});
});

app.post('/express/sim-new', (req, res) => {
    res.json({
        message: 'post request recieved',
        data: req.body,
    });
    console.log(req.body);
});

app.post('/express/login', (req, res) => {
    res.status(200);
    console.log(req.body);
    const pid = vpnConnect(req.body.username, req.body.password, req.body.twoFactor);
    console.log('pid is: ', pid);
});





app.listen(3333);
