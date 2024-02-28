import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { FC } from 'react'
import css from './ControlPanel.module.css'
import { ControlPanelProps } from './ControlPanel.type'

const ControlPanel: FC<ControlPanelProps> = ({
  pointState,
  setPointState,
  figure,
  setFigure,
  reflectedPoints,
  onClick,
}) => {
  const handleChangePoint = (
    event: React.MouseEvent<HTMLElement>,
    newPointState: 'start' | 'end'
  ) => {
    event.preventDefault()
    !!newPointState && setPointState(newPointState)
  }

  const handleChangeFigure = (
    event: React.MouseEvent<HTMLElement>,
    newFigure: 'triangle' | 'square'
  ) => {
    event.preventDefault()
    !!newFigure && setFigure(newFigure)
  }

  return (
    <div className={css.control_panel}>
      <div className={css.form}>
        <div>
          <h2>Line</h2>
          <div className={css.group_button}>
            <ToggleButtonGroup
              color='primary'
              value={pointState}
              exclusive
              onChange={handleChangePoint}>
              <ToggleButton value='start'>Start</ToggleButton>
              <ToggleButton value='end'>End</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
        <div>
          <h2>Figure</h2>

          <div className={css.group_button}>
            <ToggleButtonGroup
              color='primary'
              value={figure}
              exclusive
              onChange={handleChangeFigure}>
              <ToggleButton value='triangle'>Triangle</ToggleButton>
              <ToggleButton value='square'>Square</ToggleButton>
            </ToggleButtonGroup>
          </div>
        </div>
      </div>
      <button onClick={onClick}>{!!reflectedPoints ? 'Reset' : 'Reflect'}</button>
    </div>
  )
}

export default ControlPanel
