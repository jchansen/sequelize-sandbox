var Task = require('../../api/models/Task');

module.exports = function(factory, Model) {

  factory.define('Task', Model, {
    title: 'taskName'
  });

};
