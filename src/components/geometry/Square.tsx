import { Line } from '@react-three/drei'
import { FC } from 'react'
import { Vector3 } from 'three'

const Square: FC<{ points: Vector3[]; color?: string }> = ({ points, color = 'blue' }) => {
  return (
    <group>
      <Line lineWidth={3} color={color} points={[...points, points[0]]}>
        <lineBasicMaterial />
      </Line>
    </group>
  )
}

export default Square
