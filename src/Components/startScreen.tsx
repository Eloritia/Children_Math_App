
import cathead from "../svg/cathead.svg"

import '../App.css';
export const StartScreen =(props:any)=>{
    return(<>
    <div className="col">
    <img src={cathead} className="Cat-image" alt="Normal" style={{display:"block"}} />
    <button onClick={props.startQuestions}>START</button>
    </div>
    </>);
}