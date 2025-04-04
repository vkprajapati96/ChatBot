import './App.css'
import  VA from "../src/assets/ai.png"
import { FaMicrophoneAlt } from "react-icons/fa";
import { useContext } from 'react';
import { DataContext } from './context/UserContext';

import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"


 
function App() {
      let {recognition,speaking, setSpeaking,prompt,  setPrompt,
        response,setResponse}  =  useContext(DataContext)

  return (
    <div className='main'>
      <img src={VA} alt="" id='pain' />
      <span>i'm Pain , your Advanced virtual Assistant</span>

      {
        !speaking ?
        <button onClick={()=>{
          setPrompt("listening...")
          setSpeaking(true)
          setResponse(false)
          recognition.start()}}>Click Here <FaMicrophoneAlt />
        </button>
        :
        <div className='responsive'>
          {!response ?
           <img  src={speakimg} id='speak-img' alt="" /> 
          : <img  src={aigif} id='aigif'  alt="" />
          } 
         
         <p>{prompt}</p>

        </div>
  
      }

  
      
    </div>
  )
}

export default App
