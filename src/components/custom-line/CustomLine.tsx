import { Line as ThreeLine } from '@react-three/drei'
import { FC } from 'react'
import { Vector3 } from 'three'
import { lineEquation } from '../../core/main'

export type CustomLineProps = {
  point1: Vector3
  point2: Vector3
}

const CustomLine: FC<CustomLineProps> = ({ point1, point2 }) => {
  const equation: (x: number) => number = x => lineEquation(point1, point2, x)
  const plotLine = (x0: number, y0: number, x1: number, y1: number): Vector3[] => {
    const dx = Math.abs(x1 - x0)
    const dy = Math.abs(y1 - y0)
    const accuracy = 0.01
    const sx = x0 < x1 ? accuracy : -accuracy
    const sy = y0 < y1 ? accuracy : -accuracy
    let err = dx - dy
    let x = x0
    let y = y0
    const points: Vector3[] = []
    while (true) {
      points.push(new Vector3(x, y, 0))
      const isXClose = Math.abs(x - x1) < accuracy
      const isYClose = Math.abs(y - y1) < accuracy
      if (isXClose && isYClose) break
      const e2 = 2 * err
      if (e2 > -dy) {
        err -= dy
        x += sx
      }
      if (e2 < dx) {
        err += dx
        y += sy
      }
    }
    return points
  }

  const points = plotLine(-20, equation(-20), 20, equation(20))

  return (
    <group>
      <ThreeLine lineWidth={3} color='red' points={points}>
        <lineBasicMaterial />
      </ThreeLine>
    </group>
  )
}

export default CustomLine
