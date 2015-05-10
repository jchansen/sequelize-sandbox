/**
* Task.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://docs.sequelizejs.com/en/1.7.0/docs/models/
*/

module.exports = function(sequelize, DataTypes) {

  return sequelize.define('Task', {
    title:       {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    deadline:    DataTypes.DATE
  })

};

