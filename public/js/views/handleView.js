var app = app || {};

app.HandleView = Backbone.View.extend({
  tag: 'div',
  parsedData: {},
  initialize: function() {
    this.collection = new app.Trusts({id: this.id});
    this.collection.fetch({reset: true});
    //this.model.fetch({reset: true});
    this.listenTo(this.collection, 'reset', this.render);
    console.log('init handleView');
  },
  parseData: function() {
    var data;
    debugger;
  },
  render: function() {
    // get a model from the collection
    // render some stuff to the view
    console.log('render');
    this.parseData();
    return this;
  }
});
