let data = [
    {show: "Family Guy", rating: 71},
    {show: "Bob's Burgers", rating: 91},
    {show: "Rick and Morty", rating: 95},
    {show: "Adventure Time", rating: 100},
    {show: "Bojack Horseman", rating: 93},
    {show: "The Simpsons", rating: 85},
    {show: "South Park", rating: 81}
]

var margin = {top: 100, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// set the ranges
var x = d3.scaleBand()
          .range([0, width])
          .padding(0.1);
var y = d3.scaleLinear()
          .range([height, 0]);

var tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('border-radius', '5px')
                .style('border', '1px #333 solid')
                .style('padding', '5 15px')
                .style('background', '#f4f4f4')
                .style('opacity', '0')
          
// append the svg object to the body of the page
// append a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", 
          "translate(" + margin.left + "," + margin.top + ")");

svg.append("text")
        .attr("x", (width / 2))             
        .attr("y", -50 )
        .attr("text-anchor", "middle")  
        .style("font-size", "20px")
        .text("Ratings of Animated Shows");

  // Scale the range of the data in the domains
  x.domain(data.map(function(d) { return d.show; }));
  y.domain([0, d3.max(data, function(d) { return d.rating; })]);

  // append the rectangles for the bar chart
  svg.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.show); })
      .attr("width", x.bandwidth())
      .attr("y", function(d) { return y(d.rating); })
      .attr("height", function(d) { return height - y(d.rating); })
        .on('mouseover', function(d){
          tooltip.transition()
          .style('opacity', 1)

          tooltip.html(d)
          .text(d.rating)
            .style('left', (d3.event.pageX)+ 'px')
            .style('top', (d3.event.pageY+ 'px'))
            d3.select(this).style('opacity', 0.5)
      })
      .on('mouseout', function(d){
          tooltip.transition()
          .text(d.rating)
          .style('opacity', 0)
          d3.select(this).style('opacity', 1)
      })

  // add the x Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .style("font-size", "16px")
      .call(d3.axisBottom(x));

  // add the y Axis
  svg.append("g")
      .style("font-size", "16px")
      .call(d3.axisLeft(y));

