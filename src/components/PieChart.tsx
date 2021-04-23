import React, { useState } from 'react'
import Pie, { PieArcDatum } from '@visx/shape/lib/shapes/Pie'
import { Group } from '@visx/group'
import { Tooltip, defaultStyles, useTooltip } from "@visx/tooltip"

import AnimatedPie from './AnimatedPie'
import { CATEGORY_COLOR_MAP } from '../utils'

export interface PieRecord {
  id: string,
  amount: number,
  category: string
}

interface IProps {
  data: PieRecord[]
  animate: boolean
}


const tooltipStyles = {
  ...defaultStyles,
  minWidth: 60,
  backgroundColor: "rgba(0,0,0,0.9)",
  color: "white"
}

let pieChartTooltipTimeout: number

const margin = { top: 10, left: 10, right: 10, bottom: 10 }

const width = 500
const height = 500

const innerWidth = width - margin.left - margin.right
const innerHeight = height - margin.top - margin.bottom
const radius = Math.min(innerWidth, innerHeight) / 2
const centerY = innerHeight / 2
const centerX = innerWidth / 2

const getAmount = (r: PieRecord) => r.amount

const PieChart = ({ data, animate = true }: IProps) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

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
        <svg width={width} height={height}>
          <rect rx={14} width={width} height={height} fill="url('#visx-pie-gradient')" />
          <Group top={centerY + margin.top} left={centerX + margin.left}>
            <Pie
              data={
                selectedCategory ? data.filter(({ category }) => category === selectedCategory) : data
              }
              pieValue={getAmount}
              outerRadius={radius}
              cornerRadius={3}
              padAngle={0.005}
            >
              {pie => {
                return (
                  <AnimatedPie<PieRecord>
                    {...pie}
                    animate={animate}
                    getKey={arc => arc.data.category}
                    onClickDatum={({ data: { category } }) =>
                      animate &&
                      setSelectedCategory(selectedCategory && selectedCategory === category ? null : category)
                    }
                    getColor={arc => CATEGORY_COLOR_MAP[arc.data.category as keyof typeof CATEGORY_COLOR_MAP]}
                    onMouseLeave={() => {
                      pieChartTooltipTimeout = window.setTimeout(() => {
                        hideTooltip();
                      }, 300);
                    }}

                    onMouseMove={(d: PieArcDatum<PieRecord>, x: number, y: number) => {
                      if (pieChartTooltipTimeout) clearTimeout(pieChartTooltipTimeout);
                      const top = y + margin.top + height
                      const left = x + 1000 + width + margin.left

                      showTooltip({
                        tooltipData: d.data,
                        tooltipTop: top,
                        tooltipLeft: left
                      });
                    }}
                  />
                )
              }}
            </Pie>
          </Group>
        </svg>

      {tooltipOpen && tooltipData && (
        <Tooltip top={tooltipTop} left={tooltipLeft} style={tooltipStyles}>
          <div>
          <strong>{((tooltipData as PieRecord)).category}</strong>
          </div>
          <div className="tw-text-center">
            ${(tooltipData as PieRecord).amount}
          </div>
        </Tooltip>
      )}
    </>
  )
}

export default PieChart
