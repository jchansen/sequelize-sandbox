/**
 * ORM hook
 */

var Sequelize = require('sequelize');
var _ = require('lodash');
var howto_loadAppModelsAndAdapters = require('sails/lib/hooks/orm/load-user-modules');

module.exports = function (sails) {
  var loadAppModelsAndAdapters = howto_loadAppModelsAndAdapters(sails);

  return {

    defaults: {

      globals: {
        adapters: true,
        models: true
      }

    },

    // Run when sails loads-- be sure and call `next()`.
    initialize: function (cb) {

      async.auto({

        // Load model and adapter definitions defined in the project
        _loadModules: function (next) {
          loadAppModelsAndAdapters(next);
        },

        _part2: function(next){
          var sequelize = new Sequelize('database', 'username', 'password', {
            dialect: 'sqlite',
            storage: '.tmp/db.sqlite'
          });

          _.each(sails.models, function(thisModel, modelID) {
            var globalId = thisModel.globalId;
            var identity = thisModel.identity;
            var thisModel = thisModel(sequelize, Sequelize);
            thisModel.globalId = globalId;
            thisModel.identity = identity;

            // Set `sails.models.*` reference to instantiated Collection
            // Exposed as `sails.models[modelID]`
            sails.models[modelID] = thisModel;

            // Create global variable for this model
            // (if enabled in `sails.config.globals`)
            // Exposed as `[globalId]`
            if (sails.config.globals && sails.config.globals.models) {
              var globalName = sails.models[modelID].globalId || sails.models[modelID].identity;
              global[globalName] = thisModel;
            }
          });

          // describe relationships
          (function(m) {
            // m.project.hasMany(m.task);
            Project.hasMany(Task);
          })(sails.models);

          sequelize.sync({force: true}).then(function() {
            console.log("synced");
            return next();
          }).catch(function(err){
            console.log("failed to sync");
            return next(err);
          });
        }

      }, cb);

    }

  };
};

//module.exports = function (sails) {
//  return {
//    initialize: function (next) {
//      next();
//    }
//  };
//};
