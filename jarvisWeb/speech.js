//elements
const  startBtn = document.querySelector("#start");
const  stopBtn = document.querySelector("#stop");
// const  speakBtn = document.querySelector("#speak");

// jarvis setup
if (localStorage.getItem("jarvis_setup")!== null){
    // weather()
}
// jarvis information set up
const setup = document.querySelector(".jarvis_setup")
setup.style.display="none"
if (localStorage.getItem("jarvis_setup") === null){
    setup.style.display="block"
    setup.querySelector("button").addEventListener("click", userInfo)
}
// userinfo function
function userInfo(){
    let setupInfo = {
        name: setup.querySelectorAll("input")[0].value,
        github: setup.querySelectorAll("input")[1].value,
        }

        let testArr=[]
        setup.querySelectorAll("input").forEach((e)=>{
            testArr.push(e.value)
        })
        if(testArr.includes("")){
            readOut("sir enter your complete infomation")
        }
        else{
            localStorage.clear()
            localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo))
            setup.style.display="none"

            // weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
        }
        
    }
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
}

// some kind of example to see if it works
// speakBtn.addEventListener("click", ()=>{
//     readOut("hello bro")
// })}

// window.onload = function(){
//     readOut("    ");
// };
// =======


// // date and time
// let date = new Date();
// let hrs = date.getHours();
// let mins = date.getMinutes();
// let secs = date.getSeconds();

// function formatAMPM(date) {
//     var hours = date.getHours();
//     var minutes = date.getMinutes();
//     var ampm = hours >= 12 ? 'pm' : 'am';
//     hours = hours % 12;
//     hours = hours ? hours : 12; // the hour '0' should be '12'
//     minutes = minutes < 10 ? '0'+minutes : minutes;
//     var strTime = hours + ':' + minutes + ' ' + ampm;
//     currentTime = strTime
//     time.textContent = strTime
//   }

//   formatAMPM(date)
//   setInterval(() => {
//     formatAMPM(date)
//   }, 60000);

//   // auto friday

//   function autoJarvis() {
//     setTimeout(() => {
//       recognition.start();
//     }, 1000);
//   }
  // battery
  let batteryPromise = navigator.getBattery();
  batteryPromise.then(batteryCallback);

  // internet connectivity

    if(navigator.onLine){
      document.querySelector("#internet").textContent = "online"
      connectivity = "online"
    } else {
      document.querySelector("#internet").textContent = "offline"
      connectivity = "offline"
    }

  setInterval(() => {
    if(navigator.onLine){
      document.querySelector("#internet").textContent = "online"
      connectivity = "online"
    } else {
      document.querySelector("#internet").textContent = "offline"
      connectivity = "offline"
    }
  }, 60000);

  function batteryCallback(batteryObject) {
    printBatteryStatus(batteryObject);
    setInterval(() => {
      printBatteryStatus(batteryObject);
    }, 5000);
  }
  function printBatteryStatus(batteryObject) {
    document.querySelector("#battery").textContent = `${
      (batteryObject.level * 100).toFixed(2)
    }%`;
    charge = batteryObject.level * 100
    if (batteryObject.charging === true) {
      document.querySelector("#battery").textContent = `${
        (batteryObject.level * 100).toFixed(2)
      }% Charging`;
      chargeStatus = "plugged in"
    }
  }