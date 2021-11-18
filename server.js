const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      //port : 3000,
      user : 'postgres',
      password : 'admin',
      database : 'smart-brain'
    }
  });

const app = express();
app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cors());


app.get("/", (req, res)=>{res.send('Success')})

app.post("/signin", signin.handleSignIn(db, bcrypt))
app.post("/register", (req, res)=> {register.handleRegister(req, res, db, bcrypt)})
app.get("/profile/:id", (req, res)=>{ profile.handleProfileGet(req, res, db) })
app.put("/image", (req, res) => {image.handleImage(req, res,db)})
app.post("/imageUrl", (req, res) => {image.handleApiCall(req, res)})

app.listen(3000, ()=>{
    console.log("app is running on port 3000")
})

/*
/ --> res = this is working
/ signin --> POST = success/fail
/ register --> POST = user/already
/ profile/:userId --> get = user
/image --> Put = update user's count



*/