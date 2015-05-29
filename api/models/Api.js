/**
* Api.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Sequelize = require('sequelize');

module.exports = {

  attributes: {
    name: {
      type: Sequelize.STRING,
      unique: true,
      set: function(val) {
        this.setDataValue('name', val.toLowerCase());
      },
      validate: {
        is: /^[0-9a-z-]+$/
      }
    }

  }
};

