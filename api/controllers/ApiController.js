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

var errors = require('../errors');

var RESERVED_NAMES = [
  'storcery',
  'storceryio',
  'mikro.fish',
  'mikrofish',
  'mikrofusion',
  'groseclose',
  'mikegroseclose',
  'chrisfishwood',
  'admin',
  'god',
  'su',
  'sudo',
  'status',
  'home',
  'jchansen',
  'www'
];

function checkValidCharacters(name) {
  var re = new RegExp('^[a-z0-9-]+$');
  if (!re.test(name)) return sails.__('name.invalid');
  return true;
}

function checkReservedNames(name) {
  if (RESERVED_NAMES.indexOf(name.toString().toLowerCase()) !== -1) {
    throw errors(3003);
  }
}

module.exports = {

  create: function(req, res) {
    // Create data object (monolithic combination of all parameters)
    // Omit the blacklisted params (like JSONP callback param, etc.)
    var data = actionUtil.parseValues(req);

    //if(checkValidCharacters(data.name)){
    //  return res.badRequest();
    //}

    if(data.name) checkReservedNames(data.name);

    // set the api owner to the user that created it
    data.ownerId = req.user.user_id;

    // Create new instance of model using data from params
    Api.create(data).then(function(newInstance) {
      // Send JSONP-friendly response if it's supported
      res.created(newInstance);
    }).catch(function(err){
      var error;
      // Set the status here or negotiate will default the status to 500
      // todo: I think it's a mistake to let the errors end up in the database
      //       it means business logic is being left in the DB - code should enforce
      //       leaving it in code also means we have a natural place to examine state
      //       of data and easily select and throw the correct error type
      if(err instanceof sequelize.ValidationError) {
        error = err.errors[0];
        if(error.path === "name"){
          switch(error.type){
            case "Validation error": return res.customError(3001, err);
            case "notNull Violation": return res.customError(3002, err);
            case "unique violation": return res.customError(3003, err);
          }
        }else if(error.path === "ownerId"){
          switch(error.type){
            case "notNull Violation": return res.customError(3004, err);
          }
        }

      }
      res.negotiate(err);
    });
  },

  destroy: function(req, res) {
    // Locate and validate the required `id` parameter.
    var pk = actionUtil.requirePk(req);

    // Lookup for records that match the specified criteria
    Api.findOne({
      where: {
        id: pk
      }
    }).then(function(record){
      if(!record) return res.notFound('No record found with the specified `id`.');
      return record.destroy().then(function(record){
        //res.ok(record);
        res.status(204);
        res.json();
      });
    }).catch(function(err){
      res.negotiate(err);
    });
  }

};

