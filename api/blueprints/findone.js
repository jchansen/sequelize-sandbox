/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');
var models = require('../models');

module.exports = function findRecords (req, res) {

  // Look up the model
  var model = req.options.model || req.options.controller;
  var modelName = _.capitalize(model);
  var Model = models[modelName];
  var pk = actionUtil.requirePk(req);

  // Lookup for records that match the specified criteria
  Model.findOne({
    where: {
      id: pk
    }
  }).then(function(matchingRecord){
    if(!matchingRecord) return res.notFound('No record found with the specified `id`.');
    res.ok(matchingRecord);
  }).catch(function(err){
    res.serverError(err);
  });

};
