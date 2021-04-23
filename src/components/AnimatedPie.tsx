import { ProvidedProps, PieArcDatum } from "@visx/shape/lib/shapes/Pie";
import { animated, useTransition, interpolate } from 'react-spring';

// react-spring transition definitions
type AnimatedStyles = { startAngle: number; endAngle: number; opacity: number }

type AnimatedPieProps<Datum> = ProvidedProps<Datum> & {
  animate?: boolean
  getKey: (d: PieArcDatum<Datum>) => string
  getColor: (d: PieArcDatum<Datum>) => string
  onClickDatum: (d: PieArcDatum<Datum>) => void
  delay?: number
  onMouseMove: (d: PieArcDatum<Datum>, x: number, y: number) => void
  onMouseLeave: (d: PieArcDatum<Datum>, x: number, y: number) => void
};

type TransitionProps<D> = {
  item: PieArcDatum<D>
  props: AnimatedStyles
  key: string
}

const fromLeaveTransition = ({ endAngle }: PieArcDatum<any>) => ({
  // enter from 360° if end angle is > 180°
  startAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  endAngle: endAngle > Math.PI ? 2 * Math.PI : 0,
  opacity: 0,
})

const enterUpdateTransition = ({ startAngle, endAngle }: PieArcDatum<any>) => ({
  startAngle,
  endAngle,
  opacity: 1,
})

function AnimatedPie<Datum>({
  animate,
  arcs,
  path,
  getKey,
  getColor,
  onClickDatum,
  onMouseMove,
  onMouseLeave,
}: AnimatedPieProps<Datum>) {
  const transitions = useTransition<PieArcDatum<Datum>, AnimatedStyles>(
    arcs,
    getKey,
    // @ts-ignore react-spring doesn't like this overload
    {
      from: animate ? fromLeaveTransition : enterUpdateTransition,
      enter: enterUpdateTransition,
      update: enterUpdateTransition,
      leave: animate ? fromLeaveTransition : enterUpdateTransition,
    },
  );
  return (
    <>
      {transitions.map(
        ({ item: arc, props, key, }: TransitionProps<Datum>) => {
          const [centroidX, centroidY] = path.centroid(arc);
          const hasSpaceForLabel = arc.endAngle - arc.startAngle >= 0.1;

          return (
            <g key={key}>
              <animated.path
                // compute interpolated path d attribute from intermediate angle values
                d={interpolate([props.startAngle, props.endAngle], (startAngle, endAngle) =>
                  path({
                    ...arc,
                    startAngle,
                    endAngle,
                  }),
                )}
                fill={getColor(arc)}
                onClick={() => onClickDatum(arc)}
                onTouchStart={() => onClickDatum(arc)}
                onMouseMove={() => onMouseMove(arc, centroidX, centroidY)}
                onMouseLeave={() => onMouseLeave(arc, centroidX, centroidY)}
              />
              {hasSpaceForLabel && (
                <animated.g style={{ opacity: props.opacity }}>
                  <text
                    fill="white"
                    x={centroidX}
                    y={centroidY}
                    dy=".33em"
                    fontSize={14}
                    textAnchor="middle"
                    pointerEvents="none"
                  >
                    {getKey(arc)}
                  </text>
                </animated.g>
              )}
            </g>
          );
        },
      )}
    </>
  );
}

export default AnimatedPie
