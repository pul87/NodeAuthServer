const express     = require('express');
const http        = require('http');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const router      = require('./router');

// APP SETTINGS
const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json( { type:'*/*'} ));
router(app);

// SERVER SETTINGS
const port = process.env.PORT || 3000;
const server = http.createServer(app);

// START SERVER
server.listen(port);
console.log('Server listening on port:', port);
