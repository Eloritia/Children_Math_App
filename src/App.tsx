import React, { useState } from 'react';
import cat_normal from "./svg/cat_normal.svg"
import cat_happy from "./svg/cat_happy.svg"
import cat_sad from "./svg/cat_sad.svg"
import './App.css';
import { FishBackground,FishForeground } from './Components/fish';
import { StartScreen } from './Components/startScreen';

function App() {
  const [valueA, setValueA] = useState(Math.floor(Math.random()*(10-0)+0));
  const [valueB, setValueB] = useState(Math.floor(Math.random()*(10-0)+0));
  const [catState, setCatState] =useState("normal")
  const [answer,setAnswer]=useState("")
  const [points,setPoints]=useState(0);
  const [timer, setTimer]=useState(0);
  const [time, setTime]=useState(0);
  const [isOn, setIsOn]=useState(false);
  const [isPaused, setIsPaused]=useState(false);
  
  const onKeyPressed=(e:any)=>{
    if(e.keyCode===13){
      if(e.target.value==valueA+valueB){
        if(time<5000){
          setPoints(points+10);
        }
        else if(time<10000){
          setPoints(points+7)
        }
        else if(time<15000){
          setPoints(points+5)
        }
        else if(time<20000){
          setPoints(points+2)
        }
        else if(time<60000){
          setPoints(points+1)
        }
      setCatState("happy")
      setTimeout(function(){
        
        stopTimer();
        startQuestions();
      },1000)}
    else{
      setCatState("sad");
      setAnswer("");
      setTimeout(function(){
        setCatState("normal");
      },1000)
    }
    }
  }

  const startQuestions=()=>{
    setIsOn(true);
    startTimer();
    setValueA(Math.floor(Math.random()*(10-0)+0));
    setValueB(Math.floor(Math.random()*(10-0)+0));
    setAnswer("");
    setCatState("normal");
    
  }
  const pauseQuestions=()=>{
    if(!isPaused){
    stopTimer();
    setIsPaused(true);}
    else{
      setIsPaused(false);
      startQuestions();
    }
  }
  const stopQuestions=()=>{
    stopTimer();
    setAnswer("");
    setIsOn(false);
    setPoints(0);
  }
  const startTimer=()=>{
    const start=Date.now();
    setTimer(setInterval(()=>setTime(Date.now()-start)));
  }

  const stopTimer = ()=>{
    clearInterval(timer);
    setTime(0);
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <div className="row align-items-center">
          {isOn===false ? <StartScreen startQuestions={startQuestions}/> :<>
          <div className="col">
      {catState==="normal" ?
        <img src={cat_normal} className="Cat-image" alt="Normal" />:
        catState==="happy"?
        <img src={cat_happy} className="Cat-image" alt="Happy" />:
        catState==="sad"?
        <img src={cat_sad} className="Cat-image" alt="Sad" />:null}
        </div>
          <div className="col">
            <button onClick={pauseQuestions}>{isPaused ? <>Resume</> : <>Pause</>}</button><br/>
           
      {isPaused==false ? <>{valueA} + {valueB}</>:null}<br/>
       =<br/>
        <input
        type="number"
        value={answer}
        disabled={isPaused}
        onChange={(e)=>setAnswer(e.target.value)}
        onKeyDown={onKeyPressed}></input><br/>
        {Math.floor(time/1000)}<br/>
        <button onClick={stopQuestions}>Stop/Restart</button>
        </div>
        <div className="col" style={{minWidth:"300px"}}>
          <div className="Fish-image">
        <FishForeground
        points={points}
        />
            <FishBackground/>
        </div>
        </div></>}
        </div>
      </header>
    </div>
  );
}

export default App;
