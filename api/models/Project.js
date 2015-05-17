/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://docs.sequelizejs.com/en/1.7.0/docs/models/
*/

var Sequelize = require('sequelize');

module.exports = {

  attributes: {
    title: Sequelize.STRING,
    description: Sequelize.TEXT
  }

};
