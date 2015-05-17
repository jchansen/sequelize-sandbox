var Project = require('../../api/models/Project');

module.exports = function(factory, Model) {

  factory.define('Project', Model, {
    title: 'projectName'
  });

};
