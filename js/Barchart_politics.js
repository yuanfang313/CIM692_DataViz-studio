/*jshint esversion: 6 */
async function drawBarChart() {
  //1_Access data
  const dataset = await d3.json("json/th2_politics.json")
  const xAccessor = d => d.proportion
  const nameAccessor = d => d.subCategory
  const imgAccessor = d =>d.trendImage
  //2_Create dimensioins
  const width = 700
  let dimensions = {
    width: width,
    height: width * 0.30,
    margin:{
      top: 50,
      bottom: 0,
      left: 250,
      right: 0,
    }
  }
  dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right
  dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom
  //3_Draw canvas
  const wrapper4 = d3.select("#wrapper4")
      .append("svg")
      .attr("width", dimensions.width)
      .attr("height", dimensions.height)
  const bounds = wrapper4.append("g")
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
      .selectAll(".bar")
      .data(dataset)
  barGroups.exit()
      .remove()
  const newBarGroups = barGroups.enter().append("g")
      .attr("class", "bar")

  barGroups =newBarGroups.merge(barGroups)

  const barRects = barGroups.append("rect")
      .attr("x", 0)
      .attr("y", (d, i) => i * dimensions.boundedHeight/6)
      .attr("width", d => xScale(xAccessor(d)))
      .attr("height", dimensions.boundedHeight/6 - 7)
      .attr("fill", "#b5e0ba")


  //Add bar Labels
  const formatPercent = d3.format(".1%")
  const barLabels = barGroups.append("text")
      .attr("x", d => xScale(xAccessor(d)) + 3)
      .attr("y", (d, i) => i * dimensions.boundedHeight/6 + (dimensions.boundedHeight/6 + 7)/2)
      .text(d => formatPercent(xAccessor(d)))
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("font-family", "Merriweather, serif")
      .style("text-transform", "capitalize")
  //Add xAxis Lables
  const yAxisLabels = barGroups.append("text")
      .attr("x", d => -10)
      .attr("y", (d, i) => i * dimensions.boundedHeight/6 + (dimensions.boundedHeight/6 + 7)/2)
      .text(nameAccessor)
      .attr("fill", "black")
      .style("font-size", "14px")
      .style("font-family", "Titillium Web, sans-serif")
      .style("text-anchor", "end")
      .style("text-transform", "capitalize")
      //hover over label
        const xAxisLabels = bounds.append("text")
          .attr("x", 0)
          .attr("y", -25)
          .text("Hover over each bar for more information.")
          .attr("fill", "#5cbf67")
          .style("font-size", "14px")
          .style("font-family", "Alatsi, sans-serif")
          .style("text-anchor", "middle")
          .style("text-transform", "capitalize")
//Setup interaction
barGroups.select("rect")
  .on("mouseenter", onMouseEnter)
  .on("mouseleave", onMouseLeave)
const trendImage = d3.select("#trendImage4")
function onMouseEnter(datum) {
trendImage.attr("src", imgAccessor(datum))
}
function onMouseLeave(datum) {

}
}
drawBarChart()
