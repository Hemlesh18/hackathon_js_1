//elements
const  startBtn = document.querySelector("#start");
const  stopBtn = document.querySelector("#stop");
const  speakBtn = document.querySelector("#speak");


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
    let userdata = localStorage.getItem("jarvis_setup")
    console.log(`words ${transcript}`)
    // readOut(transcript)
    if (transcript.includes("hi jarvis")||transcript.includes("hello jarvis")||transcript.includes("hey jarvis")||transcript.includes("jarvis")||transcript.includes("hi")||transcript.includes("hello")||transcript.includes("hey")||transcript.includes("hi jarvis how are you")||transcript.includes("hello jarvis how are you")||transcript.includes("hey jarvis how are you")||transcript.includes("jarvis how are you")){
        readOut("hello sir")
    }
    if (transcript.includes("rick")||transcript.includes("roll")||transcript.includes("rick roll")){
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
    if (transcript.includes("wiki")){
        let search = transcript.replace("wiki", "")
        readOut(`searching ${search}`)
        window.open('https://en.wikipedia.org/wiki/A/search=' + search,'_blank');
    }    
    if(transcript.includes("joke")){
        fetch("https://official-joke-api.appspot.com/random_joke")
        .then(response => response.json())
        .then(data => {
            console.log(data)
            readOut(data.setup)
            setTimeout(() => {
                readOut(data.punchline+" ha ha ha ")
            }, 3000);
        })
    }

//stop
recognition.onend = function(){
    console.log('voice is deactivated');
};
stopBtn.addEventListener("click", ()=>{
    recognition.stop()
})

// continuos
recognition.continuous = true;

// some kind of example to see if it works
speakBtn.addEventListener("click", ()=>{
    readOut("hello bro")
})}

// window.onload = function(){
//     readOut("    ");
// };