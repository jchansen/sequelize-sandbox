require('dotenv').load();
var sails = require('sails');
var nock = require('nock');

// -------------------------------------------------------------
// Transfer Passports req methods to the mock req we'll be using
// -------------------------------------------------------------

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

// ---------------------------------------------------------------
// Set up Sails to load before all tests and lower after all tests
// ---------------------------------------------------------------

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


// -------------------------------------------
// Set up Nock for valid/invalid user requests
//

before(function(){
  nock.disableNetConnect();

  nock('https://storcery.auth0.com/')
    .persist()
    .post('/tokeninfo', {
      id_token: "bad-token"
    })
    .reply(401);

  nock('https://storcery.auth0.com/')
    .persist()
    .post('/tokeninfo', {
      id_token: "good-token"
    })
    .reply(200, {
      user_id: "auth0|54321",
      name: "Test User",
      nickname: "testuser",
      picture: "https://secure.gravatar.com/avatar/abc123",
      email: "test_user@gmail.com"
    });
});

after(function(){
  nock.restore();
});
