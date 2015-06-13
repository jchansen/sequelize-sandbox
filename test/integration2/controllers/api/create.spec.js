var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');
var errors = require('../../../../api/errors');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('Apis#create', function() {

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

    });

    describe('when the api name is a reserved api name (i.e admin, storcery, mikrofusion, chrisfishwood, god, etc)', function() {

    });

    describe('when the api gets created', function() {

    });
  });
});
