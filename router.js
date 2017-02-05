const Authentication = require('./controllers/authentication');
const util = require('util');

module.exports = function(app) {
  app.post('/signup', Authentication.signup);
};
