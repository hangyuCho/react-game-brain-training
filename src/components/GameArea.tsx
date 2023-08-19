import { useState } from "react"

const ConditionStage = ({ onNextStage } : ConditionStageProps) => {
  return (
    <div className="flex justify-center flex-col">
      <div className="flex gap-4 justify-center">
        <div className="flex gap-4">
          <span>Game Time</span>
          <input type="number" className="border" />
        </div>
        <div className="flex gap-4">
          <span>Time Limit</span>
          <input type="number" className="border" />
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



const GameStage = ({ onNextStage } : GameStageProps) => {



  return (
    <div>
      <div className="flex justify-center">
        {
          shuffleArray([
            <button className="w-64 h-64 border bg-rose-300 rounded-md" type="button">1</button>,
            <button className="w-64 h-64 border bg-rose-300 rounded-md" type="button">2</button>,
            <button className="w-64 h-64 border bg-rose-300 rounded-md" type="button">3</button>,
            <button className="w-64 h-64 border bg-rose-300 rounded-md" type="button">4</button>,
          ]).map(button => {
            return (button)
          })
        }
      </div>
      <button className="border px-2 py-1 rounded-sm " type="button" onClick={() => onNextStage() }>next</button>
    </div>
  )
}

const ResultStage = ({ onNextStage } : ResultStageProps) => {
  return (
    <div>
      ResultStage
      <button className="border px-2 py-1 rounded-sm " type="button" onClick={() => onNextStage() }>next</button>
    </div>
  )
}

interface BaseStageProps {
  onNextStage: () => void
}
interface GameStageProps extends BaseStageProps { }
interface ResultStageProps extends BaseStageProps { }
interface ConditionStageProps extends BaseStageProps { }

const GameArea = () => {
  const [stage, setStage] = useState(2)
  const nextStage = () => {
    setStage(stage > 3 ? 1 : stage + 1)
  }
  return (
    <div>
      {
        stage == 2 ? <GameStage onNextStage={nextStage} /> : 
        stage == 3 ? <ResultStage onNextStage={nextStage} /> : 
                     <ConditionStage onNextStage={nextStage} />
      }
    </div>
  )
}

export default GameArea
