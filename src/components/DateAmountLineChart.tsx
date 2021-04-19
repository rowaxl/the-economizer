import { useMemo } from 'react';
import { Group } from '@visx/group';
import { Bar } from '@visx/shape';
import { scaleBand, scaleLinear } from '@visx/scale'
import { Tooltip, defaultStyles, useTooltip } from "@visx/tooltip"
import { Legend } from "@visx/legend"

interface IRecord {
  id: string,
  date: string,
  amount: number,
  category: string
}

interface IProps {
  data: IRecord[]
}

const getDate = (record: IRecord) => record.date

const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
};

// bounds
const width = 500;
const height = 500;
const margin = { top: 10, bottom: 10, left: 0, right: 0 };
const xMax = width;
const yMax = height - margin.top - margin.bottom;

let tooltipTimeout: number

const DateAmountChart = ({ data }: IProps) => {
  const xScale = useMemo(
    () =>
      scaleBand({
        range: [0, xMax],
        round: true,
        domain: data.map(getDate),
        padding: 0.4,
      }),
    [xMax],
  )

  const yScale = useMemo(
    () =>
      scaleLinear<number>({
        round: true,
        domain: [0, Math.max(...data.map(d => d.amount))],
        range: [yMax, 0]
      }),
    [yMax],
  )

  const {
    tooltipOpen,
    tooltipLeft,
    tooltipTop,
    tooltipData,
    hideTooltip,
    showTooltip
  } = useTooltip()

  return (
    <>
      <svg width='100%' height={height}>
        <Group top={margin.top} left={margin.left} height={yMax}>
          {data.map(d => {
            const barWidth = xScale.bandwidth();
            const barHeight = yMax - (yScale(d.amount) ?? 0);

            const barX = xScale(d.date) || 0;
            const barY = yMax - barHeight;

            return (
              <Bar
                key={`bar-${d.id}`}
                x={barX}
                y={barY}
                width={barWidth}
                height={barHeight}
                rx={4}
                fill="rgba(23, 233, 217, .5)"
                onMouseLeave={() => {
                  tooltipTimeout = window.setTimeout(() => {
                    hideTooltip();
                  }, 300);
                }}

                onMouseMove={() => {
                  if (tooltipTimeout) clearTimeout(tooltipTimeout);
                  const top = yMax
                  const left = barX + barWidth + margin.left

                  showTooltip({
                    tooltipData: d,
                    tooltipTop: top,
                    tooltipLeft: left
                  });
                }}
              />
            )
          })}

        </Group>
      </svg>

      <div className="dark:tw-text-white">
        <Legend
          scale={xScale}
          direction="row"
          labelMargin="0 15px 0 15px"
          className="tw-justify-start"
        />
      </div>

      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div>
            <strong>Amounts</strong>
          </div>
          <div className="tw-text-center">
            ${(tooltipData as IRecord)['amount']}
          </div>
        </Tooltip>
      )}
    </>
  )
}

export default DateAmountChart
