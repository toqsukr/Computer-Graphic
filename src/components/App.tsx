import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Vector3 } from 'three'
import { calculateReflect } from '../core/main'
import './App.css'
import ControlPanel from './control-panel/ControlPanel'
import { CustomAxis } from './custom-axis/CustomAxis'
import CustomLine from './custom-line/CustomLine'
import Square from './geometry/Square'
import Triangle from './geometry/Triangle'

const startDefault = new Vector3(-5, -4, 0.01)
const endDefault = new Vector3(4, -1, 0.01)

function App() {
  const [startPoint, setStart] = useState<Vector3>(startDefault)
  const [endPoint, setEnd] = useState<Vector3>(endDefault)

  const [figure, setFigure] = useState<'triangle' | 'square'>('triangle')

  const [geometryPoints] = useState<Vector3[]>([
    new Vector3(-1.0, -1.0, 0.01),
    new Vector3(-1.0, 1.0, 0.01),
    new Vector3(-3.0, 1.0, 0.01),
    new Vector3(-3.0, -1.0, 0.01),
  ])

  const [reflectedPoints, setReflected] = useState<Vector3[] | undefined>(undefined)

  const [selectedPoint, setSelected] = useState<Vector3>(startDefault)
  const [pointState, setPointState] = useState<'start' | 'end'>('start')

  useEffect(() => {
    setSelected(pointState === 'start' ? startPoint : endPoint)
  }, [pointState])

  const onClick = () => {
    setReflected(
      !!reflectedPoints ? undefined : calculateReflect(startPoint, endPoint, geometryPoints)
    )
  }

  useEffect(() => {
    setReflected(undefined)
  }, [startPoint, endPoint])

  return (
    <>
      <ControlPanel
        reflectedPoints={reflectedPoints}
        onClick={onClick}
        pointState={pointState}
        setPointState={setPointState}
        figure={figure}
        setFigure={setFigure}
      />
      <Canvas>
        <OrbitControls enableRotate={false} />
        <CustomAxis
          state={pointState}
          setStart={setStart}
          setEnd={setEnd}
          selectedPoint={selectedPoint}
          setSelected={setSelected}
        />
        <CustomLine point1={startPoint} point2={endPoint} />
        {figure === 'square' ? (
          <Square points={geometryPoints} />
        ) : (
          <Triangle points={geometryPoints} />
        )}
        {!!reflectedPoints &&
          (figure === 'square' ? (
            <Square color='white' points={reflectedPoints} />
          ) : (
            <Triangle color='white' points={reflectedPoints} />
          ))}
      </Canvas>
    </>
  )
}

export default App
