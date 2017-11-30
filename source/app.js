'use strict'

/**
 * Import dependecies.
 */

const path = require('path')
const Koa = require('koa')
const mysql = require('mysql2/promise')
const serve = require('koa-static-server')
const config = require('./config')
const api = require('./api')

/**
 * Create databse connection pool.
 */

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'example',
  password: 'example',
  database: 'db_counter'
})

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
   * Database connection creator.
   */

  async database (ctx, next) {
    try {
      ctx.mysql = undefined
      ctx.mysql = await pool.getConnection()
      await next()
      await ctx.mysql.release()
      ctx.mysql = undefined
    } catch (error) {
      console.log('==> Error in database connection middleware.')
      console.log('==> Error: ' + error)
    } finally {
      if (ctx.mysql !== undefined) {
        ctx.mysql.release()
        ctx.mysql = undefined
      }
    }
  },

  /**
   * Endpoint for fetching visitation data.
   */

  api,

  /**
   * Inform the server of the visitation.
   */

  async incrementor (ctx, next) {
    try {
      await ctx.mysql.query('INSERT INTO `t_counter` () VALUES ()')
      await next()
    } catch (error) {
      console.log('==> Error in incrementor middleware.')
      console.log('==> Error: ' + error)
    }
  },

  /**
   * Serve the static website.
   */

  static: async (ctx, next) => {
    try {
      await serve({
        rootDir: path.resolve(__dirname, 'public'),
        rootPath: '/'
      })(ctx, next)
    } catch (error) {
      console.log('==> Error in static middleware.')
      console.log('==> Error' + error)
    }
  }

}

/**
 * Create the app server.
 */

const app = new Koa()

/**
 * Use the middleware in the application server.
 */

app.use(middleware.failsafe)
app.use(middleware.database)
app.use(middleware.api)
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
