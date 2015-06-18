var Project = require('../../api/models/Api');

module.exports = function(factory, Model) {

  factory.define('Collection', Model, {
    name: 'collectionName'
  });

};
