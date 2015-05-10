var Sequelize = require('sequelize');

var sequelize = new Sequelize('database', 'username', 'password', {
  dialect: 'sqlite',
  storage: '.tmp/db.sqlite'
});

// load models
var models = [
  'Project',
  'Task'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// describe relationships
(function(m) {
  m.Project.hasMany(m.Task);
})(module.exports);

// export connection
module.exports.sequelize = sequelize;
