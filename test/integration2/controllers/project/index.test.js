var sails = require('sails');
var expect = require('chai').expect;
var factory = require('../../../factories')();
var sequelize = require('../../../sequelize');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('Project Controller (integration2)', function(){

  beforeEach(function(){
    return rebuildDatabase();
  });

  describe('#index', function(){

    beforeEach(function(done){
      factory.createMany('Project', 3, function(err, projects){
        done();
      })
    });

    it('should return list of projects', function(done){
      sails.request({
        method: 'get',
        url: '/api/project'
      }, function(err, res, body){
        expect(res.body.length).to.equal(3);
        done();
      });
    });

    it('should be true', function(){
      expect(2).to.equal(2);
    });
  });

  describe('#create', function(){

    it('should create a project', function(done){
      sails.request({
        method: 'post',
        url: '/api/project',
        data: {
          title: "rabbit"
        }
      }, function(err, res, body){
        expect(res.statusCode).to.equal(201);
        expect(res.body.title).to.equal("rabbit");
        done();
      });
    });

  });

  describe('#update', function(){
    var id;

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

  describe('#destroy', function(){
    var id;

    beforeEach(function(done){
      factory.create('Project', function(err, project){
        id = project.id;
        done();
      })
    });

    it('should remove project', function(done){
      sails.request({
        method: 'delete',
        url: '/api/project/' + id
      }, function(err, res, body){
        expect(res.statusCode).to.equal(200);
        expect(res.body.title).to.equal("projectName");

        sails.request({
          method: 'get',
          url: '/api/project/' + id
        }, function(err, res, body){
          expect(err.status).to.equal(404);
          done();
        });
      });
    });

  });

});
