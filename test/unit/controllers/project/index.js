var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');
var ProjectController = require('../../../../api/controllers/ProjectController');

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

    it('should return a list of projects', function(){
      var req = {},
          res = {
            ok: sinon.spy()
          };

      //ProjectController.index(req, res);
      //expect(res.ok.called).to.be.true;
    })
  })
});
