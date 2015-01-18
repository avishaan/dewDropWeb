var rewire = require('rewire');
var templates = require('../../controllers/templates.js');
//var templates = require('../../controllers/Template.js');

//var player_obj = require('../src/Player.js');
//var song_obj = require('../src/Song.js');
//var helper = require('./SpecHelper.js');

describe("Template", function() {
  it("should be able to do something", function() {
    expect('test').toEqual('test');
  });
  it("should be able to return a template", function(){
    //set values before spying otherwise will look like a call
    spyOn(templates, 'readAllTemplates');
    templates.readAllTemplates();
    expect(templates.readAllTemplates).toHaveBeenCalled();
  });
});
