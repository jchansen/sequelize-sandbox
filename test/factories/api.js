var Project = require('../../api/models/Api');

module.exports = function(factory, Model) {

  factory.define('Api', Model, {
    name: 'apiName'
  });

};
