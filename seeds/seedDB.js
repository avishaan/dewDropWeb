var seed = require('./../specs/fixtures/fixture.js');
// Script to randomly seed database

seed.deleteDB(function(err){
  seed.seedMeasurements(function(err, user){
    if (!err){
      console.log('Seed success');
    } else {
      console.log('Error: ', err);
    }
  });
});
