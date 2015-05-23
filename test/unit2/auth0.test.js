var expect = require('chai').expect;
var nock = require('nock');
var auth0Middleware = require('../../lib/middleware/auth0');

describe('Auth0 Middleware (integration2)', function(){

  before(function(){
    nock.disableNetConnect();
  });

  after(function(){
    nock.restore();
  });

  describe('middleware', function(){

    beforeEach(function(){
      nock('http://www.google.com')
        .get('/')
        .reply(200, 'Hello from Google!');
    });

    it('should return 401 token is invalid', function(done){
      var req = {},
          res = {};
      auth0Middleware(req, res, function(){
        expect(req.user).to.exist;
        done();
      })
    });
  });

});
