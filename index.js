const http = require('http')
const qs = require('querystring')
const calculator = require('./calculator')
let json = require('./demo.json');

const server = http.createServer(function(request, response) {
    if (request.method == 'POST') {
      request.on('data', function(data) {
      })
  
      request.on('end', async function() {
        // const post = qs.parse(body)
        const result = await calculator.find(null);
        response.writeHead(200, {'Content-Type': 'application/json'})
        const jsonContent = JSON.stringify(result);
        response.end(jsonContent)
        
      })
    }
  })
  
  const port = 3000
  const host = '127.0.0.1'
  server.listen(port, host)
  console.log(`Listening at http://${host}:${port}`)