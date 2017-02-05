const passport      = require('passport');
const User          = require('../models/user');
const config        = require('../config');
// Used for JWT authentication
const JwtStrategy   = require('passport-jwt').Strategy;
const ExtractJwt    = require('passport-jwt').ExtractJwt;
// Used for username/passport authentication ( Sign In )
const LocalStrategy = require('passport-local').Strategy;

// Setup options for Local Strategy
const localOptions = { usernameField: 'email' };
// Create a Local Strategy for login
const localLogin = new LocalStrategy(localOptions, function(email, password, done){

  User.findOne({ email: email }, function(err, user){
    if (err) return done(err);
    if (!user) return done(null, false);

    // verify password
    // recupero il salt dalla password salvata ( hash password )
    // eseguo l'hash della password inviata dal client usando il salt recuperato dal db
    // se l'hash della password salvata corrisponde all'hash appena generato => ok se no Unauthorized
    // la comparazione si fa tramite la funzione bcrypt.compare nello schema di mongoose ( User )
      user.comparePasswords(password, function(err, isMatch){
        if (err) return done(err);
        if (!isMatch) return done(null, false);
        return done(null, user);
      });
  });
});

// Setup options for JWT Strategy
const jwtOptions = {
  // where to look for jwt token
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  // secret for decoding
  secretOrKey: config.AUTH.SECRET
};

// Create JWT Strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
  // See if the user ID in the payload ( jwt token decoded ) exists in the database
  // if it does call 'done' with the user object
  // otherwise, call 'done' without the use object
  User.findById(payload.sub, function(err, user){
    if (err) return done(err, false);

    if (user) {
      done(null, user);
    } else{
      done(null, false);
    }
  });
});

// Tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
