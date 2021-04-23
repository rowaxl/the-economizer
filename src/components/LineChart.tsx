import React from 'react'
import {
  Axis,
  Grid,
  AnimatedLineSeries,
  XYChart,
  Tooltip,
} from "@visx/xychart"

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


const LineCharts = ({ data }: Props) => {

  return (
    <XYChart width={width} height={height} xScale={{ type: "band" }} yScale={{ type: "linear" }}>
      <Axis orientation="bottom" />
      <Axis orientation="left" />
      <Grid columns={false} />
      <AnimatedLineSeries dataKey="date" data={data} xAccessor={getX} yAccessor={getY} />
      <Tooltip
        snapTooltipToDatumX
        snapTooltipToDatumY
        showVerticalCrosshair
        showSeriesGlyphs
        renderTooltip={({ tooltipData }) => (
          <div>
            {getX((tooltipData as any).nearestDatum.datum)}
            {": "}
            {getY(((tooltipData as any)).nearestDatum.datum) > 0 ? '$' + getY(((tooltipData as any)).nearestDatum.datum) : '-$' + Math.abs(getY(((tooltipData as any)).nearestDatum.datum))}
          </div>
        )}
      />
    </XYChart>
  );
};

export default LineCharts;
