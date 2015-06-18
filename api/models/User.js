/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var Sequelize = require('sequelize');

module.exports = {

  attributes: {
    id: {
      primaryKey: true,
      allowNull: false,
      unique: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    authId: {
      type: Sequelize.STRING
    },
    email:{
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    nickname: {
      type: Sequelize.STRING
    },
    picture: {
      type: Sequelize.STRING
    },
    href: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isUrl: true
      }
    }
  }
};

