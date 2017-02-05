const User = require('../models/user');
const jwt      = require('jwt-simple');
const config   = require('../config');


function generateToken(user){
  const timestamp = new Date().getTime();
  // encrypt the user._id, email could change over time
  return jwt.encode({ sub: user._id, iat: timestamp }, config.AUTH.SECRET);
};

exports.signup = ( req, res, next ) => {

  const { email, password } = req.body;
  // check if user exists

  if ( !email || !password )
    return res.status(400).json({ error: 'You must provide email and password!'})

  const user = User.findOne({ email }, (err, user) => {

    if (err) return next(err);
    if (user) return res.status(422).json({ error: 'Email is in use.'});

    const newUser = new User({ email, password });

    newUser.save((err, user) => {
      if (err) return next(err);
      return res.json({ token: generateToken(user) });
    });
  });
}

exports.signin = ( req, res, next ) => {

  const { user, body: { email, password } } = req;

  res.json({ token: generateToken(user) });
}
