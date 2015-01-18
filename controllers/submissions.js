var Submission = require('../models/submission.js');

/**
 * Create a submission based on an existing contract
 */
module.exports.createOneSubmission = function createOneSubmission (req, res, next) {
  var body = req.body;
  Submission
  .create({
    questions: body.questions,
    version: body.version,
    contract: body.contract
  }, function(err, submission){
    if (!err){
      res.status(200).send(submission);
    } else {
      next(err);
    }
  });
};

/**
 * Read submission based on a specific contract
 */
module.exports.readAllSubmissions = function readAllSubmissions (req, res, next) {
  debugger;
  var cid = req.swagger.params.cid.value;
  Submission
  .find({contract: cid})
  .select('_id')
  .lean()
  .exec(function(err, submissions){
    if (!err){
      res.status(200).send(submissions);
    } else {
      next(err);
    }
  });
};
