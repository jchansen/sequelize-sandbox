var FactoryGirl = require('factory-girl');
var adapter = require('factory-girl-sequelize')();
var Factory = new FactoryGirl.Factory();

var Sequelize = require('sequelize');
var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: '.tmp/test.sqlite'
});

var requireDir = require('require-dir');
var models = requireDir('../api/models');


module.exports = function() {
  var factory = new FactoryGirl.Factory();
  factory.setAdapter(adapter);

  var Models = {};

  Object.keys(models).map(function(modelName){
    var model = models[modelName];
    Models[modelName] = sequelize.define(modelName, model.attributes)
  });

  require('./factories/project')(factory, Models['Project']);
  require('./factories/task')(factory, Models['Task']);

  return factory;
};
