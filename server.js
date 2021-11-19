const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require('./middlewares/auth.middleware');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  next()
});

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id)
});

// routes
app.use('/api/user', userRoutes);



// server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`)
})

module.exports = app