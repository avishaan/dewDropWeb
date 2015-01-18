var app = app || {};

app.InputView = Backbone.View.extend({
  tag: 'div',
  template: function() {
    return _.template($('#inputTemplate').html());
  },
  initialize: function() {
    this.render();
  },
  render: function() {
    console.log('renderInput');
    this.$el.append(this.template());
    return this;
  },
  close: function() {
    this.$el.remove();
  }
});
