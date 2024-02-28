import { Dispatch, SetStateAction } from 'react'
import { Vector3 } from 'three'

export type ControlPanelProps = {
  figure: 'triangle' | 'square'
  setFigure: Dispatch<SetStateAction<'triangle' | 'square'>>
  pointState: 'start' | 'end'
  setPointState: Dispatch<SetStateAction<'start' | 'end'>>
  reflectedPoints: Vector3[] | undefined
  onClick: () => void
}
