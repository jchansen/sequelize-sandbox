/**
* Collection.js
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
    name: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      set: function(val) {
        this.setDataValue('name', val.toLowerCase());
      },
      validate: {
        is: /^[0-9a-z-]+$/
      }
    },
    href: {
      type: Sequelize.STRING,
      unique: true,
      validate: {
        isUrl: true
      }
    },
    ownerId: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }

};

