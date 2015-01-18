var app = app || {};

app.Trusts = Backbone.Collection.extend({
    model: app.Trust,
    initialize: function(options) {
      this.id = options.id;
  },
    //url: '/api/v1/phone'
    url: function() {
      return 'https://dewdrop.neyer.me/trust/statements-about-user/' + this.id;
      //return '/api/v1/handle/' + this.id;
    }
});
