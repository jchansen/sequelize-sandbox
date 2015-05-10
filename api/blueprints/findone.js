/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');
var models = require('../models');

/**
 * Find One Record
 *
 * get /:modelIdentity/:id
 *
 * An API call to find and return a single model instance from the data adapter
 * using the specified id.
 *
 * Required:
 * @param {Integer|String} id  - the unique id of the particular instance you'd like to look up *
 */
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
