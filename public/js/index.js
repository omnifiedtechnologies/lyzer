/*pointer to the canvas*/
var memCtx = document.getElementById("memChart");
var cpuCtx = document.getElementById("cpuChart");

var memUsed = [];
var curMemLabel = 0;

var cpuUsed = [];
var curCpuLabel = 0;

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

const addToChart = (chart, data, curLabel) => {
    chart.data.datasets[0].data.push(data);
    chart.data.labels[curLabel] = curLabel + " min";
    chart.update();
}

const update = () => {
    // cpu
    httpGET((res) => {
        let y = JSON.parse(res).used;
        addToChart(memChart, y, curCpuLabel);
        curCpuLabel++;
    }, '/getHeapInfo');

    // memory
    httpGET((res) => {
        let y = JSON.parse(res).cpu.toFixed(2) * 100;
        addToChart(cpuChart, y, curMemLabel);
        curMemLabel++;
    }, '/getCpuInfo')
}


// every minute add this to the list of heap information
update();
setInterval(update, 60000);

var memChart = new Chart(memCtx, {
    type: 'line',
    responsive: true,
    maintainAspectRatio: false,
    data: {
        labels: [],
        datasets: [
            {
                label: 'Heap usage (mb)',
                data: memUsed
            }
        ]
    }
});

var cpuChart = new Chart(cpuCtx, {
    type: 'line',
    responsive: true,
    maintainAspectRatio: false,
    data: {
        labels: [],
        datasets: [
            {
                label: 'CPU usage (%)',
                data: cpuUsed
            }
        ]
    }
});
