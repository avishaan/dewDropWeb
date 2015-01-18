var db = require('../dbs/db.js');
var TemplateSeed = require('./seedTemplateSpec.js');
var Contract = require('../models/contract.js');

module.exports.seed = function (done){
  Contract.remove({}, function(err, contract){
    if (err){
      console.error("Ran into error", err);
    } else {
      console.log('Contracts deleted');
      // seed the templates first
      TemplateSeed.seed(function(err, models){
        Contract.create({
          questions: [
          {
            type: 'text',
            question: 'Name of Tenant',
            answers: ["John"]
          },
          {
            type: 'date',
            question: 'What is the start date?',
            answers: ["2-22-2012"]
          },
          {
            type: 'date',
            question: 'What is the end date?',
            answers: ["2-23-2013"]
          },
          {
            type: 'binary',
            question: 'Pets allowed',
            choices: ['yes', 'no'],
            answers: ['yes']
          },
          {
            type: 'multiChoice',
            question: 'What are you subletting?',
            choices: ['Shared Room', 'Private Room', 'Couch', 'Floor'],
            answers: ['Shared Room']
          },
          {
            type: 'multiAnswer',
            question: 'Which utilities are included?',
            choices: ['electric', 'gas', 'internet', 'water'],
            answers: ['electric', 'gas']
          },
          {
            type: 'amountPerCycle',
            question: 'What is the rent amount?',
            cycles: ['hours', 'week', 'day', 'month'],
            answers: ['month']
          }
          ],
          version: '0.1',
          state: 'CA'
        }, function(err, contract){
          if (!err){
            // get the old reference passed in
            var template = models.template;
            done(null, {
              template: models.template,
              contract: contract
            });
          } else {
            console.error('Error creating', err);
            done(err);
          }
        });
      });
    }
  });
};
