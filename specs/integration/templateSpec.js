var agent = require('superagent');
var config = require("../../config.js");
var TemplateSeed = require("../../seeds/seedTemplateSpec.js");

var URL = config.apiURI + ':' + config.expressPort + "/api";

describe("The setup", function(){
  it("should seed the database with a template", function(done){
    TemplateSeed
    .seed(function(err, models){
      expect(err).toEqual(null);
      expect(models).toBeDefined();
      done();
    });
  });
});

describe("The template route", function() {
  it("should allow us to get all the templates for CA", function(done) {
    agent
    .get(URL + '/v1/templates')
    //.get('http://localhost:3000/api/v1/templates')
    .query({state: 'CA'})
    .end(function(res){
      expect(res.status).toEqual(200);
      expect(Array.isArray(res.body.questions)).toEqual(true);
      expect(res.body.state).toEqual('CA');
      expect(res.body.version).toBeDefined();
      done();
    });
  });
});
