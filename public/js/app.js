var app = app || {};

$(function() {
    var questions = [
      {
        type: 'text',
        question: 'Name of Tenant',
        answer: 'John Smith'
      },
      {
        type: 'date',
        question: 'What is the start date?',
        answer: '22-2-2014',
      },
      {
        type: 'date',
        question: 'What is the end date?',
        answer: '22-2-2014',
      },
      {
        type: 'binary',
        question: 'Pets allowed',
        choices: ['yes', 'no'],
        answer: 'yes'
      },
      {
        type: 'multiChoice',
        question: 'What are you subletting?',
        choices: ['Private Room', 'Shared Room', 'Couch', 'Floor'],
        answer: 'Shared Room'
      },
      {
        type: 'multiAnswer',
        question: 'Which utilities are included?',
        choices: ['electric', 'gas', 'internet', 'water'],
        answer: ['electric', 'gas']
      },
      {
        type: 'amountPerCycle',
        question: 'What is the rent amount?',
        cycles: ['hours', 'week', 'day', 'month'],
        answer: {
          cycle: 'week',
          amount: '100',
        }
      }
    ];

    //mimic the updated template we will get back from the backend
    var template = {
      questions: questions,
      state: 'CA',
      version: '0.1'
    };

    new app.TemplateView( template );
});
