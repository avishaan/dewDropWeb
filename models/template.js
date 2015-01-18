var mongoose = require('mongoose');
/*
|-------------------------------------------------------------
| Template Schema
|-------------------------------------------------------------
*/

var templateSchema = new mongoose.Schema({
  questions: [{
    type: {type: 'string'},
    question: 'string',
    choices: ['string'],
    cycles: ['string']
  }],
  version: String,
  state: String
});

/**
 * Send user(s) notifications about an event
 * @param {object} options The options for the notifications
 * @config {array} array of userid(s) Array of string userids
 * @config {object} payload of message, passed directly to agent
 * @param {function} cb
 * @config {object} err Passed Error
 */

var Template = mongoose.model('Template', templateSchema);

module.exports = Template;

