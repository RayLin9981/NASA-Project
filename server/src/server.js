const http = require('http');

const { loadPlanetsData } = require('./models/planets.model')

const app = require('./app')
const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

app.get('/',(req, res) => {
  res.send('hello');
  res.end();
})

async function startServer(){
  await loadPlanetsData();

  server.listen(PORT,()=>{
    console.log(`listening... http://localhost:${PORT}`);
  })
}

startServer();

