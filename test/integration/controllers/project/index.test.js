var request = require('supertest');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('Project Controller', function(){
  describe('#index', function(){

    before(function(done){
      rebuildDatabase().then(function(){
        factory.createMany('Project', 3, function(err, projects){
          done();
        })
      })
    });

    it('should return a list of projects', function(done){
      request(sails.hooks.http.app)
        .get('/api/project')
        .expect(200)
        .expect(function(res){
          expect(res.body.length).to.equal(3);
        })
        .end(done);
    })
  })
});
