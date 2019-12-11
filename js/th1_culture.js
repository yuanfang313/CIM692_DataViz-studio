/*jshint esversion: 6 */
async function drawLineChart() {

  //1_Access data
  const dataset = await d3.json("th1.json")
  //console.table(dataset[7])
  const yAccessor = d => d.culture
  const dateParser = d3.timeParse("%Y")
  const xAccessor = d => dateParser(d.year)
  //console.log(yAccessor(dataset[0]))

  //2_Create chart dimensions
  const width = 240
  let dimensions = {
    width: width,
    height: 320,
    margin: {
      top: 50,
      right: 15,
      bottom: 80,
      left: 40,
    },
  }
  dimensions.boundedWidth = dimensions.width -
    dimensions.margin.left -
    dimensions.margin.right
  dimensions.boundedHeight = dimensions.height -
    dimensions.margin.top -
    dimensions.margin.bottom

  //3_Draw canvas
  const wrapper = d3.select("#th1_culture")
    .append("svg")
    .attr("width", dimensions.width)
    .attr("height", dimensions.height)

  const bounds = wrapper.append("g")
    .style("transform", `translate(${
              dimensions.margin.left
            }px, ${
              dimensions.margin.top
            }px)`)

  //4_Create scales
  const yScale = d3.scaleLinear()
    .domain([0, 0.4])
    .range([dimensions.boundedHeight, 0])
  console.log(yScale(32))


  const freezingTemperatures = bounds.append("rect")
    .attr("x", 0)
    .attr("width", dimensions.boundedWidth)
    .attr("y", 0)
    .attr("height", dimensions.boundedHeight)
    .attr("fill", "#f8f8f8")

  const xScale = d3.scaleTime()
    .domain(d3.extent(dataset, xAccessor))
    .range([0, dimensions.boundedWidth])
  //5_Draw data
  /*bounds.append("path")
      .attr("d", "M 0 0 L 100 0 L 100 100 L 0 50 Z")*/
  const lineGenerator = d3.line()
    .x(d => xScale(xAccessor(d)))
    .y(d => yScale(yAccessor(d)))
  const line = bounds.append("path")
    .attr("d", lineGenerator(dataset))
    .attr("fill", "none")
    .attr("stroke", "#1089ff")
    .attr("stroke-width", 4)
    .attr("opacity", 0.5)

  dataset.forEach(d => {
    bounds.append("circle")
      .attr("cx", xScale(xAccessor(d)))
      .attr("cy", yScale(yAccessor(d)))
      .attr("r", 3)
      .attr("fill", "#1089ff")

  })
  const dots = bounds.append("circle")


  //6_Draw peripherals
  const formtter = d3.format(".0%")
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .tickFormat(formtter)
  const yAxis = bounds.append("g")
    .call(yAxisGenerator)
    .style("transform", `translateX(${
        -10
      }px)`)

  const xAxisGenerator = d3.axisBottom()
    .scale(xScale)
  const xAxis = bounds.append("g")
    .call(xAxisGenerator)
    .style("transform", `translateY(${
        dimensions.boundedHeight + 10
      }px)`)

  const xAisLabel =xAxis.append("text")
      .attr("x", dimensions.boundedWidth/2)
      .attr("y", dimensions.margin.bottom - 25)
      .attr("fill","#1089ff")
      .style("font-size", "2em")
      .text("Culture")

//xGrids
  dataset.forEach(d => {
    bounds.append("line")
      .attr("x1", xScale(xAccessor(d)))
      .attr("x2", xScale(xAccessor(d)))
      .attr("y1", 0)
      .attr("y2", dimensions.boundedHeight)
      .attr("class", "grid")
  })

}
drawLineChart()
