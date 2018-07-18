const ChartjsNode = require('chartjs-node');

const opts = {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [1, 3, 5, 8, 13],
            borderColor: 'blue',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero:true
                }
            }]
        },
            backgroundColor: 'white'
    }
}

var chartNode = new ChartjsNode(600, 600);
return chartNode.drawChart(opts).then(() => {
    // chart is created
 
    // get image as png buffer
    return chartNode.getImageBuffer('image/jpg');
}).then(buffer => {
    Array.isArray(buffer) // => true
    // as a stream
    return chartNode.getImageStream('image/jpg');
}).then(streamResult => {
    // using the length property you can do things like
    // directly upload the image to s3 by using the
    // stream and length properties
    streamResult.stream // => Stream object
    streamResult.length // => Integer length of stream
    // write to a file
    return chartNode.writeImageToFile('image/jpg', './testimage.jpg');
}).then(() => {
    // chart is now written to the file path
    // ./testimage.png
});
