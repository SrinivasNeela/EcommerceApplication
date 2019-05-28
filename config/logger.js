const log4js = require('log4js');

log4js.configure({
    appenders: {
	  consoleAppender: { type: 'console' },
      fileAppender: { type: 'file', filename: './logs/debug.log',maxLogSize: 20480,
      backups: 10 }
    },
    categories: 
    {
	  default: { appenders: ['consoleAppender'], level: 'info' },
      debug: { appenders: ['fileAppender'], level: 'debug' },
	}
  });
   var logger = log4js.getLogger();
   logger.info("In debug");
module.exports =logger