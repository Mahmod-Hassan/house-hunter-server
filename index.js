const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// require all routes file
const authenticationRoute = require('./routes/authenticationRoute');
const houseOwnerRoute = require('./routes/houseOwnerRoute');

// express app initialization
const app = express();

// middlewares
app.use(cors());
app.use(express.json());


// database connect
let uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lcblope.mongodb.net/?retryWrites=true&w=majority`;

mongoose
.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'houseHunter',
  })
.then(() => console.log('connection successfull'))
.catch((err) => console.log(err))

// to chech whether server running or not
app.get('/', (req,res) => {
  res.send('server running')
})

// use external routes
app.use('/auth', authenticationRoute);
app.use('/house-owner', houseOwnerRoute);

// if path not match this middleware will catch the error
app.use((req, res, next) => {
    next('requested url is not found');
  })
  
  // my custom error handler (middleware)
  const errorHandler = ((err, req, res, next) => {
    if(res.headersSent){
      // this next() call goes to express default error handler
      // that is invisible and default error handler of express
      // this error hanler set to the last
      return next(err)
    }
    res.send({error: err})
  })
  app.use(errorHandler);

  // listening on port 5000
  app.listen(5000, () => {
      console.log(`server running on port 5000`)
  })