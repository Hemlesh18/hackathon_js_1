//elements
const  startBtn = document.querySelector("#start");
const  stopBtn = document.querySelector("#stop");
const  speakBtn = document.querySelector("#speak");


//speech recongnition setup
const SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
// console.log(new SpeechRecognition());
const recognition = new SpeechRecognition()
// start
recognition.onstart = function() {
    console.log('Voice is activated');
};
startBtn.addEventListener("click", ()=>{
    recognition.start()
})

//result
recognition.onresult = function(event){
    console.log(event)
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;
    console.log(transcript)
    readOut(transcript)
};
//stop
recognition.onend = function(){
    console.log('voice is deactivated');
};
stopBtn.addEventListener("click", ()=>{
    recognition.stop()
})

// continuos
recognition.continuous = true;

// speech
function readOut(message){
    const speech = new SpeechSynthesisUtterance()
    //different voices
    const allvoice = speechSynthesis.getVoices();
    speech.voice = allvoice[1]
    speech.text = message;
    speech.volume = 1;
    window.speechSynthesis.speak(speech)
    console.log("speaking out")
}
// some kind of example to see if it works
speakBtn.addEventListener("click", ()=>{
    readOut("hello sir")
})

// window.onload = function(){
//     readOut("    ");
// };