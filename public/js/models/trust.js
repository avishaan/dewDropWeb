var app = app || {};
app.Handle = Backbone.Model.extend({
  defaults: {
    trust: '100',
    troll: '100'
  },
  urlRoot: '/api/v1/handle',
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
    json.cid = this.cid;
    return json;
  }
});
