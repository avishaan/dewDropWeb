var querystring = require('querystring');
var logger = require('./../loggers/logger.js');
var config = require('../config.js');

module.exports.readHandle = function readHandle (req, res, next) {
  // get the handle id from the route
  var hid = req.swagger.params.hid.value;
  logger.info('Lookup user twitter handle ' + hid);
  // make sure to unescape any characters
  hid = querystring.unescape(hid);
  // make the call to Mark's api here and return data to FE
  res.status(200).send({
    id: '123',
    _id: '123',
    trust: '101',
    troll: '102',
    test: 'test ok'
  });
};
