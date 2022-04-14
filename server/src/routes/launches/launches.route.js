// launches.route.js
const express = require('express');
const { httpGetAllLaunches, httpAddLaunches, httpAbortLaunch } = require('./launches.controller')

const launchesRouter = express.Router()

launchesRouter.get('/', httpGetAllLaunches);
launchesRouter.post('/',httpAddLaunches)
launchesRouter.delete('/:id', httpAbortLaunch)

module.exports = launchesRouter