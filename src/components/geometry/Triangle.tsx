import { Line } from '@react-three/drei'
import { FC } from 'react'
import { Vector3 } from 'three'

const Triangle: FC<{ points: Vector3[]; color?: string }> = ({ points, color = 'blue' }) => {
  const trianglePoints = [points[0], points[1], points[2], points[0]]
  return (
    <group>
      <Line lineWidth={3} color={color} points={trianglePoints}>
        <lineBasicMaterial />
      </Line>
    </group>
  )
}

export default Triangle
