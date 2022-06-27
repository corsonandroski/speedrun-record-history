//  https://github.com/speedruncomorg/api/tree/master/version1
//  API documentation
var url = "https://www.speedrun.com/api/v1/leaderboards/smw/category/96_Exit";

var xhr = new XMLHttpRequest();
xhr.open("GET", url);

//  https://github.com/speedruncomorg/api
//  please set a descriptive User-Agent HTTP header. This makes it easier for us to see how the API is being used and optimise it further. A good user agent string includes your project name and possibly the version number, like my-bot/4.20
xhr.setRequestHeader("User-Agent", "speedrun-record-history/0.0");

xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
        console.log(xhr.status);
        // console.log(xhr.responseText);
        main(xhr.responseText)
    }};

xhr.send();

function main (data){
    // console.log(JSON.parse(data))
    const map1 = JSON.parse(data).data.runs.map(r => {
        return ({
            date: d3.timeParse("%Y-%m-%d")(r.run.date),
            time: r.run.times.primary_t
        })
    }).filter(o => o.date != null) //remove null dates
    map1.sort((a, b) => a.date > b.date ? 1 : -1)
    console.log(map1)

    //d3 chart
    var margin = {top: 10, right: 30, bottom: 30, left: 60},
    width = 1600 - margin.left - margin.right,
    height = 1200 - margin.top - margin.bottom
    var svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")")
    
    const x = d3.scaleTime()
        .domain(d3.extent(map1, function(d) { return d.date; }))
        .range([ 0, width ]);
    svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x));

    // Add Y axis
    const y = d3.scaleLinear()
        .domain([0, d3.max(map1, d => +d.time)])
        .range([ height, 0 ]);
    svg.append("g")
        .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
        .datum(map1)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
        .x(d => x(d.date))
        .y(d => y(d.time))
    )
}