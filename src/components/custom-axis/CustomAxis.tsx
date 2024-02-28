import { Dispatch, FC, SetStateAction } from 'react'
import { Euler, Vector3 } from 'three'
import { Point } from './point/Point'

type CustomAxisType = {
  setStart: Dispatch<SetStateAction<Vector3>>
  setEnd: Dispatch<SetStateAction<Vector3>>
  selectedPoint: Vector3
  setSelected: Dispatch<SetStateAction<Vector3>>
  state: 'start' | 'end'
}

export const CustomAxis: FC<CustomAxisType> = ({
  setEnd,
  setStart,
  selectedPoint,
  setSelected,
  state,
}) => {
  const gridSize = 40
  const gridStep = 1
  const points = []

  const handleClick = (point: Vector3) => {
    state === 'start' ? setStart(point) : setEnd(point)
    setSelected(point)
  }

  for (let x = -gridSize / 2; x <= gridSize / 2; x += gridStep) {
    for (let y = -gridSize / 2; y <= gridSize / 2; y += gridStep) {
      points.push({ x, y })
    }
  }
  const rotation = new Euler(Math.PI / 2, 0, 0)

  const comparePoints = (point: { x: number; y: number }) =>
    !!selectedPoint && selectedPoint.x === point.x && selectedPoint.y === point.y

  return (
    <>
      <gridHelper rotation={rotation} args={[gridSize, gridSize, '#ffffff', '#444444']} />
      {points.map((point, index) => (
        <Point
          selected={comparePoints(point)}
          key={index}
          position={[point.x, point.y, 0]}
          onClick={(point: Vector3) => handleClick(point)}
        />
      ))}
    </>
  )
}
