import { useEffect, useMemo, useState } from 'react';
import './app.css';
import Trivia from './Component/Trivia';
import Timer from './Component/Timer';
import myGif from '../src/assets/mygif.gif';
import champion from './sounds/champion.mp3'
import {data} from "./Data"

function App({username}) {
    
   const [questionNumber, setQuestionNumber] = useState(1);
   const [stop, setStop] = useState(false);
   const [earned, setEarned] = useState("$ 0");
   const [show, setShow] = useState(true);
  const [championImage, setChampionImage] = useState(true); 
  const [isPlaying, setIsPlaying] = useState(false); 
  const championSong = useMemo(() => new Audio(champion), []);

   

  const moneyPyramid = useMemo( () =>[

      { id: 1, amount:"$ 100"},
      { id: 2, amount: "$ 200" },
        { id: 3, amount: "$ 300" },
        { id: 4, amount: "$ 500" },
        { id: 5, amount: "$ 1000" },
        { id: 6, amount: "$ 2000" },
        { id: 7, amount: "$ 4000" },
        { id: 8, amount: "$ 8000" },
        { id: 9, amount: "$ 16000" },
        { id: 10, amount: "$ 32000" },
        { id: 11, amount: "$ 64000" },
        { id: 12, amount: "$ 125000" },
        { id: 13, amount: "$ 250.000" },
        { id: 14, amount: "$ 500000" },
        { id: 15, amount: "$ 1000000" },

  ], []);

 
                            
  const tryAgain = () => {
    if (!championSong.paused) {
      championSong.pause(); 
      championSong.currentTime = 0; 
  }
   
    setQuestionNumber( 1);
    
    setShow(false);
    setEarned("$ 0");
   
    
    
  }

  useEffect(() => { 
    if (questionNumber > 1 && questionNumber < 16) {
      setEarned(moneyPyramid.find((m) => m.id === (questionNumber - 1)).amount);
      setChampionImage(false);
    } else if (questionNumber === 16) {
      setEarned("$ 1000000");
      
      setChampionImage(true); // Set championImage to true if questionNumber is 16 or greater
           championSong.play();
    } else {
      setChampionImage(false); // Set championImage to false if questionNumber is less than 16
    }
  }, [moneyPyramid, questionNumber, championSong]);
  

  
 

  return (
  <div className="app">
    <div className="main">
      {stop && show ? 
        <>
        
        
            <>
              <h1 className='endText'>{username} You Earned: {earned} </h1> 
              {championImage ?
              <>
                <img className='champion' src={myGif} alt="My GIF" />
                
                </>
                : null }
              <button className='tryAgain' onClick={tryAgain}> Play Again </button>
            </>
            
            
        </>
        :
        (
          <>
            <div className='top'>
              <div className='timer'>
                <Timer setShow={setShow} setStop={setStop} questionNumber={questionNumber}/>
              </div>
            </div>
            <div className='bottom'>
              <Trivia 
                data={data}
                setQuestionNumber={setQuestionNumber}
                setStop={setStop}
                questionNumber={questionNumber}
                setShow={setShow}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
              />
            </div>
          </>
        )
      }
    </div>
    <div className="pyramid">
      <ul className='moneyList'>
        {moneyPyramid.reverse().map((m) => (
          <li className={questionNumber === m.id ? "moneyListItem active" : "moneyListItem"}>
            <span className='moneyListItemNumber'>{m.id}</span>
            <span className='moneyListItemAmount'>{m.amount}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);
        }

export default App;
