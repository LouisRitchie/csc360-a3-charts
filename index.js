const ChartjsNode = require('chartjs-node');
const { exec } = require('child_process')

// execute some bash as a child process.
const executeChild = command => exec(command, (err, stdout, stderr) => {})

const run_rrsim = () => [50, 100, 250, 500].map(qSize => [0, 5, 10, 15, 20, 25].map(dSize => executeChild(`
  ../a3/simgen 2000 857455 | ../a3/rrsim --quantum ${qSize} --dispatch ${dSize} > ${qSize}-${dSize}.txt
`)))

function generate_charts() {
  var chartNode = new ChartjsNode(600, 600);
  return chartNode.drawChart(opts).then(() => {
    // chart is created
   
    // get image as png buffer
    return chartNode.getImageBuffer('image/png');
  }).then(buffer => {
    Array.isArray(buffer) // => true
    // as a stream
    return chartNode.getImageStream('image/png');
  }).then(streamResult => {
    // using the length property you can do things like
    // directly upload the image to s3 by using the
    // stream and length properties
    streamResult.stream // => Stream object
    streamResult.length // => Integer length of stream
    // write to a file
    return chartNode.writeImageToFile('image/png', './testimage.png');
  }).then(() => {
    // chart is now written to the file path
    // ./testimage.png
  });
}

const opts = {
  type: 'line',
  data: {
    labels: [0, 5, 10, 20, 25],
    datasets: [
      {
        label: '# of Votes',
        data: [1, 3, 5, 8, 13],
        borderColor: 'blue',
        borderWidth: 1,
        fill: false
      },
      {
        label: '# of Votes',
        data: [2, 4, 6, 8, 11],
        borderColor: 'red',
        borderWidth: 1,
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: true,
      text: 'fuck you!'
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Dispatch overhead'
        },
        ticks: {
          beginAtZero:true
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Dispatch overhead'
        },
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
}

run_rrsim()