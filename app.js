const express = require('express');
const dotenv = require('dotenv');

const path = require('path');
// const nocache = require('nocache');
const ejs = require('ejs');


// config .env
require('dotenv').config();



// creating request object from req url
const app = express();
app.use(express.json());


const db = require('./config/db');
db();

// serving the static files
app.set("views",path.join(__dirname,'views'));

// setting view engine to ejs
app.set('view engine',"ejs");

app.use('/public',express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:false}));



// initialising session
const session = require('express-session');
const { log } = require('console');
app.use(
      session({
      secret: process.env.SESSION_SECRET,
      name: "skaters-session",
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
 );

 const flash = require('connect-flash');
 app.use(flash());




//  routing to index (Landing page) router
const indexRouter = require('./routes/index');
app.use('/',indexRouter);


//  routing to user router
const userRouter = require('./routes/user');
app.use('/users', userRouter);

// routing to admin router
const adminRouter = require('./routes/admin');
app.use('/admin',adminRouter);
















  const PORT = process.env.PORT||8080;
   app.listen(PORT, ()=>{console.log(`server is running on port http://localhost:${PORT}`)});






