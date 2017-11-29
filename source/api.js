'use strict'

/**
 *
 */

const api = async (ctx, next) => {
  await next()
}

/**
 * Export middleware.
 */

module.exports = api
