import { FC, useState } from 'react'
import { Vector3 } from 'three'

type PointProps = {
  position: number[]
  onClick: (point: Vector3) => void
  selected: boolean
}

export const Point: FC<PointProps> = ({ position, onClick, selected = false }) => {
  const [hovered, setHovered] = useState(false)
  const vectorPosition = new Vector3(position[0], position[1], position[2])
  return (
    <mesh
      position={vectorPosition}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => onClick(vectorPosition)}
      visible={hovered || selected}>
      <sphereGeometry args={[0.06]} />
      <meshBasicMaterial color={selected ? 'green' : 'blue'} />
    </mesh>
  )
}
