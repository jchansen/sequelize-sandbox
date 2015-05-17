module.exports = function(FactoryGirl) {
  var Adapter = function () {};
  Adapter.prototype = new FactoryGirl.Adapter();

  Adapter.prototype.build = function(Model, attributes) {
    return Model.build(attributes);
  };

  Adapter.prototype.save = function(doc, Model, callback) {
    doc.save().done(callback);
  };

  Adapter.prototype.destroy = function(doc, Model, callback) {
    doc.destroy().done(callback);
  };

  return new Adapter();
};
