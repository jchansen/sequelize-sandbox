/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

/**
 * Find Records
 *
 *  get   /:modelIdentity
 *   *    /:modelIdentity/find
 *
 * An API call to find and return model instances from the data adapter
 * using the specified criteria.  If an id was specified, just the instance
 * with that unique id will be returned.
 */
module.exports = function findRecords (req, res) {
  // Look up the model
  var Model = actionUtil.parseModel(req);

  // Lookup for records that match the specified criteria
  Model.findAll().then(function(matchingRecords){
    res.ok(matchingRecords);
  }).catch(function(err){
    res.serverError(err);
  });
};
