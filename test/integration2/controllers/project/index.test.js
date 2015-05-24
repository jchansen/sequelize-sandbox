var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');
var nock = require('nock');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('project#index', function(){

  before(function(){
    nock.disableNetConnect();

    nock('https://storcery.auth0.com/')
      .post('/tokeninfo', {
        id_token: "bad-token"
      })
      .reply(401);

    nock('https://storcery.auth0.com/')
      .post('/tokeninfo', {
        id_token: "good-token"
      })
      .reply(200, {
        user_id: "auth0|54321",
        name: "Test User",
        nickname: "testuser",
        picture: "https://secure.gravatar.com/avatar/abc123",
        email: "test_user@gmail.com"
      });
  });

  after(function(){
    //nock.cleanAll();
    nock.restore();
  });

  beforeEach(function(){
    return rebuildDatabase();
  });

  beforeEach(function(done){
    factory.createMany('Project', 3, function(err, projects){
      done();
    })
  });

  describe("when bearer token is valid", function() {

    it.only('should return a list of projects', function (done) {
      sails.request({
        method: 'get',
        url: '/api/project',
        headers: {
          authorization: "Bearer good-token"
        }
      }, function (err, res, body) {
        expect(body.length).to.equal(3);
        done();
      });
    });

  });

});
