var FactoryGirl = require('factory-girl');

module.exports = function() {
  var Adapter = function () {};
  Adapter.prototype = new FactoryGirl.Adapter();

  Adapter.prototype.build = function(Model, attributes) {
    return Model.build(attributes);
  };

  Adapter.prototype.save = function(doc, Model, callback) {
    doc.save().then(function(model){
      callback(null, model);
    }).catch(function(err){
      callback(err);
    });
  };

  Adapter.prototype.destroy = function(doc, Model, callback) {
    doc.destroy().done(callback);
  };

  return new Adapter();
};
