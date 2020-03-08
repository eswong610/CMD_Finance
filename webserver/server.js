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
    res.render('landing', {
        newMessage : newMessage
    })
})


server.get('/collector', (req,res)=>{
    res.render('collector')
})

userBalance = null;

server.get('/dashboard', (req,res)=>{  
  let month = calculateMonth(req.query["currentBalance"], req.query["depositAmount"]);
  let year = calculateYear(req.query["currentBalance"], req.query["depositAmount"])
  res.render('dashboard.ejs', {
    data : req.query,
    month : month, 
    year : year 
    
  })
  
 
})

server.post("/",(req,res)=>{ //url matches landing page
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
})


server.get("/form", (req, res) => {
    axios.get('https://sheet.best/api/sheets/54e2c93f-7ad8-42a8-a6da-a9fe35a77c5b')
    .then(response=>{
        let alldata = response['data'];//response['data'][0]['name']
        let username = alldata[0]['name'];
        let deposit = alldata[0]['balance'];
        let withdraw = alldata[0]['withdraw']
        res.render('form' , {
            username: username,
            deposit: deposit,  
            withdraw: withdraw
        });
    });
}); 


server.post("/deposit", (req, res) => {
    let balance = userBalance
    let deposit = req.body.deposit
    let curbalance = parseInt(balance) + parseInt(deposit)
    console.log(balance, deposit)
    let name = req.body.name
    const path = `https://sheet.best/api/sheets/54e2c93f-7ad8-42a8-a6da-a9fe35a77c5b/name/*${name}`
    axios.put(path , {
       'name': name,
       'balance' : curbalance
    }).then(done => { 
        res.redirect("/dashboard");
    }).catch(error=>{
        console.log(error)
    })
});

server.post("/withdraw", (req, res) => { 
    let balance = userBalance
    let withdraw = req.body.withdraw
    let curbalance = parseInt(balance) - parseInt(withdraw)
    console.log('balance' + balance + 'withdraw' + withdraw)
    let name = req.body.name
    const path = `https://sheet.best/api/sheets/54e2c93f-7ad8-42a8-a6da-a9fe35a77c5b/name/*${name}`
    axios.put(path , {
       'name': name,
       'balance' : curbalance
    }).then(done => { 
        res.redirect("/dashboard");
    }).catch(error=>{
        console.log(error)
    })
});

// server.post("/withdraw", (req, res) => {
//     let wdAmount = req.body.wdAmount 
//     console.log(wdAmount)
//     let usernameObj = {username: req.body.username};
    // console.log(usernameObj)
    // // let username = usernameObj['username']
    // //let username= ""
    // let patchUrl = 'https://sheet.best/api/sheets/54e2c93f-7ad8-42a8-a6da-a9fe35a77c5b/name/*hello*'
    // axios({
    //     headers: {'Content-Type': 'application/json', 'mode': 'cors'},
    //     method:'put',
    //     url: patchUrl,
    //     data: [{name: 'Eugenia'}]
    // }).then(done => {
    //     res.redirect("/dashboard");
    // }).catch(error=>{
    //     console.log(error)
    // })

  // res.redirect('/finished')

//   res.render('withdraw', {
//     username: username,
//     balance: balance,
//     wdAmount: wdAmount
//   })

// });

server.get("/deposit", (req, res) => {
  res.send("this is deposit");
  // res.redirect('/finished')
});




function calculateMonth(beginningBalance, deposit) {
  const rate = 0.01;
  let currentBalance = beginningBalance;
  let depositAmount = deposit;


  //Month: The equation is month = currentBalance * [[1 + (r/n)] ^ nt]
  let month = (currentBalance * Math.pow((1 + (rate / (1 * 100))), (1/12 * 1))) + (depositAmount*1);
  let totalBalanceMonth = parseFloat(month).toFixed(2);
    return totalBalanceMonth;


}



function calculateYear(beginningBalance, deposit) {
  const rate = 0.01
  let currentBalance = beginningBalance;
  let depositAmount = deposit;

  // Year: The equation is A = currentBalance * [[1 + (r/n)] ^ nt]
  let year = (currentBalance * Math.pow((1 + (rate / (12 * 100))), (12 * 1))) + (depositAmount*12);
  let totalBalanceYear = parseFloat(year).toFixed(2);
    return totalBalanceYear;
  // toFixed is used for rounding the amount with two decimal places.
}

 


server.listen( port, () => console.log( `\nServer live at http://localhost:${port}` ) )
 
