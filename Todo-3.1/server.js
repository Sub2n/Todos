// ENV
require('dotenv').config();

// DEPENDENCIES
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());

const port = process.env.PORT || 4500;

// Static File Service
app.use(express.static('public'));

// Body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Node의 native Promise 사용
mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => console.log('Successfully connected to mongodb'))
  .catch(console.error);

// ROUTERS
app.use('/todos', require('./routes/todos'));

// app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Server listening on port ${port}`));
