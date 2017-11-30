import Chart from 'frappe-charts/dist/frappe-charts.min.esm'
import axios from 'axios'

const currentDate = new Date()
let aWeekAgo = new Date()
aWeekAgo.setDate(currentDate.getDate() - 7)

const mm = aWeekAgo.getMonth() + 1
const dd = aWeekAgo.getDate()
const dayCorrectNotation = [
  aWeekAgo.getFullYear(),
  (mm > 9 ? '' : '0') + mm,
  (dd > 9 ? '' : '0') + dd
].join('-')

axios.get('visitors/get?low=' + dayCorrectNotation)
.then(response => {
  const data = {
    labels: response.data.map(item => {
      return item.date.match(/\d{4}-\d{1,2}-\d{1,2}/)[0]
    }),
    datasets: [
      {
        title: 'The number of visitors this day.',
        values: response.data.map(item => {
          return item.count
        })
      }
    ]
  }

  const chart = new Chart({
    parent: '#chart', // or a DOM element
    title: 'Number Of Visitors',
    data: data,
    type: 'bar', // or 'line', 'scatter', 'pie', 'percentage'
    height: 250,

    colors: ['#7cd6fd'],

    format_tooltip_x: d => (d + '').toUpperCase(),
    format_tooltip_y: d => d + ' pts'
  })

  return chart
})
.catch(error => {
  console.log('==> Error in communication with api.')
  console.log('==> Error: ' + error)
})
