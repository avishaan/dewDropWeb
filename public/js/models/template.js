var app = app || {};
app.Template = Backbone.Model.extend({
  defaults: {
    questions: [],
    state: 'CA'
  },
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
    json.cid = this.cid;
    return json;
  }
});
