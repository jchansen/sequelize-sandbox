var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('project#update', function(){
  var id;

  beforeEach(function(){
    return rebuildDatabase();
  });

  beforeEach(function(done){
    factory.create('Project', function(err, project){
      id = project.id;
      done();
    })
  });

  it('should change project title', function(done){
    sails.request({
      method: 'put',
      url: '/api/project/' + id,
      data: {
        title: "rabbit2"
      }
    }, function(err, res, body){
      expect(res.statusCode).to.equal(200);
      expect(res.body.title).to.equal("rabbit2");
      done();
    });
  });

});
