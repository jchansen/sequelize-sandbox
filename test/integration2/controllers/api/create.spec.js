var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');
var errors = require('../../../../api/errors');
var userProfiles = require('../../../userProfiles');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('apis#create', function() {

  beforeEach(function(){
    return rebuildDatabase();
  });

  describe('when creating a new api', function() {

    describe('when user is not authorized', function(){
      it('should return 401', function(done){
        sails.request({
          method: 'post',
          url: '/api/api',
          headers: {
            'authorization': 'Bearer bad-token'
          }
        }, function(err, res, body){
          expect(err.status).to.equal(401);
          done();
        });
      });
    });

    describe('when the api name contains invalid characters', function() {

      it('will return a 400 indicating that the name is invalid', function(done) {
        sails.request({
          method: 'post',
          url: '/api/api',
          headers: {
            'authorization': 'Bearer good-token'
          },
          data: {
            name: '¯\_(⊙︿⊙)_/¯'
          }
        }, function(err, res, body){
          expect(err.body).to.eql(errors(3001));
          done();
        });
      });

    });

    describe('when there is no request body', function() {
      it('will return a 400 indicating that the name is invalid', function(done) {
        sails.request({
          method: 'post',
          url: '/api/api',
          headers: {
            'authorization': 'Bearer good-token'
          }
        }, function(err, res, body){
          expect(err.body).to.eql(errors(3002));
          done();
        });
      });
    });

    describe('when the api name is taken', function() {
      var name = 'do-not-duplicate-me-bro',
          owner = null;

      beforeEach(function(done){
        factory.create('User', {
          authId: userProfiles.defaultUser.user_id
        }, function(err, user){
          if(err) throw err;
          var apiData = {
            name: name,
            ownerId: user.authId
          };
          owner = user;
          factory.create('Api', apiData, function(err, api){
            if(err) throw err;
            done();
          })
        })
      });

      it('will return a 400 indicating that the name is already taken', function(done) {
        sails.request({
          method: 'post',
          url: '/api/api',
          headers: {
            'authorization': 'Bearer good-token'
          },
          data: {
            name: name
          }
        }, function(err, res, body){
          expect(err.body).to.eql(errors(3003));
          done();
        });
      });
    });

    describe('when the api name is a reserved api name (i.e admin, storcery, mikrofusion, chrisfishwood, god, etc)', function() {
      it('will return a 400 indicating that the name is already taken', function(done) {
        sails.request({
          method: 'post',
          url: '/api/api',
          headers: {
            'authorization': 'Bearer good-token'
          },
          data: {
            name: "mikrofish"
          }
        }, function(err, res, body){
          expect(err.body).to.eql(errors(3003));
          done();
        });
      });
    });

    describe('when the api gets created', function() {
      var name = 'a-create-api';

      it('will return a 201 and the api that gets created', function(done) {
        sails.request({
          method: 'post',
          url: '/api/api',
          headers: {
            'authorization': 'Bearer good-token'
          },
          data: {
            name: name
          }
        }, function(err, res, body){
          expect(res.statusCode).to.equal(201);
          expect(body.id).to.exist;
          expect(body.name).to.equal(name);
          done();
        });
      });

      it('will set the ownerId to the id of the user that created the API', function(done) {
        sails.request({
          method: 'post',
          url: '/api/api',
          headers: {
            'authorization': 'Bearer good-token'
          },
          data: {
            name: name
          }
        }, function(err, res, body){
          expect(body.ownerId).to.equal(userProfiles.defaultUser.user_id);
          done();
        });
      });

    });
  });
});
