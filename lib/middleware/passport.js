var passport = require('passport'),
    Auth0Strategy = require('passport-auth0');

var strategy = new Auth0Strategy({
    domain: process.env['AUTH0_DOMAIN'],
    clientID: process.env['AUTH0_CLIENT_ID'],
    clientSecret: process.env['AUTH0_CLIENT_SECRET'],
    callbackURL: process.env['AUTH0_CALLBACK_URL']
  },
  function (accessToken, refreshToken, profile, done) {
    //Some tracing info
    //console.log('profile is', profile);

    // Add the accessToken to the profile in case we ever want to link accounts
    profile.accessToken = accessToken;

    return done(null, profile);
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
