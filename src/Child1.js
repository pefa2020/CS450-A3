import React, { Component } from "react";
import * as d3 from 'd3';

class Child1 extends Component {
  constructor(props) {
    super(props);
    this.state = { data: [] }
  }


  componentDidMount() {
    console.log(this.props.data1)
  }

  componentDidUpdate() {

    // console.log(Array.isArray(this.props.data1))
    // total bill vs tips

    console.log(this.props.data1)
    var data = [];
    data = this.props.data1;

    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right + 200,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(".child1_svg")
      .append("svg")
      .attr("width", "100%")// .attr("width", width + margin.left + margin.right)
      .attr("height", "100%")//.attr("height", height + margin.top + margin.bottom )
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // Add X axis
    var x = d3.scaleLinear()
      .domain([0, 50])
      .range([0, width]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add title
    svg.append("text")
      .attr("x", width / 2) // Center the title
      .attr("y", 0 - margin.top / 2) // Position it above the chart
      .attr("text-anchor", "middle") // Center the text
      .style("font-size", "16px") // Set font size
      .style("font-weight", "bold") // Make it bold
      .text("Total Bill vs Tips"); // Set the title text

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 10])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", function (d) { return x(d.total_bill); })
      .attr("cy", function (d) { return y(d.tip); })
      .attr("r", 3) // 1.5
      .style("fill", "#69b3a2")


    //Add x-axis label:
    svg
      .append("text")
      .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")")
      .style("text-anchor", "middle")
      .text("Total Bill");

    //Add y-axis label:
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", 0 - height / 2)
      .style("text-anchor", "middle")
      .text("Tips");

  }

  render() {

    return (
      <svg className="child1_svg"></svg>
    );
  }
}

export default Child1;