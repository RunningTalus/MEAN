var mongoose = require('mongoose');
// var dbURI = 'mongodb://username:password@localhost:27027/Loc8r';
var dbURI = 'mongodb://localhost/Loc8r';

mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
}); 
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

mongoose.connect(dbURI);