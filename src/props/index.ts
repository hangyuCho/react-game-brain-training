import { Dispatch, SetStateAction } from "react"

interface BaseStageProps {
  onNextStage: () => void
}
interface ConditionStageProps extends BaseStageProps {
  onSetRounds: (fixedRounds: number) => void
  onSetTimeLimit: (fixedTimeLimit: number) => void
}

interface GameStageProps extends BaseStageProps {
  onSetHit: Dispatch<SetStateAction<number>>
  rounds: number
  playTimeLimit?: number
}

interface ResultStageProps extends BaseStageProps {
  rounds: number
  hit: number
  onReset: () => void
}

interface TargetButtonProps {
  onExecute?: () => void
  label?: string
  isTarget?: boolean
}

interface TimerProps {
  playTimeLimit?: number
  onNextStage: () => void
}

interface HitAreaProps {
  onSetHit: Dispatch<SetStateAction<number>>
  rounds: number
  onNextStage: () => void
}


export {
  type ConditionStageProps,
  type GameStageProps,
  type ResultStageProps,
  type TargetButtonProps,
  type TimerProps,
  type HitAreaProps
}
