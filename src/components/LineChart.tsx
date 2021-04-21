import React from 'react';
import { Group } from '@visx/group';
import { LinePath } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale';
import { extent, max } from 'd3-array';

const lineCount = 12;

interface IRecord {
  date: string
  amount: number
}

type Props = {
  data: IRecord[]
}

const width = 500
const height = 500

// data accessors
const getX = (d: IRecord) => d.date;
const getY = (d: IRecord) => d.amount;


const Lines = ({ data }: Props) => {
  // bounds
  const lineHeight = 500 / lineCount;

  // scales
  const xScale = scaleBand<string>({
    domain: extent(data, getX) as [string, string],
  });
  const yScale = scaleLinear<number>({
    domain: [0, max(data, getY) as number],
  });

  // update scales
  xScale.range([0, width]);
  yScale.range([lineHeight, 0]);

  return (
    <svg width={width} height={height}>
      <Group top={lineHeight}>
        <LinePath
          data={data}
          x={d => xScale(getX(d as IRecord)) ?? 0}
          y={d => yScale(getY(d as IRecord)) ?? 0}
          stroke="#ffffff"
          strokeWidth={2}
          shapeRendering="geometricPrecision"
        />
        </Group>
    </svg>
  );
};

export default Lines;
