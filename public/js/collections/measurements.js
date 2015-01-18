var app = app || {};

app.Measurements = Backbone.Collection.extend({
    model: app.Measurement,
    initialize: function(options) {
    this.id = options.id;
  },
    //url: '/api/v1/phone'
    url: function() {
      return '/api/v1/phone/' + this.id;
    }
});
