import  { useEffect, useState } from 'react'


const Timer = ({ setStop, questionNumber, setShow}) => {
    const [timer, setTimer] = useState(15);

    useEffect(()=> {
        if(timer === 0) {
            setStop(true)
            setShow(true)
        };
        
        const interval = setInterval(()=> {
            setTimer((prev => prev - 1))
        }, 1000);
             return () => clearInterval(interval);
    }, [setStop, timer, setShow]);

        useEffect(()=> {
            
            setTimer(15)
        }, [questionNumber])
  return timer
}

export default Timer