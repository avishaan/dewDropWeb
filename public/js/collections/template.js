var app = app || {};

app.Templates = Backbone.Collection.extend({
    model: app.Template,
    url: '/api/v1/templates'
});
