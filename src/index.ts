import http from 'http'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config()

// require("dotenv").config();
import Person from './person'
import Logger from './logger'

// Person
const person1 = new Person('John Doe', 30)
person1.greeting()

// Logger
const logger = new Logger()
logger.on('message', data => console.log('Called Listener:', data))
logger.log('Hello World!')
logger.log('Hi!')

// Create server
const server = http.createServer((req, res) => {
  // Manual way to handle routes
  // if (req.url === '/') {
  //   // Read from file
  //   fs.readFile(path.join(__dirname, '..', 'public', 'index.html'), (err, content) => {
  //     if (err) throw err
  //     res.writeHead(200, { 'Content-Type': 'text/html' })
  //     res.end(content)
  //   })
  // } else if (req.url === '/about') {
  //   // Read from file
  //   fs.readFile(path.join(__dirname, '..', 'public', 'about.html'), (err, content) => {
  //     if (err) throw err
  //     res.writeHead(200, { 'Content-Type': 'text/html' })
  //     res.end(content)
  //   })
  // } else if (req.url === '/api/users') {
  //   const users = [
  //     { name: 'Bob Smith', age: 40 },
  //     { name: 'John Doe', age: 30 },
  //   ]
  //   res.writeHead(200, { 'Content-Type': 'application/json' })
  //   res.end(JSON.stringify(users))
  // }

  // Dynamic way to handle routes
  // Build file path
  let filePath = path.join(
    __dirname,
    '..',
    'public',
    req.url === '/' ? 'index.html' : req.url ? req.url : ''
  )

  // Extension of file
  let extname = path.extname(filePath)

  // Initial content type
  let contentType = 'text/html'

  // Check ext and set content type
  switch (extname) {
    case '.js':
      contentType = 'text/javascript'
      break
    case '.css':
      contentType = 'text/css'
      break
    case '.json':
      contentType = 'application/json'
      break
    case '.png':
      contentType = 'image/png'
      break
    case '.jpg':
      contentType = 'image/jpg'
      break
  }

  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code == 'ENOENT') {
        // Page not found
        fs.readFile(path.join(__dirname, '..', 'public', '404.html'), (err, content) => {
          res.writeHead(200, { 'Content-Type': 'text/html' })
          res.end(content, 'utf8')
        })
      } else {
        // Some server error
        res.writeHead(500)
        res.end(`Server Error: ${err.code}`)
      }
    } else {
      // Success
      res.writeHead(200, { 'Content-Type': contentType })
      res.end(content, 'utf8')
    }
  })
})

const PORT = process.env.PORT || 5000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
