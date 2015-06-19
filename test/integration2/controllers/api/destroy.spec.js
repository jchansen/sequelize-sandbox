var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');
var errors = require('../../../../api/errors');
var Promise = require('bluebird');
var pSailsRequest = Promise.promisify(sails.request);

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('apis#destroy', function() {
  describe('when deleting a api', function() {
    describe('when logged in as the user with the appropriate creds', function() {
      describe('and they attempt to destroy an api', function() {
        var api;

        beforeEach(function(done){
          factory.create('User', {}, function(err, user){
            if(err) throw err;
            var apiData = {
              ownerId: user.authId
            };
            owner = user;
            factory.create('Api', apiData, function(err, _api){
              if(err) throw err;
              api = _api;
              done();
            })
          })
        });

        it('will return a 204 and an empty body', function(done) {
          sails.request({
            method: 'delete',
            url: '/api/api/' + api.id,
            headers: {
              'authorization': 'Bearer good-token'
            }
          }, function(err, res, body){
            expect(res.statusCode).to.eq(204);
            expect(res.body).to.be.undefined;
            done();
          });
        });


        it.only('should destroy the api and all its children', function(done) {
          sails.request({
            method: 'delete',
            url: '/api/api/' + api.id,
            headers: {
              authorization: 'Bearer good-token'
            }
          }, function(err, res, body){
            expect(res.statusCode).to.eq(204);

            sails.request({
              method: 'get',
              url: '/api/api/' + api.id,
              headers: {
                authorization: 'Bearer good-token'
              }
            }, function(err, res, body){
              expect(err.body).to.eql(errors(2002));
              done();
            })
          });
        });
      });
    });

    describe('when logged in as a user without the appropriate creds', function() {
      describe('and they attempt to destroy an api', function() {
      });
    });

    describe('when not logged in', function() {
      describe('does not delete the api and returns an error', function() {
      });
    });
  });
});
