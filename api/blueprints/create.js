/**
 * Module dependencies
 */
var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');

/**
 * Create Record
 *
 * post /:modelIdentity
 *
 * An API call to find and return a single model instance from the data adapter
 * using the specified criteria.  If an id was specified, just the instance with
 * that unique id will be returned.
 */
module.exports = function findRecords (req, res) {
  // Look up the model
  var Model = actionUtil.parseModel(req);

  // Create data object (monolithic combination of all parameters)
  // Omit the blacklisted params (like JSONP callback param, etc.)
  var data = actionUtil.parseValues(req);

  // Create new instance of model using data from params
  Model.create(data).then(function(newInstance) {
    // Send JSONP-friendly response if it's supported
    res.created(newInstance);
  }).catch(function(err){
    // Set the status here or negotiate will default the status to 500
    if(err instanceof models.sequelize.ValidationError) err.status = 400;
    res.negotiate(err);
  });
};
