// launches.controller.js
const { getAllLaunches, addNewLaunch, existsLaunchWithId, abortLaunchById } = require('../../models/launches.model')

function httpGetAllLaunches(req, res) {
  return res.status(200).json(getAllLaunches());
}

function httpAddLaunches(req, res) {
  const launch = req.body;
  if ( !launch.mission || !launch.rocket || !launch.target
    || !launch.launchDate) {
    return res.status(400).json({
      error: "some col not included!!"
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({
      error: 'Date format error',
    });
  }
  addNewLaunch(launch)
  return res.status(201).json(launch);
}

function httpAbortLaunch(req, res){
  // http 回傳的時候會設定為 string
  // 可使用 + 或是 Number 來轉值
  const launchId = +req.params.id;

  if (!existsLaunchWithId(launchId)){
    return res.status(404).json({
      error: 'Launch id not found'
    })
  }
  const aborted = abortLaunchById(launchId);
  return res.status(200).json(aborted);
}

module.exports = {
  httpGetAllLaunches,
  httpAddLaunches,
  httpAbortLaunch
}

