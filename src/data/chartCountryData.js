const chartCountryData = [
    {
        time: '2020-05-04',
        infected: 1200,
        death: 8
    },
    {
        time: '2020-05-05',
        infected: 1438,
        death: 13
    },
    {
        time: '2020-05-06',
        infected: 1611,
        death: 19
    },

];

const options = {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        gridLines: {
          display: true
        }
      }],
      xAxes: [ {
        gridLines: {
          display: false
        }
      }]
    },
    legend: {
      display: false
    },
    responsive: true,
    maintainAspectRatio: false
  }


  export { chartCountryData, options }
