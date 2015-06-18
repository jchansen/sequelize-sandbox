var Project = require('../../api/models/Api');
var authId = 1;

module.exports = function(factory, Model) {

  factory.define('User', Model, {
    authId: function(){
      return authId++;
    }
  });

};
