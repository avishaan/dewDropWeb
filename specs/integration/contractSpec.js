var agent = require('superagent');
var config = require("../../config.js");
var ContractSeed = require("../../seeds/seedContractSpec.js");

var URL = config.apiURI + ':' + config.expressPort + "/api";

describe("The setup", function(){
  it("should seed the database with a contract", function(done){
    ContractSeed
    .seed(function(err, models){
      expect(err).toEqual(null);
      expect(models).toBeDefined();
      done();
    });
  });
});

describe("The contract route", function() {
  it("should allow us to save a filled out template as a contract", function(done){
    agent
    .post(URL + '/v1/contracts')
    .send({
      questions: [
        {
        type: 'text',
        question: 'Name of Tenant',
        answers: ['John']
      },
      {
        type: 'date',
        question: 'What is the start date?',
        answers: ['2014-10-21']
      }
      ],
      version: '0.1'
    })
    .end(function(res){
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body.questions)).toEqual(true);
      expect(res.body._id).toBeDefined();
      done();
    });
  });
  it("should allow us to get all the contracts in the system", function(done){
    agent
    .get(URL + '/v1/contracts')
    .end(function(res){
      var body = res.body;
      expect(Array.isArray(body)).toEqual(true);
      expect(Array.isArray(body[0].questions)).toEqual(true);
      expect(body[0].version).toBeDefined();
      expect(body[0]._id).toBeDefined();
      done();
    });
  });
});
