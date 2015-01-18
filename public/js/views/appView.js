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
    this.listenTo(app.Router, 'route:phone', this.renderCharts);
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
    this.chartView = new app.ChartView({id: id});
    this.$el.append(this.chartView.el);
    this.inputView.close();
  },
  navigate: function(event) {
    // prevent the url from having a ?
    event.preventDefault();
    // go to url based on the input field
    var field = this.$el.find('#phone').val();
    app.Router.navigate("/phone/+" + field, {trigger: true});
  }
});
