var db = require('../dbs/db.js');
var ContractSeed = require('./seedContractSpec.js');
var Submission = require('../models/submission.js');

module.exports.seed = function (done){
  Submission.remove({}, function(err, submission){
    if (err){
      console.error("Ran into error", err);
    } else {
      console.log('Submissions deleted');
      // seed the templates first
      ContractSeed.seed(function(err, models){
        Submission.create({
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
          state: 'CA',
          contract: models.contract._id
        }, function(err, submission){
          if (!err){
            // get the old reference passed in
            done(null, {
              template: models.template,
              contract: models.contract,
              submission: submission
            });
          } else {
            done(err);
            console.error('Error creating', err);
          }
        });
      });
    }
  });
};
