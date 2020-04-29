'use strict';

const app = require('./app');
const config = require('./config/application');

const server = app.listen(config.application_port, () => {
  console.log(`Example app listening on port ${config.application_port}!`);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT. Press Control-D to exit.');
});

// Using a single function to handle multiple signals
const handle = (signal) => {
  console.log(`Received ${signal}`);
  console.log('Closing http server.');
  server.close(() => {
    console.log('Http server closed.');
    process.exit(0);
  });
};

process.on('SIGINT', handle);
process.on('SIGTERM', handle);
