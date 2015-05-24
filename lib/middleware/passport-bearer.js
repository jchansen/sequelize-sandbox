var passport = require('passport'),
    BearerStrategy = require('passport-http-bearer').Strategy,
    request = require('request');

var strategy = new BearerStrategy({
  },
  function (token, done) {
    var user;

    request.post({
      url: "https://storcery.auth0.com/tokeninfo",
      form: {
        id_token: token
      }
    }, function(err, httpResponse, body) {
      if(err) return done(err);

      if(httpResponse.statusCode !== 200) return done(null, false);

      user = JSON.parse(body);
      return done(null, user, { scope: 'all' });
    });
  });

passport.use(strategy);

// you can use this section to keep a smaller payload
passport.serializeUser(function (user, done) {
  console.log("serializeUser");
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log("deserializeUser");
  done(null, user);
});
