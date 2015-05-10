/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: '.tmp/db.sqlite'
});

module.exports.bootstrap = function(cb) {

  var Project = sequelize.define('Project', {
    title:       Sequelize.STRING,
    description: Sequelize.TEXT
  });

  var Task = sequelize.define('Task', {
    title:       Sequelize.STRING,
    description: Sequelize.TEXT,
    deadline:    Sequelize.DATE
  });

  Project.hasMany(Task);

  sequelize.sync({force: true}).then(function() {
    // bootstrap data
    var task = Task.build({title: 'very important task'});
    task.save()
      .then(function() {
        //console.log("success!");
        // It's very important to trigger this callback method when you are finished
        // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
        cb();
      })
      .error(function(err) {
        console.log(err);
      });
  });


};
