// This grants us source map support, which is handy as our webpack bundling
// for the server will include source maps.  Therefore we will have nice stack
// traces again for our server.
import 'source-map-support/register'

import express from 'express'
import horizon from '@horizon/server'
import compression from 'compression'
import hpp from 'hpp'
import helmet from 'helmet'
import universalReactAppMiddleware from './middleware/universalReactApp'
import clientConfigBuilder from '../../webpack.client.config.js'

// Create our express based server.
const server = express()

// Don't expose any software information to hackers.
server.disable('x-powered-by')

// Prevent HTTP Parameter pollution.
server.use(hpp())

// Content Security Policy
server.use(helmet.contentSecurityPolicy({
  defaultSrc: ["'self'"],
  scriptSrc: ["'self'"],
  styleSrc: ["'self'"],
  imgSrc: ["'self'"],
  connectSrc: ["'self'", 'ws:'],
  fontSrc: ["'self'"],
  objectSrc: ["'none'"],
  mediaSrc: ["'none'"],
  frameSrc: ["'none'"]
}))
server.use(helmet.xssFilter())
server.use(helmet.frameguard('deny'))
server.use(helmet.ieNoOpen())
server.use(helmet.noSniff())

// Response compression.
server.use(compression())

// Get the client bundle webpack configuration.
const webpackClientConfig = clientConfigBuilder({ mode: process.env.NODE_ENV })

// Configure static serving of our webpack bundled client files.
server.use(
  webpackClientConfig.output.publicPath,
  express.static(webpackClientConfig.output.path))

// Bind our universal react app middleware as the handler for all get requests.
server.get('*', universalReactAppMiddleware)

// Bind the server to our server port
const serverListener = server.listen(process.env.SERVER_PORT)
console.log(`==> 💚  Server is running on port ${process.env.SERVER_PORT}`)

// Bind our server to horizon
// @see http://horizon.io/docs/embed/
const horizonOptions = {
  project_name: process.env.HZ_DB_NAME,
  rdb_host: process.env.HZ_DB_HOST,
  rdb_port: process.env.HZ_DB_PORT,
  auto_create_collection: true,
  auto_create_index: true,
  auth: {
    token_secret: process.env.HZ_TOKEN_SECRET,
    allow_anonymous: true,
    allow_unauthenticated: true
  }
}
const horizonServer = horizon(serverListener, horizonOptions)

// We export the listener as it will be handy for our development hot reloader.
export {
  serverListener,
  horizonServer
}
