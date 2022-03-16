const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
// middlewares
app.use(express.json());
app.use(cors());
// settings
app.set('port', process.env.PORT || 8000);
// routers
app.use('/images', require('./routers/images.routers'));

module.exports = app;