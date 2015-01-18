var db = require('./../../dbs/db.js');
var User = require('./../../models/user.js');
var async = require('async');
var moment = require('moment');

// have a consistent number when necessary
var phone = '+18001231234';

var measurement = (function() {
  var instance;

  function init() {
    // private methods and vars
    var time = moment();
    var phone = '+18001231234';
    var measurement = 100;
    var measurements = [];
    var text = 'My measurement: ';
    function generateText() {
      text = 'My measurement: ' + measurement;
    };
    function generateMeasurement() {
      // make every 3rd measurement constantly higher
      if (!(measurements.length % 3)){
        measurement = Math.floor(Math.random() * (300 - 130 + 1)) + 130;
      } else {
        // generate more reasonable values
        measurement = Math.floor(Math.random() * (160 - 60 + 1)) + 60;
      }
      // add to array of measurements
      measurements.push(measurement);
    };
    function incrementDate() {
      // go to the last day so our data will always simulate current conditions
      // -8 means we can spread out between lunch and dinner
      time = time.hour(time.hour()-8);
    };
    return {

      // public methods and vars
      addToDatabase: function (cb){
        // increment Date
        incrementDate();
        // random a glucose value
        generateMeasurement();
        // make the text
        generateText();
        // add to database
        User.addMeasurement({
          measurement: measurement,
          phone: phone,
          text: text,
          time: time.valueOf()
        }, cb);

      },
      publicVar: 'public var'

    };
  };
  return {
    getInstance: function() {
      if (!instance){
        instance = init();
      }
      return instance;
    }
  };
})();

module.exports.deleteDB = function(cb){
  User.remove({}, function(err, user){
    cb(err, user);
  });
};
module.exports.seedUser = function(cb){
  User.create({
    phone: phone
  }, function(err, user){
    cb(err, user);
  });
};
module.exports.seedMeasurements = function(cb){
  var measure = measurement.getInstance();
  async.series([
    function(cb){
      User.create({
        phone: '+18001231234'
      }, function(err, user){
        cb(null);
      });
    },
    function(cb) {
      var amount = 50; // amount of measurements to take
      // generate multi random users first
      async.times(amount, function(n, next){
        console.log('times: ', n);
        measure.addToDatabase(function(err, user){
          next(null, user.toJSON());
        });
      }, function(err, results) {
        // we should have the number of users set in amount
        cb(null);
      });
    }
  ], function(err){
    if (!err){
      cb(null);
    }
  });
};
module.exports.seedDB = function(cb){
  User.remove({}, function(err, user){
    if (err){
      console.error("Ran into error", err);
    } else {
      console.log('datbase deleted');
      User.create({
        questions: [
          {
          type: 'text',
          question: 'Name of Tenant'
        },
        {
          type: 'date',
          question: 'What is the start date?'
        },
        {
          type: 'date',
          question: 'What is the end date?'
        },
        {
          type: 'binary',
          question: 'Pets allowed',
          choices: ['yes', 'no']
        },
        {
          type: 'multiChoice',
          question: 'What are you subletting?',
          choices: ['Shared Room', 'Private Room', 'Couch', 'Floor']
        },
        {
          type: 'multiAnswer',
          question: 'Which utilities are included?',
          choices: ['electric', 'gas', 'internet', 'water']
        },
        {
          type: 'amountPerCycle',
          question: 'What is the rent amount?',
          cycles: ['hours', 'week', 'day', 'month']
        }
        ],
        version: '0.1',
        state: 'CA'
      }, function(err, user){
        if (!err){
          console.log('user created');
        } else {
          console.error('Error creating', err);
        }
      });
    }
  });

};
