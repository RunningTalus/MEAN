var mongoose = require('mongoose');

var gracefulShutdown;

// DEFINE DATABASE CONNECTION STRING AND USE IT TO OPEN A CNXN TO MONGOOSE.

  // var dbURI = 'mongodb://username:password@localhost:27027/Loc8r';
var dbURI = 'mongodb://localhost/Loc8r';
mongoose.connect(dbURI);


//LISTEN FOR MONGOOSE CONNECTION EVENTS AND OUTPUT STATUSES TO CONSOLE.
mongoose.connection.on('connected', function () {
  console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error',function (err) {
  console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose disconnected');
});

//REUSABLE FUNCTION TO CLOSE MONGOOSE CNXN.
// CAPTURE TERMINATION AND RESTART EVENTS
gracefulShutdown = function (msg, callback) {
  mongoose.connection.close(function () {
    console.log('Mongoose disconnected through ' + msg);
    callback();
  });
};

// LISTEN TO NODE PROCESSES FOR TERMINATION OR RESTART SIGNALS, AND CALL THE gracefulShutdown FUNCTION WHEN APPROPRIATE, PASSING A CONTINUATION CALLBACK.


//FOR NODEMON RESTARTS
//Listen for SIGUSR2, which is what nodemon uses
//  Send message to gracefulShutdown and callback to kill process, emitting SIGUSR2 again
//    Listen for SIGINT emitted on application termination

process.once('SIGUSR2', function () {
  gracefulShutdown('nodemon restart', function () {
    process.kill(process.pid, 'SIGUSR2');
  });
});


//FOR APP TERMINATION
//Listen for SIGINT emitted on application termination
//  Send message to gracefulShutdown and callback to exit Node process
//    Send message to gracefulShutdown and callback to exit Node process

process.on('SIGINT', function () {
  gracefulShutdown('app termination', function () {
    process.exit(0);
  });
});


//FOR HEROKU APP TERMINATION
//Listen for SIGTERM emitted when Heroku shuts down process
//  Send message to gracefulShutdown and callback to exit Node process
//    Send message to gracefulShutdown and callback to exit Node process

process.on('SIGTERM', function() {
  gracefulShutdown('Heroku app shutdown', function () {
    process.exit(0);
  });
});