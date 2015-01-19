var app = app || {};
var Router = Backbone.Router.extend({
  routes: {
    'test': 'test',
    'handle/:handle': 'handle',
    'phone/:phone': 'phone'
  },
  handle: function(param) {
    console.log('route @ handle');
    return param;
  },
  phone: function(param) {
    console.log('route @ phone');
  },
  test: function(param) {
    console.log('route @ test');
    //app.AppView.trigger('test');
  }
});

app.Router = new Router();
Backbone.history.start();
