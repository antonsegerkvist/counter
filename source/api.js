'use strict'

/**
 * Define API middleware.
 */

const api = async (ctx, next) => {
  try {
    // Define current date.
    let currentDate = new Date()
    const mm = currentDate.getMonth() + 1
    const dd = currentDate.getDate()
    currentDate = [
      currentDate.getFullYear(),
      (mm > 9 ? '' : '0') + mm,
      (dd > 9 ? '' : '0') + dd
    ].join('-')

    // Define variables.
    let result
    const pathRegex = /^\/visitors\/get$/
    const dateRegex = /^\d{4}-\d{2}-\d{2}/
    const lowerDate = ctx.request.query.low
    const higherDate = ctx.request.query.high || currentDate
    const method = ctx.request.method
    const path = ctx.request.path

    // Check API path.
    if (method === 'GET' && pathRegex.test(path)) {
      const dateLow = new Date(lowerDate)
      const dateHigh = new Date(higherDate)
      if (lowerDate && dateRegex.test(lowerDate) && higherDate && dateRegex.test(higherDate) && dateHigh > dateLow) {
        [ result ] = await ctx.mysql.query(
          'SELECT DATE(`visitation_date`) AS date, COUNT(`visitation_date`) AS count ' +
          'FROM `t_counter` ' +
          'GROUP BY DATE(`visitation_date`)'
        )
        ctx.status = 200 // Ok.
        ctx.body = result
      } else {
        ctx.status = 400 // Bad Request.
      }
    } else {
      await next()
    }
  } catch (error) {
    console.log('==> Error in api handle.')
    console.log('==> Error: ' + error)
  }
}

/**
 * Export middleware.
 */

module.exports = api
