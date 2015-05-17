var FactoryGirl = require('factory-girl');
//var adapter = require('factory-girl-sequelize')();

var Adapter = function () {};
Adapter.prototype = new FactoryGirl.Adapter();

Adapter.prototype.build = function(Model, attributes) {
  return Model.build(attributes);
};

Adapter.prototype.save = function(doc, Model, callback) {
  doc.save().done(callback);
};

Adapter.prototype.destroy = function(doc, Model, callback) {
  doc.destroy().done(callback);
};

var adapter = new Adapter();

// Setup sequelize
var sequelize = require('./sequelize');

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