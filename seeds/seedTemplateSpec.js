var db = require('../dbs/db.js');
var Template = require('../models/template.js');

module.exports.seed = function (done){
  Template.remove({}, function(err, template){
    if (err){
      console.error("Ran into error", err);
    } else {
      console.log('Templates deleted');
      Template.create({
        questions: [
          {
          type: 'text',
          question: 'Name of Tenant'
        },
        {
          type: 'date',
          question: 'What is the start date?'
        },
        {
          type: 'date',
          question: 'What is the end date?'
        },
        {
          type: 'binary',
          question: 'Pets allowed',
          choices: ['yes', 'no']
        },
        {
          type: 'multiChoice',
          question: 'What are you subletting?',
          choices: ['Shared Room', 'Private Room', 'Couch', 'Floor']
        },
        {
          type: 'multiAnswer',
          question: 'Which utilities are included?',
          choices: ['electric', 'gas', 'internet', 'water']
        },
        {
          type: 'amountPerCycle',
          question: 'What is the rent amount?',
          cycles: ['hours', 'week', 'day', 'month']
        }
        ],
        version: '0.1',
        state: 'CA'
      }, function(err, template){
        if (!err){
          //call the next callback, send the template in with it so we have it's id
          done(null, {template: template});
        } else {
          done(err);
          console.error('Error creating', err);
        }
      });
    }
  });
};
