/*pointer to the canvas*/
var ctx = document.getElementById("mainChart");

var infos = [];
var curLabel = 0;

// HTTP get request
const httpGET = (callback, url) => {
    let http = new XMLHttpRequest();
    http.onreadystatechange = () => {
        if(http.readyState === 4 && http.status === 200){
            callback(http.responseText);
        }
    }
    http.open("GET", url);
    http.send(null);
};

const addToChart = (chart, data) => {
    chart.data.datasets[0].data.push(data);
    curLabel++;
    chart.data.labels[curLabel] = curLabel * 30 + " sec";
    chart.update();
}

const update = () => {
    httpGET((res) => {
        let y = JSON.parse(res).used;
        addToChart(chart, y);
    }, '/getHeapInfo');
}


// every 30 seconds add this to the list of heap information
update();
setInterval(update, 30000);

var chart = new Chart(ctx, {
    type: 'line',
    responsive: true,
    maintainAspectRatio: false,
    data: {
        labels: [],
        datasets: [
            {
                label: 'Heap usage (mb)',
                data: infos
            }
        ]
    }
});
