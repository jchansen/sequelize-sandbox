/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

/**
 * Destroy One Record
 *
 * delete  /:modelIdentity/:id
 *
 * Destroys the single model instance with the specified `id` from
 * the data adapter for the given model if it exists.
 *
 * Required:
 * @param {Integer|String} id  - the unique id of the particular instance you'd like to delete
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
  }).then(function(record){
    if(!record) return res.notFound('No record found with the specified `id`.');
    return record.destroy().then(function(record){
      res.ok(record);
    });
  }).catch(function(err){
    res.negotiate(err);
  });
};
