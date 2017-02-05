const User = require('../models/user');

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
      return res.json({ success: true });
    });
  });

}
