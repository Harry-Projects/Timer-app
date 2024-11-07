import { useEffect, useState } from 'react';
import './App.css';

function App() {

  const [count, setcount] = useState(0);
  const [timerState, settimerState] = useState(0)
  const min = 60;

  // Functions

  useEffect(() => {
    let timer;
    if (timerState === 2) {
      timer = setInterval(() => {
        setcount(prevTime => prevTime + 1);
      }, 1000);
    } else if (timerState !== 2 && count !== 0) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timerState]);

  useEffect(()=>{
    if(count < 0) setcount(0);
  },[count])


  const startTimer = () =>{
    settimerState(2);
    return;
  }
  const stopTimer = () =>{
    settimerState(1);
    return;
  }
  const resetTimer = () =>{
    settimerState(0);
    setcount(0)
    return;
  }

  return (
    <div className="Timer">
      <div className='Card'>
        <div className='Card-comps'>
          <button disabled={timerState === 2} onClick={()=>{startTimer()}}>Start</button>
          <button disabled={timerState !== 2} onClick={()=>{stopTimer()}}>Stop</button>
          <button disabled={!count && timerState !== 2} onClick={()=>{resetTimer()}}>Reset</button>
        </div>
        <div className='Card-comps'>
          {Math.floor(count / 60) < 10 ? `0${Math.floor(count / min)}`: Math.floor(count / min) } : {(count % min) < 10 ? `0${count % min}`: (count % min)}
        </div>
        <div className='Card-comps'>
          <button onClick={()=>{setcount(prev => prev+10)}} disabled={timerState !== 2}>+10s</button>
          <button onClick={()=>{setcount(prev => prev > 10 ? prev-10: prev)}} disabled={count < 10 || timerState !== 2}>-10s</button>
        </div>
      </div>
    </div>
  );
}

export default App;
