var OPENAI_API_KEY = "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";
var bTextToSpeechSupported = false;
var bSpeechInProgress = false;
var oSpeechRecognizer = null
var oSpeechSynthesisUtterance = null;
var oVoices = null;
var googleSearchRegex = /^search on google (.+)/i;
var youtubeRegex = /^play (music|video) (.+)/i;

function OnLoad() {
     if ("webkitSpeechRecognition" in window) {
  oSpeechRecognizer = new webkitSpeechRecognition();
  oSpeechRecognizer.continuous = false;
  oSpeechRecognizer.interimResults = false;
  oSpeechRecognizer.lang = "en-US";
  oSpeechRecognizer.onresult = function (e) {
    var sQuestion = e.results[0][0].transcript;
    txtMsg.value = sQuestion;
    Send();}

  } else {
//speech to text not supported
     lblSpeak.style.display = "none";
    }

    if ('speechSynthesis' in window) {
    bTextToSpeechSupported = true;

    speechSynthesis.onvoiceschanged = function () {
      oVoices = window.speechSynthesis.getVoices();
      for (var i = 0; i < oVoices.length; i++) {
        var oOption = document.createElement("option");
        oOption.value = oVoices[i].lang;
        oOption.text = oVoices[i].name;
      }
    };
  }
}

function ChangeLang(o) {
  if (oSpeechRecognizer) {
    oSpeechRecognizer.lang = selLang.value;
    //SpeechToText()
  }
}

function Send() {

  var sQuestion = txtMsg.value;
  if (sQuestion == "") {
    alert("Type in your question!");
    txtMsg.focus();
    return;
  }
 // check for google search command
 var googleMatch = sQuestion.match(googleSearchRegex);
 if (googleMatch) {
   var searchTerm = encodeURIComponent(googleMatch[1]);
    // in a blank tab
    window.open("https://www.google.com/search?q=" + searchTerm);
    return;
 }

 // check for youtube command
 var youtubeMatch = sQuestion.match(youtubeRegex);
 if (youtubeMatch) {
   var type = youtubeMatch[1];
   var searchTerm = encodeURIComponent(youtubeMatch[2]);
   if (type === "music") {
     // in a blank tab;
      window.open("https://www.youtube.com/results?search_query=" + searchTerm);
   } else {
    // in a blank tab
    window.open("https://www.youtube.com/results?search_query=" + searchTerm);
   }
   return;
 }
  var oHttp = new XMLHttpRequest();
  oHttp.open("POST", "https://api.openai.com/v1/completions");
  oHttp.setRequestHeader("Accept", "application/json");
  oHttp.setRequestHeader("Content-Type", "application/json");
  oHttp.setRequestHeader("Authorization", "Bearer " + OPENAI_API_KEY)

  oHttp.onreadystatechange = function () {
    if (oHttp.readyState === 4) {
      //console.log(oHttp.status);
      var oJson = {}
      if (txtOutput.value != "") txtOutput.value += "\n";

      try {
        oJson = JSON.parse(oHttp.responseText);
      } catch (ex) {
        txtOutput.value += "Error: " + ex.message
      }

      if (oJson.error && oJson.error.message) {
        txtOutput.value += "Error: " + oJson.error.message;
      } else if (oJson.choices && oJson.choices[0].text) {
        var s = oJson.choices[0].text;

        if (selLang.value != "en-US"){

          var a = s.split("?\n");
          if (a.length == 2) {
            s = a[1];
          }
        }

        if (s == "") s = "No response";
        txtOutput.value += "REPLY: " + s;
        TextToSpeech(s);
      }
    }
  };

  var sModel ="text-davinci-003";
  var iMaxTokens = 2048;
  var sUserId = "1";
  var dTemperature = 0.5;

  var data = {
    model: sModel,
    prompt: sQuestion,
    max_tokens: iMaxTokens,
    user: sUserId,
    temperature: dTemperature,
    frequency_penalty: 0.0,
    presence_penalty: 0.0, 
                               
                               
    stop: ["#", ";"]        
                               
  }

  oHttp.send(JSON.stringify(data));

  if (txtOutput.value != "") txtOutput.value += "\n";
  txtOutput.value += "Me: " + sQuestion;
  txtMsg.value = "";
}

function TextToSpeech(s) {
  if (bTextToSpeechSupported == false) return;

  oSpeechSynthesisUtterance = new SpeechSynthesisUtterance();

  if (oVoices) {
    var sVoice = "English (United States)";
    if (sVoice != "") {
      oSpeechSynthesisUtterance.voice = oVoices[parseInt(sVoice)];
    }
  }

  oSpeechSynthesisUtterance.onend = function () {
    //finished talking - can now listen
    if (oSpeechRecognizer && chkSpeak.checked) {
      oSpeechRecognizer.start();
    }
  }

  if (oSpeechRecognizer && chkSpeak.checked) {
    //do not listen to yourself when talking
    if (oSpeechRecognizer) oSpeechRecognizer.stop();
    chkSpeak.checked = false;}

  oSpeechSynthesisUtterance.lang = selLang.value;
  oSpeechSynthesisUtterance.text = s;
  //Uncaught (in promise) Error: A listener indicated an
   //asynchronous response by returning true, but the message channel closed
  window.speechSynthesis.speak(oSpeechSynthesisUtterance);
}

function SpeechToText() {

  if (oSpeechRecognizer) {

    if (chkSpeak.checked) {
          oSpeechRecognizer.start();

    } else {
      oSpeechRecognizer.stop();
    }

    return;
  }

  oSpeechRecognizer = new webkitSpeechRecognition();
  oSpeechRecognizer.continuous = true;
  oSpeechRecognizer.interimResults = true;
  oSpeechRecognizer.lang = selLang.value;
  oSpeechRecognizer.start();

  oSpeechRecognizer.onresult = function (event) {
    var interimTranscripts = "";
    for (var i = event.resultIndex; i < event.results.length; i++) {
      var transcript = event.results[i][0].transcript;

      if (event.results[i].isFinal) {
        txtMsg.value = transcript;
        Send();
      } else {
        transcript.replace("\n", "<br>");
        interimTranscripts += transcript;
      }
            if (chkSpeak.checked) {
                TextToSpeech(transcript);
            }

      var oDiv = document.getElementById("idText");
      oDiv.innerHTML = '<span style="color: #999;">' +
                              interimTranscripts + '</span>';
    }
  };

  oSpeechRecognizer.onerror = function (event) {
        console.log(event.error);

  };

}

