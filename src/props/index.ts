interface BaseStageProps {
  onNextStage: () => void
}
interface ConditionStageProps extends BaseStageProps {
  onSetRounds: (fixedRounds: number) => void
  onSetTimeLimit: (fixedTimeLimit: number) => void
}

interface GameStageProps extends BaseStageProps {
  onSetHit: () => void
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


export {
  type ConditionStageProps,
  type GameStageProps,
  type ResultStageProps,
  type TargetButtonProps
}
