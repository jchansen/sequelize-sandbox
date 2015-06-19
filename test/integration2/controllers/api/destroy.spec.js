var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');
var errors = require('../../../../api/errors');
var nock = require('nock');

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


        it('should destroy the api and all its children', function(done) {
          // delete the API
          sails.request({
            method: 'delete',
            url: '/api/api/' + api.id,
            headers: {
              authorization: 'Bearer good-token'
            }
          }, function(err, res, body){
            expect(res.statusCode).to.eq(204);

            // try getting the API
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
      var owner = null,
          notOwner = null,
          ownersApi;

      beforeEach(function(done){

        // create the user that will own the API
        factory.create('User', {authId: "owner"}, function(err, user){
          owner = user;

          // create the user we will log in as
          factory.create('User', {authId: "not-owner"}, function(err, user){
            notOwner = user;

            // create the API that belongs to the owner
            factory.create('Api', {
              ownerId: owner.authId
            }, function(err, api){
              ownersApi = api;

              // remove the default auth interceptor
              // note: if you include path it will only remove the first interceptor
              nock.removeInterceptor({
                proto : 'https',
                hostname : 'storcery.auth0.com',
                //path : '/tokeninfo',
                method: 'POST'
              });

              // make sure we log in as the user that is not the owner
              nock('https://storcery.auth0.com/')
                .persist()
                .post('/tokeninfo', {
                  id_token: "good-token"
                })
                .reply(200, {
                  user_id: notOwner.authId,
                  name: "Test User",
                  nickname: "testuser",
                  picture: "https://secure.gravatar.com/avatar/abc123",
                  email: "test_user@gmail.com"
                });

              done();
            })
          })
        });
      });

      describe('and they attempt to destroy an api', function() {
        it.only('will return a 404 indicating that the API can not be found', function(done) {

          sails.request({
            method: 'delete',
            url: '/api/api/' + ownersApi.id,
            headers: {
              authorization: 'Bearer good-token'
            }
          }, function(err, res, body){
            expect(err.status).to.equal(404);
            done();
          });
        });

      });
    });

    describe('when not logged in', function() {
      describe('does not delete the api and returns an error', function() {
      });
    });
  });
});
