var app = app || {};

app.QuestionView = Backbone.View.extend({
    tagName: 'div',
    className: 'questionContainer',
    template: _.template(
            '<%= question %>'
    ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});

app.TextQuestionView = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
    template: _.template(
        '<label for="<%= cid %>" class="col-sm-3 control-label"><%= question %></label>' +
        '<div class="col-sm-3">' +
            '<input type="text" class="form-control" id="<%= cid %>" placeholder="Enter answer">' +
        '</div>'
    ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});

app.BinaryQuestionView = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
    template: _.template(
        '<div class="col-sm-offset-3 col-sm-2">' +
          '<div class="checkbox">' +
            '<label>' +
              '<input type="checkbox"> <%= question %>' +
            '</label>' +
          '</div>' +
        '</div>' 
    ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});

app.MultiChoiceQuestionView = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
    template: _.template(' \
       <label for="<%= cid %>" class="col-sm-3 control-label"><%= question %></label> \
       <div class="col-sm-3"> \
         <div class="btn-group" id="<%= cid %>"> \
           <% choices.forEach(function(choice){ %> \
                <button type="button" class="btn btn-default"><%= choice %></button> \
           <% }) %> \
         </div> \
      </div> \
       '),
    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});

app.MultiAnswerQuestionView = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
    template: _.template(' \
       <label for="<%= cid %>" class="col-sm-3 control-label"><%= question %></label> \
       <div class="col-sm-3"> \
         <div class="btn-group" data-toggle="buttons" id="<%= cid %>"> \
           <% choices.forEach(function(choice){ %> \
              <label class="btn btn-default"> \
                <input type="checkbox" > <%= choice %> \
              </label> \
           <% }) %> \
         </div> \
      </div> \
       '),
    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});

app.AmountPerCycleQuestionView = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
    template: _.template(' \
       <label for="<%= cid %>" class="col-sm-3 control-label"><%= question %></label> \
       <div class="col-sm-3"> \
         <div class="input-group"> \
           <span class="input-group-addon">$</span> \
           <input type="number" class="form-control" placeholder="Rent"> \
         </div> \
         <select class="form-control"> \
         <div class="btn-group" data-toggle="buttons" id="<%= cid %>"> \
           <% cycles.forEach(function(cycle){ %> \
              <option> <%= cycle %> </option> \
           <% }) %> \
         </select> \
      </div> \
       '),
    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );
        return this;
    }
});

app.DateQuestionView = Backbone.View.extend({
    tagName: 'div',
    className: 'form-group',
    template: _.template(
        '<label for="<%= cid %>" class="col-sm-3 control-label"><%= question %></label>' +
        '<div class="col-sm-3">' +
            '<input type="date" class="form-control" id="<%= cid %>">' +
        '</div>'
    ),

    render: function() {
        //this.el is what we defined in tagName. use $el to get access to jQuery html() function
        this.$el.html( this.template( this.model.toJSON() ) );

        return this;
    }
});
