const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const signin = require('./controllers/signin');
const register = require('./controllers/register');
const tasks = require('./controllers/tasks');

const app = express();
const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'qzwx0310qzwx',
    database : 'todogame'
  }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {  res.json('This is working')});
app.post('/signin', (req, res) => signin.handleSignin(req, res, db, bcrypt));
app.post('/register', (req, res) => register.handleRegister(req, res, bcrypt, db));
app.get('/tasks', (req, res) => tasks.getTask(req, res, db));
app.post('/tasks', (req, res) => tasks.addTask(req, res, db));
app.put('/tasks', (req, res) => tasks.updateTask(req, res, db));
app.delete('/tasks', (req, res) => tasks.deleteTask(req, res, db));



app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running');
});
