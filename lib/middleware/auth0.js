var request = require('request');

module.exports = function(req, res, next){
  request('http://www.google.com', function (error, response, body) {
    req.user = {};
    next();
  })
};
