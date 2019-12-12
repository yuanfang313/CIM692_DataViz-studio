/*jshint esversion: 6 */
async function drawLineChart() {

  //1_Access data
  const dataset = await d3.json("../worldoncover/th1.json")
  //console.table(dataset[7])
  //console.log(yAccessor(dataset[0]))
const drawLineCharts = metric => {
  const yAccessor = d => d[metric]
  const dateParser = d3.timeParse("%Y")
  const xAccessor = d => dateParser(d.year)

  //2_Create chart dimensions
  const width = 270
  let dimensions = {
    width: width,
    height: width * 1,
    margin: {
      top: 30,
      right: 15,
      bottom: 60,
      left: 60,
    },
  }
  dimensions.boundedWidth = dimensions.width -
    dimensions.margin.left -
    dimensions.margin.right
  dimensions.boundedHeight = dimensions.height -
    dimensions.margin.top -
    dimensions.margin.bottom

  //3_Draw canvas
  const wrapper = d3.select("#wrapper")
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
    .attr("stroke", "#46b5d1")
    .attr("stroke-width", 3)
    .attr("opacity", 0.8)


const dotsGroup = bounds.append("g")
dataset.forEach(d => {dotsGroup.append("circle")
      .attr("cx", xScale(xAccessor(d)))
      .attr("cy", yScale(yAccessor(d)))
      .attr("r", 3)
      .attr("fill", "#46b5d1")
  })

//6_Draw peripherals
//Add yGrids
const yGridsGenerator = d3.axisLeft()
    .scale(yScale)
    .tickSize(-dimensions.boundedWidth)
    .tickFormat("")

const yGrid = bounds.append("g")
    .call(yGridsGenerator)
    .attr("class", "grid")


//Add xGrids
  const xGridsGenerator = d3.axisBottom()
    .scale(xScale)
    .tickSize(-dimensions.boundedHeight)
    .tickFormat("")

  const xGrid = bounds.append("g")
    .call(xGridsGenerator)
    .style("transform", `translateY(${
        dimensions.boundedHeight
      }px)`)
    .attr("class", "grid")

  //Add xAxis
  const xAxisGernerator = d3.axisBottom()
      .scale(xScale)

  const xAxis = bounds.append("g")
    .call(xAxisGernerator)
    .style("transform", `translateY(${
        dimensions.boundedHeight + 10
      }px)`)
  //Add yAxis
  const formtter = d3.format(".0%")
  const yAxisGenerator = d3.axisLeft()
    .scale(yScale)
    .tickFormat(formtter)

  const yAxis = bounds.append("g")
    .call(yAxisGenerator)
    .style("transform", `translateX(${
        - 10
      }px)`)

  const xAxisLabel = xAxis.append("text")
      .attr("x", dimensions.boundedWidth/2)
      .attr("y", dimensions.margin.bottom - 15)
      .attr("fill", "black")
      .style("font-size", "1.4em")
      .text(metric)
      .style("text-transform", "capitalize")
      .style("font-size","16px")
      .style("font-family", "Alatsi, sans-serif")

//xGrids
// const xGridsGroup = bounds.append("g")
//
//   dataset.forEach(d => {
//     xGridsGroup.append("line")
//       .attr("x1", xScale(xAccessor(d)))
//       .attr("x2", xScale(xAccessor(d)))
//       .attr("y1", 0)
//       .attr("y2", dimensions.boundedHeight)
//       .attr("class", "grid")
//   })

}
const metrics = [
  "culture",
  "economy",
  "politics",
  "education",
  "sports",
  "science and technology",
  "history events",
  "news events",
  "social issue",
  "figure",
  "personal livelihood",
  "personal issue and cultivation",
]
metrics.forEach(drawLineCharts)
}
drawLineChart()
