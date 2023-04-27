import React, { useEffect, useState } from 'react'
import useSound from "use-sound";
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";



const Trivia = ({data,  setQuestionNumber, setStop, questionNumber, setShow,   }) => {

  const [question, setQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [className, setClassName] = useState("answer");
    const [letsPlay] = useSound(play);
    const [correctAnswer] = useSound(correct);
    const [wrongAnswer] = useSound(wrong);
    
   const[ disabled, setDisabled] = useState(false);
   const [disapper, setDisapper] = useState(true);
   const[ disabledBut, setDisabledBut] = useState(false);
   const [answerToShow, setAnswerToShow] = useState("");

    useEffect(() => {
      letsPlay();
    }, [letsPlay]);

    useEffect(()=> {
      let mySet = new Set([]);
        
      while (mySet.size < 15) {
        let randomNumber = Math.floor(Math.random() * 31) + 1;
  mySet.add(randomNumber);
}       
for (let element of mySet) {
        setQuestion(data[element]);
}
    }, [data, questionNumber]);


    const delay = (duration, callback) => {
            setTimeout(()=>  {
                callback();
            }, duration);
    }

    const handle50_50 = () => {
        setDisabled(true);
        const answerIndex = question.answers.findIndex((answer)=> {
          return answer.correct === true;
        })

        const otherAnswerIndex = (answerIndex + Math.floor(Math.random() * 3) + 1) % 4;
        
       const newAnswers = [
            question.answers[otherAnswerIndex],
            question.answers[answerIndex]

       ]

       setQuestion({...question, answers: newAnswers})
   
      }

      const call = () => {
        setDisabledBut(true);
        const Answer = [  "A", "B", "C", "D" ];
        const randomNum = Math.floor(Math.random() * 4);

        setAnswerToShow(`I think the answer is ${Answer[randomNum]}`);
         
        
        setTimeout(()=> {
          setDisapper(false)
      }, 4000)


      }

    const handleClick = (a)=>{

           setSelectedAnswer(a);
           setClassName("answer active");
            delay(2000, () => setClassName(a.correct ? "answer correct" : "answer wrong"));
           delay(4000, () => {
                if(a.correct && questionNumber < 16){
                  correctAnswer();
                  delay(1000, ()=> {
                    setQuestionNumber((prev) => prev + 1);
                    setSelectedAnswer(null);
                  })
                 
                }
               
                
                  else if ( questionNumber > 15 ){
                    
                  
                    setStop(true);
                    
                    
                    setShow(true);
                   
                  }
                else{
                  wrongAnswer();
                  delay(1000, ()=> {
                    setStop(true);
                    setShow(true);
                  })
                 
                }
           })
    }

  return (
    <div className='trivia'>
      <div className="lifelines">
                 
                 <button className= 'fifty-50'disabled= {disabled} onClick={handle50_50}>50-50</button>
                 <button disabled= {disabledBut} onClick={call} class="circle-button"><img src="https://i.ibb.co/QmZV3Vr/phone-dial-icon-20.png" alt ="Dial a friend"/></button>
                 <div>{disapper && <h4>{answerToShow}</h4>}</div>
          </div>
        <div className='question'> {question?.question} </div>
          <div className='answers' >
            {question?.answers.map( (a)=> (
                
                <div className= {selectedAnswer === a ? className : "answer"} onClick={()=> handleClick(a)}>
                  {a.text}
            </div>

            ))}
            
            
        </div>
    </div>
  )
}

export default Trivia