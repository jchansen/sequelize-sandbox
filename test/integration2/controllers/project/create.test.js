var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('project#create', function(){

  beforeEach(function(){
    return rebuildDatabase();
  });

  it('should return 401 if authorization header not set', function(done){
    sails.request({
      method: 'post',
      url: '/api/project'
    }, function(err, res, body){
      expect(err.status).to.equal(401);
      done();
    });
  });

  it('should return 400 if bearer keyword not in authorization header', function(done){
    sails.request({
      method: 'post',
      url: '/api/project',
      headers: {
        authorization: "not-bearer"
      }
    }, function(err, res, body){
      expect(err.status).to.equal(400);
      done();
    });
  });

  describe("when bearer token is invalid", function(){

    it('should return 401', function(done){
      sails.request({
        method: 'post',
        url: '/api/project',
        headers: {
          'authorization': 'Bearer bad-token'
        }
      }, function(err, res, body){
        expect(err.status).to.equal(401);
        done();
      });
    });

  });

  describe("when bearer token is valid", function(){

    it('should create a project', function(done){
      sails.request({
        method: 'post',
        url: '/api/project',
        headers: {
          authorization: "Bearer good-token"
        },
        data: {
          title: "rabbit"
        }
      }, function(err, res, body){
        expect(res.statusCode).to.equal(201);
        expect(body.title).to.equal("rabbit");
        done();
      });
    });

  });

});
