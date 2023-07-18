const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


// require all routes file
const userRoute = require('./routes/userRoute');

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

app.get('/', (req,res) => {
  res.send('server running')
})
app.use('/user', userRoute);

//404 error handler
app.use((req, res, next) => {
    next('requested url is not found');
  })
  
  // custom synchronous error handler
  app.use((err, req, res, next) => {
    if(res.headersSent){
      // this next() call goes to express default error handler
      // that is invisible and default error handler of express
      // this error hanler set to the last
       next('there was an error in header sent')
    }
    else if(err.message){
      res.status(500).send('there was an error in err.message')
    }
    else{
      res.status(500).send('there was an error')
    }
  })
app.listen(5000, () => {
    console.log(`server running on port 5000`)
})