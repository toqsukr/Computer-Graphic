import { useThree } from '@react-three/fiber'
import React from 'react'
import { GridHelper } from 'three'

const AxisSystem: React.FC = () => {
  const { scene } = useThree()

  React.useEffect(() => {
    const gridHelper = new GridHelper(200, 400, '#ffffff', '#444444')

    gridHelper.rotation.x = Math.PI / 2
    gridHelper.position.y = 0
    gridHelper.position.z = 0
    gridHelper.material.opacity = 0.2

    scene.add(gridHelper)

    return () => {
      scene.remove(gridHelper)
    }
  }, [scene])

  return null
}

export default AxisSystem
