var Contract = require('../models/contract.js');

module.exports.createOneContract = function createOneContract (req, res, next) {
  var body = req.body;

  Contract
  .create({
    questions: body.questions,
    version: body.version
  }, function(err, contract){
    if (!err){
      res.status(200).send(contract);
    } else {
      res.status(500).send({err: err, clientMsg: 'Client Error'});
    }
  });
};

module.exports.readAllContracts = function readAllContracts(req, res, next){
  Contract
  .find({})
  .lean()
  .exec(function(err, contracts){
    if (err){
      next(err);
    } else {
      res.status(200).send(contracts);
    }
  });
};

