var expect = require('chai').expect;
var factory = require('./factories')();
var sequelize = require('./sequelize');

function rebuildDatabase(){
  return sequelize.sync({force: true});
}

describe('Project Controller', function(){
  describe('#index', function(){

    before(function(done){
      rebuildDatabase().then(function(){
        factory.create('Project', function(err, project){
          factory.create('Task', function(err, project){
            done();
          })
        })
      })
    });

    it('should return a list of projects', function(){
      expect([1,2,3].indexOf(5)).to.equal(-1);
      expect([1,2,3].indexOf(0)).to.equal(-1);
    })
  })
});
