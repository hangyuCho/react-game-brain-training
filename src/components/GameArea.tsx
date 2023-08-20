import { useEffect, useState } from "react"
import { 
  ConditionStageProps,
  GameStageProps,
  HitAreaProps,
  ResultStageProps,
  TargetButtonProps,
  TimerProps
} from "../props/index" 

const ConditionStage = ({ onNextStage, onSetRounds, onSetTimeLimit } : ConditionStageProps) => {
  
  return (
    <div className="flex justify-center flex-col">
      <div className="flex gap-4 justify-center">
        <div className="flex gap-4">
          <span>Game Round</span>
          <input type="number" className="border" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSetRounds(Number(e.target.value))} />
        </div>
        <div className="flex gap-4">
          <span>Time Limit(seconds)</span>
          <input type="number" className="border" onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSetTimeLimit(Number(e.target.value))}/>
        </div>
      </div>
      <div className="flex w-1/6">
        <button className="border px-10 py-1 rounded-sm" type="button" onClick={() => onNextStage() }>next</button>
      </div>
    </div>
  )
}

const shuffleArray = (arr: any[]) => {
  return arr
           .map(value => ({ value, sort: Math.random() }))
           .sort((a,b) => a.sort - b.sort)
           .map(({value}) => value)
}

const Timer = ( { playTimeLimit, onNextStage } : TimerProps ) => {
  const [timeLimit, setTimeLimit] = useState(playTimeLimit ?? 0)
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLimit((prev: number) => prev -1)
    }, 1000)
    if (timeLimit === 0) {
      onNextStage()
    }
    return () => clearInterval(timer)
  })
  return (
    <div>
      Time Limit : {timeLimit}
    </div>
  )
}

const HitArea = ( { onSetHit, rounds, onNextStage }: HitAreaProps) => {
  const [currentRound, setCurrentRound] = useState(0)
  const TargetButton = ({onExecute, label, isTarget} : TargetButtonProps) => {
    return (
      <button className={`w-32 h-32 border rounded-md bg-${isTarget ? "rose" : "sky"}-300`} type="button" onClick={() => onExecute ? onExecute() : ""}>{label}</button>
    )
  }

  const onSetHitWithRoundUp = () => {
    onSetHit((prev:number) => prev +1)
    setCurrentRound((prev: number) => prev + 1)
  }

  const onSetRoundUp = () => {
    setCurrentRound((prev: number) => prev + 1)
  }
  useEffect(() => {
    if (rounds === currentRound) {
      onNextStage()
    }
  })
  return (
    <div>
      CurrentRound : {currentRound + 1} <br/> 
      RemaindRound : {-(currentRound - rounds)} <br/>
      <div className="flex justify-center flex-wrap w-[16rem] h-[16rem]">
        {
          shuffleArray([
            <TargetButton key="1" onExecute={ onSetHitWithRoundUp } isTarget={true} />,
            <TargetButton key="2" onExecute={ onSetRoundUp } />,
            <TargetButton key="3" onExecute={ onSetRoundUp } />,
            <TargetButton key="4" onExecute={ onSetRoundUp } />,
          ]).map(button => {
            return (button)
          })
        }
      </div>
    </div>
  )
}

const GameStage = ({ onNextStage, onSetHit, rounds, playTimeLimit } : GameStageProps) => {
  return (
    <div className="flex justify-center flex-col items-center gap-4">
      <div>
        <Timer playTimeLimit={playTimeLimit} onNextStage={onNextStage} />
        <HitArea onSetHit={onSetHit} rounds={rounds} onNextStage={onNextStage} />
      </div>
      <div className="bg-sky-300"></div>
    </div>
  )
}

const ResultStage = ({ onNextStage, rounds, hit, onReset } : ResultStageProps) => {
  const onResetGame = () => {
    onReset()
    onNextStage()
  }
  return (
    <div>
      {`${hit}hit of total ${rounds} rounds`}
      <button className="border px-2 py-1 rounded-sm " type="button" onClick={() => onResetGame() }>next</button>
    </div>
  )
}

const GameArea = () => {
  const [stage, setStage] = useState(1)
  const [hit, setHit] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [playTimeLimit, setTimeLimit] = useState(0)
  const nextStage = () => {
    setStage((prev) => prev >= 3 ? 1 : prev + 1)
  }

  const onSetRounds = (fixedRounds: number) => {
    setRounds(fixedRounds)
  }
  const onSetTimeLimit = (fixedTimeLimit: number) => {
    setTimeLimit(fixedTimeLimit)
  }
  const onReset = () => {
    setHit(0)
    setRounds(0)
    setTimeLimit(0)
  }
  return (
    <div>
      <div className="flex gap-2 flex-col">
        <div>
          stage    : {stage}
        </div>
        <div>
          hit      : {hit}
        </div>
        <div>
          rounds : {rounds}
        </div>
        <div>
          playTimeLimit : {playTimeLimit}
        </div>
        <hr/>
        <br/>
      </div>
      {
        stage === 2 ? <GameStage onNextStage={nextStage} onSetHit={setHit} rounds={rounds} playTimeLimit={playTimeLimit} /> : 
        stage === 3 ? <ResultStage onNextStage={nextStage} rounds={rounds} hit={hit}  onReset={onReset}  /> : 
                     <ConditionStage onNextStage={nextStage} onSetRounds={onSetRounds} onSetTimeLimit={onSetTimeLimit} />
      }
    </div>
  )
}

export default GameArea
