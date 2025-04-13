const router = require('express').Router();
const apiRoutes = require('./api');

const keys = require('../config/keys');
const { apiURL } = keys.app;

const api = `/${apiURL}`;

// Health Check endpoint
router.get('/health', (req, res) => {
  const uptime = process.uptime();
  const formattedUptime = {
    days: Math.floor(uptime / 86400),
    hours: Math.floor((uptime % 86400) / 3600),
    minutes: Math.floor((uptime % 3600) / 60),
    seconds: Math.floor(uptime % 60)
  };

  const healthCheck = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: formattedUptime,
    service: 'api-server',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  };

  res.status(200).json(healthCheck);
});
// api routes
router.use(api, apiRoutes);
router.use(api, (req, res) => res.status(404).json('No API route found'));

module.exports = router;
