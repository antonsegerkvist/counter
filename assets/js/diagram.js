import Chart from 'frappe-charts/dist/frappe-charts.min.esm'

const data = {
  labels: [
    '12am-3am',
    '3am-6pm',
    '6am-9am',
    '9am-12am',
    '12pm-3pm',
    '3pm-6pm',
    '6pm-9pm',
    '9am-12am'
  ],
  datasets: [
    {
      title: 'The number of visitors this day.',
      values: [25, 40, 30, 35, 8, 52, 17, 20]
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

module.export = chart
