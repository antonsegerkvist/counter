'use strict'

/**
 * Import dependecies.
 */

const Koa = require('koa')
const config = require('./config')

/**
 * Create the app server.
 */

const app = new Koa()

/**
 * Define middleware.
 */

const middleware = {

  /**
   * Middleware failsafe.
   */

  async failsafe (ctx, next) {
    try {
      await next()
    } catch (error) {
      console.log('==> Error in failsafe middleware.')
      console.log('==> Error: ' + error)
    }
  },

  /**
   * Inform the server of the visitation.
   */

  async incrementor (ctx, next) {
  },

  /**
   * Serve the static website.
   */

  async static (ctx, next) {
  }

}

/**
 * Use the middleware in the application server.
 */

app.use(middleware.failsafe)
app.use(middleware.incrementor)
app.use(middleware.static)

/**
 * Start listening for traffic.
 */

const server = app.listen(config.server.port, () => {
  console.log(`==> Counter now listening to port ${config.server.port}`)
})

/**
 * Export server.
 */

module.exports = server
