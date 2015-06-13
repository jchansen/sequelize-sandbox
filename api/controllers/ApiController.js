/**
 * ApiController
 *
 * @description :: Server-side logic for managing Apis
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var actionUtil = require('sails/lib/hooks/blueprints/actionUtil');
var _ = require('lodash');
var sequelize = require('sequelize');

/**
 * Create Record
 *
 * post /:modelIdentity
 *
 * An API call to find and return a single model instance from the data adapter
 * using the specified criteria.  If an id was specified, just the instance with
 * that unique id will be returned.
 */

function checkValidCharacters(name) {
  var re = new RegExp('^[a-z0-9-]+$');
  if (!re.test(name)) return sails.__('name.invalid');
  return true;
}

module.exports = {

  create: function findRecords (req, res) {
    // Create data object (monolithic combination of all parameters)
    // Omit the blacklisted params (like JSONP callback param, etc.)
    var data = actionUtil.parseValues(req);

    //if(checkValidCharacters(data.name)){
    //  return res.badRequest();
    //}

    // Create new instance of model using data from params
    Api.create(data).then(function(newInstance) {
      // Send JSONP-friendly response if it's supported
      res.created(newInstance);
    }).catch(function(err){
      var error;
      // Set the status here or negotiate will default the status to 500
      if(err instanceof sequelize.ValidationError) {
        error = err.errors[0];
        // error.path === "name"
        switch(error.type){
          case "Validation error": return res.customError(3001, err);
          case "notNull Violation": return res.customError(3002, err);
          case "unique violation": return res.customError(3003, err);
        }
      }
      res.negotiate(err);
    });
  }

};

