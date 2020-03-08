const express = require('express')
const { port, entry } = require('./globals');
const path= require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios')

const server = express();

// const db = require("./config/key").mongoURI;
// mongoose
//   .connect(db, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//     useCreateIndex: true
//   })
//   .then(() => console.log("connected to DB!"))
//   .catch((err) => console.log(err));



server.use(express.static(__dirname + '/statics/'));
server.use(bodyParser.urlencoded({extended: true}));

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
    res.send('fin')
})

server.get('/withdraw', (req,res)=>{
    let wdAmount = {'wdAmount': (req.body.wdAmount)};
    axios.get('https://sheet.best/api/sheets/54e2c93f-7ad8-42a8-a6da-a9fe35a77c5b')
    .then(response=>{
        let alldata = response['data'];
        let username = alldata[0]['name'];
        let balance = alldata[0]['balance']
        
        res.render('withdraw', {
            username: username,
            balance: balance,
            wdAmount: wdAmount
        })
    })
    .catch(error=>{console.log('error')})
})

server.post("/post/url",(req,res)=>{ //url matches landing page
    const data = req.body;
    axios({
        headers: {'Content-Type': 'application/json', 'mode': 'cors'},
        method:'post',
        url: 'https://sheet.best/api/sheets/54e2c93f-7ad8-42a8-a6da-a9fe35a77c5b',
        data: data
    }).then(done => {
        res.redirect("/dashboard");
    }).catch(error=>{
        console.log(error)
    })


server.get("/form", (req, res) => {
  res.send("This is the form");

});

server.get("/finished", (req, res) => {
  res.send("finished page");
});

server.post("/withdraw", (req, res) => {
  let wdAmount = { wdAmount: req.body.wdAmount };

  // res.redirect('/finished')
});

server.get("/deposit", (req, res) => {
  res.send("this is deposit");
  // res.redirect('/finished')
});



server.listen( port, () => console.log( `\nServer live at http://localhost:${port}` ) )

