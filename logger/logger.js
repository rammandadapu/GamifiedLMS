var winston = require('winston');
var fs = require( 'fs' );
winston.emitErrs = true;

/**
 * Distributed Asyc logger to write to a File and Console at multiple levels
 */

var logDir = './logs';
if ( !fs.existsSync( logDir ) )
    fs.mkdir(logDir); 

var logger = new winston.Logger({
  transports: [
    new winston.transports.File({
      level: 'debug',
      filename: logDir + '/GLMS-logs.log',
      handleExceptions: true,
      json: true,
      maxsize: 1024 * 1024 * 10, //10 MB
      maxFiles: 10,
      colorize: true,
      timestamp: function() {
        return new Date().toUTCString();
      }
    }),
    new winston.transports.Console({
      level: 'debug',
      handleExceptions: true,
      json: false,
      prettyPrint: true,
      timestamp: function() {
        return new Date().toUTCString();
      },
      colorize: true
    })
  ],
  exitOnError: false
});

module.exports = logger;
