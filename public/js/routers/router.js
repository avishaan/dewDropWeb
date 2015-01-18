var app = app || {};
var Router = Backbone.Router.extend({
  routes: {
    'test': 'test',
    'phone/:phone': 'phone'
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
