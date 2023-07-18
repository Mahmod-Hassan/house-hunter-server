const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const port = process.env.PORT || 5000;
require('dotenv').config();

// middlewares
app.use(cors());
app.use(express.json());

// mongodb uri
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lcblope.mongodb.net/?retryWrites=true&w=majority`;

// database connection wiht mongoose
mongoose
.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
.then(() => console.log('connection successfull'))
.catch((err) => console.log(err))

app.get('/', (req,res) => {
  res.send('server running')
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})