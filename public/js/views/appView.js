var app = app || {};

app.AppView = Backbone.View.extend({
  el: '#app',
  events: {
    'click #submit': 'navigate'
  },
  initialize: function(template) {
    console.log('init');
    this.render();
    // listen to the router
    this.listenTo(app.Router, 'route:handle', this.renderCharts);
    // if we are already at the correct route, go ahead and render the charts right away
    if (URI(window.location).hash().length > 5){
      // trigger route and pass correct argument coming from router which will do the parsing and return the id
      app.Router.trigger('route:handle', window.location.hash.split('/')[1]);
    }
  },
  render: function() {
    // get a model from the collection
    // render some stuff to the view
    console.log('render appView');
    this.renderInput();
  },
  renderInput: function(id) {
    // render button for input criteria fields
    this.inputView = new app.InputView();
    this.$el.append(this.inputView.el);
  },
  renderCharts: function(id) {
    // any charts need to be rendered from here
    this.renderChartView(id);
  },
  renderChartView: function(id) {
    this.handleView = new app.HandleView({id: id});
    this.$el.append(this.handleView.el);
    this.inputView.close();
  },
  navigate: function(event) {
    // prevent the url from having a ?
    event.preventDefault();
    // go to url based on the input field
    var field = this.$el.find('#handle').val();
    app.Router.navigate("/handle/" + field, {trigger: true});
  }
});
