const { parse } = require('csv-parse')
const fs = require('fs');
const path = require('path')
const { builtinModules } = require('module');

const habitablePlanet = [];
/*
const promise = New Promise((resolve, reject) => {
  // 42 代表成功，並且會回傳給 then 的 result
  resolve(42);
});
promise.then( (result) => {
});

const result = await promise;
console.log(result);

*/

const isHabitablePlanet = (planet) => {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11
    && planet['koi_prad'] < 1.6;
}

function loadPlanetsData() {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname,'..', '..', 'data','kepler_data.csv'))
      .pipe(parse({
        comment: '#',
        columns: true
      }))
      .on('data', (data) => {
        if (isHabitablePlanet(data)) {
          habitablePlanet.push(data)
        }
      })
      .on('error', (err) => {
        console.log(err)
      })
      .on('end', () => {
        habitablePlanet.map((planet) => {
          return planet['kepler_name']
        })
        resolve()
      })
  });
}

function getAllPlanets (){
  return habitablePlanet
}
module.exports = {
  loadPlanetsData,
  getAllPlanets,
}