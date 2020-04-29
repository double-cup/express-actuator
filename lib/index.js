const express = require('express');
const uuid = require('uuid');
const os = require('os');

const gitHelper = require('../helpers/git');

const defaultInstanceId = uuid.v4();
const defaultStartTime = new Date().toISOString();

const index = ({
  instanceId = defaultInstanceId,
  startTime = defaultStartTime,
}) => {
// eslint-disable-next-line new-cap
  const router = express.Router();

  router.get('/health', (req, res) => {
    res.json({
      status: 'UP',
    });
  });

  router.get('/info', (req, res) => {
    res.json({
      'app': {
        'version': process.env.npm_package_version || '0.0.0',
        'description': process.env.npm_package_description ||
            'mock_description',
        'name': process.env.npm_package_name || 'mock_name',
        'build-time': gitHelper.getBuildTime(),
      },
      'git': {
        commit: {
          time: gitHelper.getCommitTime(),
          id: gitHelper.getCommitShortHash(),
        },
        id: gitHelper.getCommitHash(),
      },
      'pid': process.pid,
      'instance-id': instanceId,
      'start-time': startTime,
      'last': {
        'http': {
          '2xx': null,
          '3xx': null,
          '4xx': null,
          '5xx': null,
        },
        'log': {
          'info': null,
          'debug': null,
          'warning': null,
          'error': null,
          'fatal': null,
        },
      },
    });
  });

  const osGetSystemloadAverage = () => {
    const loadAvg = os.loadavg();
    const sumLoad = loadAvg.reduce(
        (acc, val) => {
          return (acc + val);
        },
    );
    const loadAvgCount = loadAvg.length;
    return sumLoad / loadAvgCount;
  };

  router.get('/metrics', (req, res) => {
    res.json({
      'mem': os.totalmem(),
      'mem.free': os.freemem(),
      'processors': os.cpus().length,
      'instance.uptime': Math.floor((new Date() - new Date(startTime)) / 1000),
      'uptime': os.uptime(),
      'systemload.average': osGetSystemloadAverage(),
      'heap.used': process.memoryUsage().heapUsed,
      'heap': process.memoryUsage().heapTotal,
    });
  });

  return router;
};

module.exports = index;
