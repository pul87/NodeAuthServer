module.exports = function(app) {

  app.get('/', (req, res, next) => {
    res.json(['uno', 'due', 'tre']);
  });

};
