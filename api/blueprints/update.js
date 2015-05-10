/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

/**
 * Update One Record
 *
 * An API call to update a model instance with the specified `id`,
 * treating the other unbound parameters as attributes.
 *
 * @param {Integer|String} id  - the unique id of the particular record you'd like to update  (Note: this param should be specified even if primary key is not `id`!!)
 *
 */
module.exports = function findRecords (req, res) {
  // Look up the model
  var Model = actionUtil.parseModel(req);

  // Locate and validate the required `id` parameter.
  var pk = actionUtil.requirePk(req);

  // Create `values` object (monolithic combination of all parameters)
  // But omit the blacklisted params (like JSONP callback param, etc.)
  var values = actionUtil.parseValues(req);

  // Omit the path parameter `id` from values, unless it was explicitly defined
  // elsewhere (body/query):
  var idParamExplicitlyIncluded = ((req.body && req.body.id) || req.query.id);
  if (!idParamExplicitlyIncluded) delete values.id;

  // Find and update the targeted record.
  //
  // (Note: this could be achieved in a single query, but a separate `findOne`
  //  is used first to provide a better experience for front-end developers
  //  integrating with the blueprint API.)
  Model.findOne({
    where: {
      id: pk
    }
  }).then(function found(matchingRecord) {
    if (!matchingRecord) return res.notFound();
    return matchingRecord.update(values).then(function(updatedRecord){
      res.ok(updatedRecord);
    });
  }).catch(function(err){
    // Differentiate between waterline-originated validation errors
    // and serious underlying issues. Respond with badRequest if a
    // validation error is encountered, w/ validation info.
    res.negotiate(err);
  });
};
