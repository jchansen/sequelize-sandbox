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
  var modelName = _.capitalize(model);
  var Model = models[modelName];

  // Lookup for records that match the specified criteria
  Model.findAll().then(function(matchingRecords){
    res.ok(matchingRecords);
  }).catch(function(err){
    res.serverError(err);
  });
};
