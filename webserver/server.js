const express = require('express')
const { port, entry } = require('./globals');
const path= require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios')


const server = express();

const db = require("./config/key").mongoURI;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to DB!"))
  .catch((err) => console.log(err));


server.use(express.static(__dirname + '/statics/'));
server.use(bodyParser.urlencoded({extended: true}));

// let userAccount = {'account': (req.body.account)}
// let userGoal= {'goal': (req.body.goal)}
// let userTime = {'time': (req.body.time)}
// let userEta = {'eta': (req.body.eta)};

server.set('view engine', 'ejs');

server.get('/', (req, res)=>{
    let newMessage = 'hello'
    res.render('hello.ejs', {
        newMessage : newMessage
    })
})
server.get('/form', (req, res)=>{
    res.send('This is the form')
})

server.get('/finished', (req,res)=>{
    res.render('fin')
})

server.get('/withdraw', (req,res)=>{
    // let wdAmount = {'wdAmount': (req.body.wdAmount)};
    axios.get('https://sheet.best/api/sheets/54e2c93f-7ad8-42a8-a6da-a9fe35a77c5b')
    .then(response=>{
        let alldata = response['data'];
        console.log(alldata[0]['name'])
        res.render('hello', {
            alldata: alldata
        })
    })
    .catch(error=>{console.log('error')})
    


    // res.redirect('/finished')
})

server.get('/deposit', (req,res)=>{
    res.send('this is deposit')
    // res.redirect('/finished')

})


server.listen( port, () => console.log( `\nServer live at http://localhost:${port}` ) )