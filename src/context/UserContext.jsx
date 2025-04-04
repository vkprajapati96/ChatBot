import React, { createContext, useState } from "react";
import { run } from "../gemini";

export const DataContext = createContext();

function UserContext({ children }) {
const [speaking, setSpeaking] = useState(false)
const [prompt, setPrompt] = useState("Listening...")
const [response, setResponse] = useState(false)


    // speak function
//   function speak(text) {
//     let text_speak = new SpeechSynthesisUtterance(text);
//     text_speak.volume = 1;
//     text_speak.rate = 1;
//     text_speak.pitch = 1;
//     text_speak.lang = "hi-GB";
//     window.speechSynthesis.speak(text_speak);
  
// }


function speak(text) {
    // console.log("Speaking:", text);
    
    if (window.speechSynthesis.speaking) {
      console.warn("SpeechSynthesis is already speaking. Stopping...");
      window.speechSynthesis.cancel();
    }
  
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.volume = 1;
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.lang = "hi-GB";
  
    window.speechSynthesis.speak(text_speak);
  }
    


async function aiResponse(prompt){
    let text = await run(prompt)
    // let text = await run(prompt.split("Pain"))&&prompt.split("pain")
    let newText=text.split("**")&&text.split("*")&&text.replace("google","vishal")&&text.replace("Google","vishal")
    setPrompt(newText)
    speak(newText)
    setResponse(true)
    setTimeout(()=>{
      setSpeaking(false)
    },3000)

}





// to speak from any browser

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = null;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.continuous = false;

  recognition.onresult = (e) => {
    let currentIndex =e.resultIndex
    let transcript =e.results[currentIndex][0].transcript
    // console.log(transcript)
    setPrompt(transcript)
    // aiResponse(transcript)
    takeCommand(transcript.toLowerCase())
  };

  recognition.onerror = (event) => {
    console.error("Speech Recognition Error:", event.error);
  };
} else {
  console.error("Speech Recognition is not supported in this browser.");
}



// for open the app


function takeCommand(command){

  if (command.includes("open") && command.includes("youtube")) {
    window.open("https://www.youtube.com/", "_blank");
    speak("Opening YouTube");
    setPrompt("Opening YouTube");
} else if (command.includes("open") && command.includes("google")) {
    window.open("https://www.google.com/", "_blank");
    speak("Opening Google");
    setPrompt("Opening Google");
} else if (command.includes("open") && command.includes("facebook")) {
    window.open("https://www.facebook.com/", "_blank");
    speak("Opening Facebook");
    setPrompt("Opening Facebook");
} else if (command.includes("open") && command.includes("twitter")) {
    window.open("https://www.twitter.com/", "_blank");
    speak("Opening Twitter");
    setPrompt("Opening Twitter");
} else if (command.includes("open") && command.includes("instagram")) {
  window.open("https://www.instagram.com/", "_blank");
  speak("Opening Instagram");
  setPrompt("Opening Instagram");
}
else{
    aiResponse(command)
  }

}



let value = {
  recognition,
  speak,
  speaking, 
  setSpeaking,
  prompt,
  setPrompt ,
  response,
  setResponse
};


  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export default UserContext;
