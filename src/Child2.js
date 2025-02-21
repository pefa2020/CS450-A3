import React, { Component } from "react";
import * as d3 from 'd3';

class Child2 extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount() {
    // Receive Data (Array of objects)
    console.log(this.props.data2)
  }

  componentDidUpdate() {
    console.log(this.props.data2)

    const received_data = (this.props.data2 == null) ? [] : this.props.data2;
    // 1) find set of unique values
    // 2) parse set and match it with received_data corresponding value => calculate mean for each and assign it as value for
    // new array
    // 3) meaning of done: parse_data = [] 
    const parsed_data = []
    const unique_values = [...new Set(received_data.map((item) => item.day))]
      .forEach(unique_day => {
        // for each unique day => find average tip
        var total_tips = 0;
        var number_of_tips = 0;
        received_data.forEach((item, index) => {
          if (item.day === unique_day) {
            total_tips += item.tip;
            number_of_tips++;
          }
        })
        const avg_tip = total_tips / number_of_tips;
        parsed_data.push({ day: unique_day, avg_tip: avg_tip });
      })
    console.log(parsed_data)


    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 30, left: 60 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    var svg = d3.select(".child2_svg")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

    // X axis
    var x = d3.scaleBand()
      .range([0, width])
      .domain(parsed_data.map(function (d) { return d.day; }))
      .padding(0.2);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([0, 3.3])
      .range([height, 0]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Bars
    svg.selectAll("mybar")
      .data(parsed_data)
      .enter()
      .append("rect")
      .attr("x", function (d) { return x(d.day); })
      .attr("y", function (d) { return y(d.avg_tip); })
      .attr("width", x.bandwidth())
      .attr("height", function (d) { return height - y(d.avg_tip); })
      .attr("fill", "#69b3a2")

    //Add x-axis label:
    svg
      .append("text")
      .attr("transform", "translate(" + width / 2 + " ," + (height + margin.top + 30) + ")")
      .style("text-anchor", "middle")
      .text("Day");


    // Add title
    svg.append("text")
      .attr("x", width / 2) // Center the title
      .attr("y", 0 - margin.top / 2) // Position it above the chart
      .attr("text-anchor", "middle") // Center the text
      .style("font-size", "16px") // Set font size
      .style("font-weight", "bold") // Make it bold
      .text("Average Tips by Day"); // Set the title text



    //Add y-axis label:
    svg
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", -40)
      .attr("x", 0 - height / 2)
      .style("text-anchor", "middle")
      .text("Average Tip");
  }

  render() {
    return (
      <svg className="child2_svg"></svg>

    );
  }

}
export default Child2;