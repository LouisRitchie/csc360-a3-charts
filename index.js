const ChartjsNode = require('chartjs-node');

const opts = {
  type: 'line',
  backgroundColor: 'white',
  data: {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
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
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero:true
        }
      }]
    }
  }
}

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
