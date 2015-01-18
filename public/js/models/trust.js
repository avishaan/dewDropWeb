var app = app || {};
app.Trust = Backbone.Model.extend({
  defaults: {
    trust: '100',
    troll: '100'
  },
  urlRoot: 'https://dewdrop.neyer.me/trust/statements-about-user/',
  toJSON: function() {
    var json = Backbone.Model.prototype.toJSON.apply(this, arguments);
    json.cid = this.cid;
    return json;
  }
});
