var app = app || {};
app.Question = Backbone.Model.extend({
  defaults: {
    type: 'text',
    question: 'Missing Question Here'
  },
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
    json.cid = this.cid;
    return json;
  }
});
