const next = require('next')
const http = require('http')
const fs = require('fs')

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'

// Init the Next app:
const app = next({ dev })

// Create the secure HTTPS server:
// Don't forget to create the keys for your development
const server = http.createServer();

app.prepare().then(() => {
  console.log("app.prepare");
  server.on('error', (err) => console.error(err))
  server.on('request', (req, res) => {
    app.render(req, res, req.url || '/', req.query)
  })
  server.listen(port)

  console.log(`Listening on HTTPS port ${port}`)
})
