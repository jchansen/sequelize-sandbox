var FactoryGirl = require('factory-girl');
var adapter = require('./factory-girl-sequelize-adapter')();

// Setup sequelize
var sequelize = require('./sequelize');

// Require all the models in api/models
var requireDir = require('require-dir');
var models = requireDir('../api/models');

// Setup FactoryGirl to use Sequelize
var factory = new FactoryGirl.Factory();
factory.setAdapter(adapter);

var Models = {};

Object.keys(models).map(function(modelName){
  var model = models[modelName];
  Models[modelName] = sequelize.define(modelName, model.attributes)
  global[modelName] = Models[modelName];
});

require('./factories/project')(factory, Models['Project']);
require('./factories/task')(factory, Models['Task']);
require('./factories/api')(factory, Models['Api']);

module.exports = function() {
  return factory;
};
