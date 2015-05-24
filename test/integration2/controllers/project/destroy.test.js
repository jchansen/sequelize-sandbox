var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('project#destroy', function(){
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

  it('should remove project', function(done){
    sails.request({
      method: 'delete',
      url: '/api/project/' + id,
      headers: {
        'authorization': 'Bearer good-token'
      }
    }, function(err, res, body){
      expect(res.statusCode).to.equal(200);
      expect(body.title).to.equal("projectName");

      sails.request({
        method: 'get',
        url: '/api/project/' + id,
        headers: {
          'authorization': 'Bearer good-token'
        }
      }, function(err, res, body){
        expect(err.status).to.equal(404);
        done();
      });
    });
  });

});
