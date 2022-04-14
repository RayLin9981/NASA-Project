// launches.model.js
const launches = new Map();

let latestFlightNumber = 100;

const launch = {
  flightNumber: 100,
  mission: 'test mission name',
  rocket: 'Expolorer IS1',
  launchDate: new Date('December 27, 2030'),
  target: 'Kepler-442 b',
  customer: ['ZTM', 'NASA'],
  upcoming: true,
  success: true,
}

launches.set(launch.flightNumber, launch);

// 透過 ID 檢查是否存在
function existsLaunchWithId(launchId) {
  // 使用 Map.has
  return launches.has(launchId)
}

function getAllLaunches() {
  // console.log(Array.from(launches.values()))
  return (Array.from(launches.values()));
}

function addNewLaunch(launch) {
  latestFlightNumber++;
  // Map.set 第一個是索引
  launches.set(
    latestFlightNumber,
    Object.assign(launch, {
      customer: ['ZTM', 'NASA'],
      upcoming: true,
      success: true,
      flightNumber: latestFlightNumber,
    })
  );
}

function abortLaunchById(launchId) {
  // 就算刪除了，也通常不會刪除
  // 通常是給一個 flag 定義成刪除
  const aborted = launches.get(launchId)
  // 之前有設定了兩個屬性，在這邊用上
  // 兩個都 false 就不會顯示介面上了
  aborted.upcoming = false;
  aborted.success = false;
  // 回傳物件讓物件可以回傳給 user
  return aborted;
}


module.exports = {
  existsLaunchWithId,
  getAllLaunches,
  addNewLaunch,
  abortLaunchById,
};