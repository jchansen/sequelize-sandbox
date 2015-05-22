var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');

//before(function(done){
//
//  // Load the app (no need to "lift" to a port)
//  sails.load({
//    log: {
//      level: 'warn'
//    },
//    hooks: {
//      grunt: false
//    }
//  }, function whenAppIsReady(err){
//    if (err) return done(err);
//
//    // At this point, the `sails` global is exposed, although we
//    // could have disabled it above with our config overrides to
//    // `sails.load()`. In fact, you can actually use this technique
//    // to set any configuration setting you like.
//    return done();
//  });
//});
//
//after(function afterTestsFinish (done) {
//  sails.lower(done);
//});

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe.only('Project Controller (integration2)', function(){

  beforeEach(function(done){
    rebuildDatabase().then(function(){
      done();
    })
  });

  describe('#index', function(){

    beforeEach(function(done){
      factory.createMany('Project', 3, function(err, projects){
        done();
      })
    });

    it('should return a list of projects', function(done){
      sails.request({
        method: 'get',
        url: '/api/project'
      }, function(err, res, body){
        expect(res.body.length).to.equal(3);
        done();
      });
    });

    it('should be true', function(){
      expect(2).to.equal(2);
    });
  });

  describe('#create', function(){

    it('should create a project', function(done){
      sails.request({
        method: 'post',
        url: '/api/project',
        data: {
          title: "rabbit"
        }
      }, function(err, res, body){
        expect(res.statusCode).to.equal(201);
        expect(res.body.title).to.equal("rabbit");
        done();
      });
    });

  });

});
