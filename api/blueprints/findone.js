/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

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
  var Model = actionUtil.parseModel(req);

  // Locate and validate the required `id` parameter.
  var pk = actionUtil.requirePk(req);

  // Lookup for records that match the specified criteria
  Model.findOne({
    where: {
      id: pk
    }
  }).then(function(matchingRecord){
    //if(!matchingRecord) return res.notFound('No record found with the specified `id`.');
    if(!matchingRecord) return res.customError(2002);
    res.ok(matchingRecord);
  }).catch(function(err){
    res.serverError(err);
  });
};
