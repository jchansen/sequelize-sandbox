require('dotenv').load();
var sails = require('sails');

// IMPORTANT!!
// Because we're using the sails.load version for integration tests, which in turns
// uses the mock-req library for generated http requests, we need to transfer the
// methods that passport adds to the http.IncomingMessage prototype onto the prototype
// of the library that sails uses (so we need to reach inside sails for the right library)
var passport = require('passport');
var http = require('http');
var mockReq = require('sails/node_modules/mock-req');
var methods = ['login', 'logIn', 'logout', 'logOut', 'isAuthenticated', 'isUnauthenticated'];

methods.forEach(function(method){
  mockReq.prototype[method] = http.IncomingMessage.prototype[method];
});

before(function(done){

  // Load the app (no need to "lift" to a port)
  sails.load({
    log: {
      level: 'warn'
    },
    hooks: {
      grunt: false
    }
  }, function whenAppIsReady(err){
    if (err) return done(err);

    // At this point, the `sails` global is exposed, although we
    // could have disabled it above with our config overrides to
    // `sails.load()`. In fact, you can actually use this technique
    // to set any configuration setting you like.
    return done();
  });
});

after(function afterTestsFinish (done) {
  sails.lower(done);
});
