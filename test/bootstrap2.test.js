var sails = require('sails');

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
