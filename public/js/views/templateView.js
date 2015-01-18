var app = app || {};

app.TemplateView = Backbone.View.extend({
  el: '#templateView',
  events: {
    'click #submit': 'saveContract'
  },

  initialize: function(template) {
    this.collection = new app.Templates();
    this.collection.fetch({reset: true, data: {state: 'CA'}});
    //TODO, bootstrap data then re-render with server response
    //when we get our data from the backend, redo the render
    this.listenTo(this.collection, 'reset', this.render);
  },
  render: function() {
    this.collection.toJSON()[0].questions.forEach(function( question ) {
      // create a model from the individual question objects so we can make views around them
      question = new app.Question(question);
      if (question.get('type') === 'text'){
        this.renderTextQuestion(question);
      } else if (question.get('type') === 'binary'){
        this.renderBinaryQuestion(question);
      } else if (question.get('type') === 'date'){
        this.renderDateQuestion(question);
      } else if (question.get('type') === 'multiChoice'){
        this.renderMultiChoiceQuestion(question);
      } else if (question.get('type') === 'multiAnswer'){
        this.renderMultiAnswerQuestion(question);
      } else if (question.get('type') === 'amountPerCycle'){
        this.renderAmountPerCycleQuestion(question);
      } else {
        this.renderQuestion( question );
      }
    }, this );
    this.renderSubmitButton();
  },
  saveContract: function() {
    //get the updated question from each view
    //make edits to the collection based on the question
    //create a new 'contract' collection
    //save the contract
    //get the unique set of links (submission links) and (admin link)
  },
  renderSubmitButton: function() {
    this.$el.append($('#submitButtonTemplate').html());
  },
  renderTextQuestion: function( textQuestion ) {
    var textQuestionView = new app.TextQuestionView({
      model: textQuestion
    });
    this.$el.append( textQuestionView.render().el );
  },
  renderBinaryQuestion: function( binaryQuestion ) {
    var binaryQuestionView = new app.BinaryQuestionView({
      model: binaryQuestion
    });
    this.$el.append( binaryQuestionView.render().el );
  },
  renderDateQuestion: function( dateQuestion ){
    var dateQuestionView = new app.DateQuestionView({
      model: dateQuestion
    });
    this.$el.append( dateQuestionView.render().el );
  },
  renderMultiChoiceQuestion: function( multichoiceQuestion ){
    var multichoiceQuestionView = new app.MultiChoiceQuestionView({
      model: multichoiceQuestion
    });
    this.$el.append( multichoiceQuestionView.render().el );
  },
  renderMultiAnswerQuestion: function( multianswerQuestion ){
    var multianswerQuestionView = new app.MultiAnswerQuestionView({
      model: multianswerQuestion
    });
    this.$el.append( multianswerQuestionView.render().el );
  },
  renderAmountPerCycleQuestion: function( amountpercycleQuestion ){
    var amountpercycleQuestionView = new app.AmountPerCycleQuestionView({
      model: amountpercycleQuestion
    });
    this.$el.append( amountpercycleQuestionView.render().el );
  },
  renderQuestion: function( question ) {
    var questionView = new app.QuestionView({
      model: question
    });
    this.$el.append( questionView.render().el );
  }
});
