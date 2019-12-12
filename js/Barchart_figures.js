/*jshint esversion: 6 */
async function drawBarChart() {
  //1_Access data
  const dataset = await d3.json("./worldoncover/th2_figures.json")
  const xAccessor = d => d.proportion
  const nameAccessor = d => d.subCategory

  //2_Create dimensioins
  const width = 700
  let dimensions = {
    width: width,
    height: width * 0.47,
    margin:{
      top: 150,
      bottom: 0,
      left: 200,
      right: 0,
    }
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  //3_Draw canvas
  const wrapper8 = d3.select("#wrapper8")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
  const bounds = wrapper8.append("g")
      .style("transform", `translate(${
            dimensions.margin.left
          }px, ${
            dimensions.margin.top
          }px)`)
  //4_Create scale
  const xScale = d3.scaleLinear()
      .domain([0, 1])
      .range([0, dimensions.boundedWidth * 2])
  //5_Draw data


  bounds.append("g")
      .attr("class", "bars")
  let barGroups = bounds.select(".bars")
      .selectAll(".bar2")
      .data(dataset)
  barGroups.exit()
      .remove()
  const newBarGroups = barGroups.enter().append("g")
      .attr("class", "bar2")

  barGroups =newBarGroups.merge(barGroups)

  const barRects = barGroups.append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * dimensions.boundedHeight/7)
      .attr("width", d => xScale(xAccessor(d)))
      .attr("height", dimensions.boundedHeight/7 - 7)
      .attr("fill", "#95d1f5")


  //Add bar Labels
  const formatPercent = d3.format(".1%")
  const barLabels = barGroups.append("text")
      .attr("x", d => xScale(xAccessor(d)) + 3)
      .attr("y", (d, i) => i * dimensions.boundedHeight/7 + (dimensions.boundedHeight/7 + 7)/2)
      .text(d => formatPercent(xAccessor(d)))
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("font-family", "Merriweather, serif")
      .style("text-transform", "capitalize")
  //Add xAxis Lables
  const yAxisLabels = barGroups.append("text")
      .attr("x", d => -10)
      .attr("y", (d, i) => i * dimensions.boundedHeight/7 + (dimensions.boundedHeight/7 + 7)/2)
      .text(nameAccessor)
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("font-family", "Titillium Web, sans-serif")
      .style("text-anchor", "end")
      .style("text-transform", "capitalize")



}
drawBarChart()
