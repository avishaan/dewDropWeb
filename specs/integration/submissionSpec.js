var agent = require('superagent');
var config = require("../../config.js");
var SubmissionSeed = require("../../seeds/seedSubmissionSpec.js");
var inspector = require('schema-inspector');

var URL = config.apiURI + ':' + config.expressPort + "/api";

var seedModels; // we will use this to store our seed models

describe("The setup", function(){
  it("should seed the database with a submission", function(done){
    SubmissionSeed
    .seed(function(err, models){
      expect(err).toEqual(null);
      expect(models).toBeDefined();
      seedModels = models;
      done();
    });
  });
});

describe("The contract route", function() {
  it("should allow us to save a filled out template as a contract", function(done){
    agent
    .post(URL + '/v1/submissions')
    .send({
      questions: [
        {
        type: 'text',
        question: 'Name of Tenant',
        answers: ['David']
      },
      {
        type: 'date',
        question: 'What is the start date?',
        answers: ['2014-10-21']
      }
      ],
      version: '0.1',
      contract: seedModels.contract._id
    })
    .end(function(res){
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body.questions)).toEqual(true);
      expect(res.body._id).toBeDefined();
      done();
    });
  });
  it("should allow us to get the submissions for an existing contract", function(done){
    agent
    .get(URL + '/v1/contracts/' + seedModels.contract._id + '/submissions')
    .end(function(res){
      // TODO, take this from the swagger.json schema
      var schema = {
        type: 'object',
        strict: true,
        properties: {
          _id: {
            type: 'string'
          }
        }
      };
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body)).toEqual(true);
      expect(inspector.validate(schema, res.body[0]).valid).toEqual(true);
      done();
    });
  });
});
