'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

import { SimulationNodeDatum } from 'd3';

interface Node extends SimulationNodeDatum {
  id: string;
  group?: string;
}

const nodes: Node[] = [{ id: 'node1' }, { id: 'node2' }, { id: 'node3' }];

interface Props {
  data?: any;
  height?: number;
  width?: number;
  group?: number;
}

const links = [
  { source: 'A', target: 'B' },
  { source: 'B', target: 'D' },
  { source: 'C', target: 'E' },
  { source: 'D', target: 'B' },
  { source: 'E', target: 'B' },
  { source: 'E', target: 'D' },
  { source: 'F', target: 'A' },
  { source: 'G', target: 'D' },
];

export default function Page({ width, height }: Props) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 'node1', group: '1' },
    { id: 'node2', group: '1' },
    { id: 'node3', group: '1' },
    { id: 'node4', group: '1' },
    { id: 'node5', group: '2' },
    { id: 'node6', group: '2' },
    { id: 'node7', group: '2' },
    { id: 'node8', group: '2' },
    { id: 'node9', group: '2' },
    { id: 'node10', group: '2' },
    { id: 'node11', group: '2' },
    { id: 'node12', group: '2' },
    { id: 'node13', group: '2' },
    { id: 'node14', group: '2' },
    { id: 'node15', group: '2' },
    { id: 'node16', group: '2' },
    { id: 'node17', group: '2' },
    { id: 'node18', group: '2' },
    { id: 'node19', group: '2' },
    { id: 'node20', group: '2' },
    //
    { id: 'node21', group: '3' },
    { id: 'node22', group: '3' },
    { id: 'node23', group: '3' },
    { id: 'node24', group: '3' },
    { id: 'node25', group: '3' },
    { id: 'node26', group: '3' },
    { id: 'node27', group: '3' },
    { id: 'node28', group: '3' },
    { id: 'node29', group: '3' },
    { id: 'node30', group: '3' },
    { id: 'node31', group: '3' },
    { id: 'node32', group: '3' },
    { id: 'node33', group: '3' },
    { id: 'node34', group: '3' },
    { id: 'node35', group: '3' },
  ]);

  const [links, setLinks] = useState([
    { source: 'node1', target: 'node2' },
    { source: 'node2', target: 'node3' },
    { source: 'node3', target: 'node4' },
    { source: 'node5', target: 'node6' },
    { source: 'node5', target: 'node7' },
    { source: 'node5', target: 'node8' },
    { source: 'node5', target: 'node7' },
    { source: 'node8', target: 'node9' },
    { source: 'node8', target: 'node10' },
    { source: 'node8', target: 'node11' },
    { source: 'node11', target: 'node12' },
    { source: 'node11', target: 'node13' },
    { source: 'node11', target: 'node14' },
    { source: 'node11', target: 'node15' },
    { source: 'node11', target: 'node16' },
    { source: 'node16', target: 'node17' },
    { source: 'node17', target: 'node18' },
    { source: 'node18', target: 'node19' },
    { source: 'node19', target: 'node20' },
    //
    { source: 'node21', target: 'node22' },
    { source: 'node21', target: 'node23' },
    { source: 'node21', target: 'node24' },
    { source: 'node21', target: 'node25' },
    { source: 'node21', target: 'node26' },
    { source: 'node26', target: 'node27' },
    { source: 'node26', target: 'node28' },
    { source: 'node26', target: 'node29' },
    { source: 'node29', target: 'node30' },
    { source: 'node29', target: 'node31' },
    { source: 'node29', target: 'node32' },
    { source: 'node21', target: 'node33' },
    { source: 'node21', target: 'node34' },
    { source: 'node21', target: 'node35' },
  ]);
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Force Simulation
    const simulation = d3
      .forceSimulation(nodes)
      .force(
        'link',
        d3.forceLink(links).id((d: any) => d.id),
      )
      .force('charge', d3.forceManyBody())
      .force('center', d3.forceCenter(width / 2, height / 2));

    // 노드 클릭 이벤트 핸들러
    const handleNodeClick = (event: any, clickedNode: any) => {
      link.attr('stroke', (d: any) =>
        d.source.id === clickedNode.id || d.target.id === clickedNode.id
          ? 'red'
          : '#999',
      );
    };

    const drag = (simulation: d3.Simulation<Node, undefined>) => {
      function dragstarted(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node,
      ) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node,
      ) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(
        event: d3.D3DragEvent<SVGCircleElement, Node, Node>,
        d: Node,
      ) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }

      return d3
        .drag<SVGCircleElement, Node, Node>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
    };

    // 나머지 코드는 동일합니다...

    // Links
    const link = svg
      .append('g')
      .attr('stroke', '#999')
      .attr('stroke-opacity', 0.6)
      .selectAll('line')
      .data(links)
      .join('line')
      .attr('stroke-width', (d: any) => Math.sqrt(d.value));

    // Nodes
    const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

    const node = svg
      .append('g')
      .attr('stroke', '#fff')
      .attr('stroke-width', 1.5)
      .selectAll('circle')
      .data(nodes)
      .join('circle')
      .attr('r', 10)
      .attr('fill', (d) => colorScale(d.group ?? 'unknown'))
      .call(drag(simulation))
      .on('click', handleNodeClick);

    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => d.source.x)
        .attr('y1', (d: any) => d.source.y)
        .attr('x2', (d: any) => d.target.x)
        .attr('y2', (d: any) => d.target.y);

      node.attr('cx', (d: any) => d.x).attr('cy', (d: any) => d.y);
    });

    // Cleanup function to remove the svg elements when the component unmounts
    return () => {
      svg.selectAll('*').remove();
    };
  }, [nodes, links]); // Dependencies array to re-run the effect when nodes or links change

  return <svg ref={svgRef} width={800} height={600}></svg>;
}
