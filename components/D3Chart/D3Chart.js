import { useEffect } from 'react';
import * as d3 from 'd3';

import styles from './D3Chart.module.scss';

const D3Chart = ({ data }) => {
  const margin = 100;
  const width = 1200 - 2 * margin;
  const height = 600 - 2 * margin;

  const drawChart = (data) => {
    const svg = d3.select('svg').append('g');

    const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);

    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain([0, d3.max(data.map((launch) => launch['totalPayload'])) * 1.2]);

    chart.append('g')
      .call(d3.axisLeft(yScale))
      .selectAll('text')
      .style('color', '#999');

    chart.append('g')
      .call(d3.axisLeft().scale(yScale).tickSize(-width, 0, 0).tickFormat(''))
      .style('color', '#ccc');

    svg.append('text')
      .attr('x', -(height / 2) - margin)
      .attr('y', margin / 2.4)
      .attr('transform', 'rotate(-90)')
      .attr('text-anchor', 'middle')
      .text('Total payload (kg)');

    const xScale = d3.scaleBand()
      .domain(data.map((launch) => launch['date']))
      .rangeRound([width, 0])
      .padding(0.1);

    chart.append('g')
      .attr('transform', `translate(0, ${height})`)
      .call(d3.axisBottom(xScale))
      .selectAll('text')
      .attr('dx', '-.8em')
      .attr('dy', '-.2em')
      .attr('transform', 'rotate(-65)')
      .style('text-anchor', 'end')
      .style('color', '#999');

    svg.append('text')
      .attr('x', width / 2 + margin)
      .attr('y', height + 2 * margin)
      .attr('text-anchor', 'middle')
      .text('Date');

    chart.selectAll()
      .data(data)
      .enter()
      .append('rect')
      .attr('x', (data) => xScale(data['date']))
      .attr('y', (data) => yScale(data['totalPayload']))
      .attr('height', (data) => height - yScale(data['totalPayload']))
      .attr('width', xScale.bandwidth())
      .style('fill', '#459fd5');
  };

  useEffect(() => {
    drawChart(data);
  }, []);

  return <svg className={styles.container} />;
};

export default D3Chart;
