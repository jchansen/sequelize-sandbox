var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('project#index', function(){

  beforeEach(function(){
    return rebuildDatabase();
  });

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

});
