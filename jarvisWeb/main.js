//elements
const  startBtn = document.querySelector("#start");
const  stopBtn = document.querySelector("#stop");
const  speakBtn = document.querySelector("#speak");


//speech recongnition setup
let SpeechRecognition = window.speechRecognition || window.webkitSpeechRecognition;
// console.log(new SpeechRecognition());
let recognition = new SpeechRecognition()
// start
recognition.onstart = function() {
    console.log('Voice is activated');
};
startBtn.addEventListener("click", ()=>{
    recognition.start()
})

//result
recognition.onresult = function(event){
    // console.log(event)
    let current = event.resultIndex;
    let transcript = event.results[current][0].transcript;
    transcript=transcript.toLowerCase();
    console.log(`words ${transcript}`)
    // readOut(transcript)
    if (transcript.includes("hi jarvis")||transcript.includes("hello jarvis")||transcript.includes("hey jarvis")||transcript.includes("jarvis")||transcript.includes("hi")||transcript.includes("hello")||transcript.includes("hey")||transcript.includes("hi jarvis how are you")||transcript.includes("hello jarvis how are you")||transcript.includes("hey jarvis how are you")||transcript.includes("jarvis how are you")){
        readOut("hello bro")
    }
    /*
    please don't remove this code
    !important
    */
    if (transcript.includes("open youtube")||transcript.includes("youtube")){
        readOut("opening youtube")
        // (method) open(url?: string | URL 
        window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ",'_blank');
    }
    if (transcript.includes(`search`)){
        let search = transcript.replace("search", "")
        readOut(`searching ${search}`)
        // search = search.replace(" ", "+")
        window.open('https://www.google.com/search?q=' + search,'_blank');
    }
    if (transcript.includes("play")){
        let search = transcript.replace("play", "")
        readOut(`playing ${search}`)
        window.open('https://www.youtube.com/results?search_query=' + search,'_blank');
    }

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
    let speech = new SpeechSynthesisUtterance();
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
    readOut("hello bro")
})

// window.onload = function(){
//     readOut("    ");
// };