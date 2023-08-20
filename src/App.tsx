import './App.css';
import { GameArea } from "./components/index"

function App() {
  return (
    <div className="flex flex-col justify-between h-screen">
      <div>
        <h1 className="underline text-2xl">Brain Training Game</h1>
        <GameArea />
      </div>
      <div className="mb-6 sm:mb-0 sm:flex">
        <p>Copyright © 2023</p>
        <p className="sm:ml-4 sm:pl-4 sm:border-l sm:border-slate-200">Hangyu</p>
      </div>
    </div>
  );
}

export default App;
