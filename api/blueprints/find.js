/**
 * Module dependencies
 */
//var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');
var models = require('../models');

/**
 * Find Records
 *
 *  get   /:modelIdentity
 */

module.exports = function findRecords (req, res) {
  // Look up the model
  var model = req.options.model || req.options.controller;
  //var Model = actionUtil.parseModel(req);
  var modelName = _.capitalize(model);
  var Model = models[modelName];

  // Lookup for records that match the specified criteria
  Model.findAll().then(function(matchingRecords){
    res.ok(matchingRecords);
  }).error(function(err){
    if (err) return res.serverError(err);
  });
};
