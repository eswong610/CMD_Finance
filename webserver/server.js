const express = require('express')
const { port, entry } = require('./globals');
const path= require('path');
const bodyParser = require('body-parser');


const server = express();

const db = require("./config/keys").mongoURI;
mongoose
  .connect(db, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("connected to DB!"))
  .catch((err) => console.log(err));


server.use(express.static(path.join(__dirname, 'statics')));
server.use(bodyParser.urlencoded({extended: true}));

// let userAccount = {'account': (req.body.account)}
// let userGoal= {'goal': (req.body.goal)}
// let userTime = {'time': (req.body.time)}
// let userEta = {'eta': (req.body.eta)};

server.set('view engine', 'ejs');

server.get('/', (req, res)=>{
    let newMessage = 'hello'
    res.render('hello', {
        newMessage : newMessage
    })
})

server.get('/form', (req, res)=>{
    res.send('This is the form')
})

server.get('/finished', (req,res)=>{
    res.send('finished page')
})

server.post('/withdraw', (req,res)=>{
    let wdAmount = {'wdAmount': (req.body.wdAmount)};
    


    // res.redirect('/finished')
})

server.get('/deposit', (req,res)=>{
    res.send('this is deposit')
    // res.redirect('/finished')

})


server.listen( port, () => console.log( `\nServer live at http://localhost:${port}` ) )