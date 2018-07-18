const ChartjsNode = require('chartjs-node');

const opts = {
    type: 'line',
    data: {
        labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'red',
                'blue',
                'yellow',
                'magenta',
                'black',
                'purple'
            ],
            borderColor: [
                'red',
                'blue',
                'yellow',
                'magenta',
                'black',
                'purple'
            ],
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
        chartArea: {
            backgroundColor: 'white'
        }
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
