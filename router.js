const Authentication = require('./controllers/authentication');
const util = require('util');
const passport = require('passport');
const passportService = require('./services/passport');

const requiredAuth  = passport.authenticate('jwt', { session: false });
const requireSignIn = passport.authenticate('local', { session: false });

module.exports = function(app) {
  app.get('/', requiredAuth, (req, res) => { res.send('we')});
  app.post('/signup', Authentication.signup);
  app.post('/signin', requireSignIn, Authentication.signin);
};
