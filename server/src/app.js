const express = require('express');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const planetsRouter = require('./routes/planets/planets.route')
const launchesRouter = require('./routes/launches/launches.route')


const app = express();

app.use(cors({
  origin: 'http://localhost:3000'
}))
// 參數帶入要使用的模式，預設為 combined
// 使用字串帶入，有 common, tiny 等等
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'..','public')));

app.use('/launches',launchesRouter)
app.use('/planets',planetsRouter)
app.get('/*',(req, res)=> {
  res.sendFile(path.join(__dirname,'..','public','index.html'))
})
module.exports = app