//elements
const  startBtn = document.querySelector("#start");
const  stopBtn = document.querySelector("#stop");
const  speakBtn = document.querySelector("#speak");

// weather setup
function weather(location) {
    const weatherCont = document.querySelector(".temp").querySelectorAll("*");
// si to kon n better weather api ek ki don so ben icon si to cav change api la (AipId=359de5c3bc8174d9c1a8d40311ce2425)
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=359de5c3bc8174d9c1a8d40311ce2425`;
    const xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onload = function () {
      if (this.status === 200) {
        let data = JSON.parse(this.responseText);
        weatherCont[0].textContent = `Location : ${data.name}`;
        weatherCont[1].textContent = `Country : ${data.sys.country}`;
        weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
        weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
        weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        weatherCont[5].textContent = `Original Temperature : ${ktc(
          data.main.temp
        )}`;
        weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
        weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
        weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
        weatherStatement = `sir the weather in ${data.name} is ${
          data.weather[0].description
        } and the temperature feels like ${ktc(data.main.feels_like)}`;
      } else {
        weatherCont[0].textContent = "Weather Info Not Found";
      }
    };

    xhr.send();
  };

  // convert kelvin to celcius
  function ktc(k) {
    k = k - 273.15;
    return k.toFixed(2);
  }
//   calling weather function
// weather("Mauritius")

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
        location: setup.querySelectorAll("input")[1].value,
        github: setup.querySelectorAll("input")[2].value,
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
            weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
        }
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
    /*
    please don't remove this code
    !important
    */
    if (transcript.includes("open youtube")||transcript.includes("youtube")){
        readOut("opening youtube")
        // (method) open(url?: string | URL
        window.open("https://www.youtube.com/",'_blank');
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
    if(transcript.includes("open github")){
        readOut("opening github")
        window.open("https://github.com/")
    }
    // n ti problem ici..... c zis ki quand to p dir li ouver to github profile li pa p fr li....sey n cout toii to geT si li p marC
    if(transcript.include("open my github profile")){
        readOut("Opening your github profile")
        window.open(`https://github.com/${JSON.parse(userdata).github}`)
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