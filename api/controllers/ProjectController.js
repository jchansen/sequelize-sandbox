/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  index: function(req, res){
    Project.findAll().then(function(projects){
      res.ok(projects);
    }).catch(function(err){
      res.serverError(err);
    });
  }

};
