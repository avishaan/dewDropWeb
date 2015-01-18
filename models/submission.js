var mongoose = require('mongoose');
/*
|-------------------------------------------------------------
| Submission Schema
|-------------------------------------------------------------
*/

var submissionSchema = new mongoose.Schema({
  questions: [{
    type: {type: 'string'},
    question: 'string',
    choices: ['string'],
    cycles: 'string',
    answers: ['string']
  }],
  version: String,
  contract: {type: mongoose.Schema.Types.ObjectId, ref: "Contract"}
});

/**
 * Send user(s) notifications about an event
 * @param {object} options The options for the notifications
 * @config {array} array of userid(s) Array of string userids
 * @config {object} payload of message, passed directly to agent
 * @param {function} cb
 * @config {object} err Passed Error
 */

var Submission = mongoose.model('Submission', submissionSchema);

module.exports = Submission;

