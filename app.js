let data = [
    {name: "COVID-19", deaths: 58365},
    {name: "9/11", deaths: 2977},
    {name: "War in Iraq", deaths: 4431},
    {name: "War in Afghanistan", deaths: 2445},
    {name: "Vietnam War", deaths: 58220},
    {name: "Korean War", deaths: 36574},
    {name: "WW1", deaths: 53402},
    {name: "WW2", deaths: 291557},
    {name: "Gulf War", deaths: 148}
]

var margin = {top: 100, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// var width = 600
// var height = 800
// var barWidth = 20
// var barOffset = 5
var deathsData = data.map(obj => obj.deaths)
const xValues = data.map(obj => obj.name)

var yScale = d3.scaleLinear()
            .domain([0, d3.max(data, function(d, i){return d.deaths})])
             .range([height, 0]).nice()

var xScale = d3.scaleBand()
             .domain(data.map(function(d){ return d.name}))
             .range([0, width])
             .padding(0.2)
             let chart = d3.select('#chart').append('svg')

     var xAxis = chart.append('g')
                    .classed("xAxis", true)
                    .attr("transform", "translate(0," + height + ")")
                    .style("font-size", "16px")
                    .call(d3.axisBottom(xScale))

        var yAxis = chart.append('g')
                    .classed("yAxis", true)
                    .style("font-size", "16px")
                    .call(d3.axisLeft(yScale))

           chart.attr('width', width)
            .attr('height', height)
            .style('background', '#f4f4f4')
            .selectAll('rect')
              .data(data)
              . enter().append('rect')
                .style('fill', 'blue')
                .attr('width', xScale.bandwidth())
                .attr('height', function(d, i){
                    return height - yScale(d.deaths)
                })
                .attr('x', function(d, i){
                    return xScale(d.name)
                })
                .attr('y', function(d){
                    return yScale(d.deaths)
                })

        
    //     var vScale = d3.scaleLinear()
    //                 .domain([0, d3.max(deathsData)])    
    //                 .range([height, 0])    

    //    var hScale = d3.scaleBand()
    //                 .domain(d3.range(0, deathsData.length))
    //                 .range([0, width])      
                    
    //    var vAxis = d3.svg.axis()
    //                 .scale(vScale)
    //                 .orient('left')
    //                 .ticks(5)
    //                 .tickPadding(5)     
                    
    //    var vGuide


