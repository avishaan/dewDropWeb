var Template = require('../models/template.js');

module.exports.readAllTemplates = function readAllTemplates (req, res, next) {
  var state = req.swagger.params.state.value;

  // This is only here due to the bug mentioned above and is not a bug/limitation of swagger-tools
  // https://github.com/apigee-127/swagger-tools/blob/master/docs/QuickStart.md#upstream-bug
  if (['CA', 'NY'].indexOf(state) === -1) {
    res.statusCode = 400;
    res.end('unit must be either CA or NY');
  }
  Template
  .findOne({state: state})
  .exec(function(err, template){
    // Return template to the front end
    // template.find({})
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(template));
  });

};

