getLocation();
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert("Geolocation is not supported by this browser.");
        document.getElementById("body").style.filter = 'blur(0rem)';
    }
}



function showPosition(position) {
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;
    getName(latitude, longitude);
}
async function getName(latitude, longitude) {
    var access_key = '359de5c3bc8174d9c1a8d40311ce2425'
    var url = `https://api.openweathermap.org/geo/1.0/reverse?lat=` + latitude + `&lon=` + longitude + `&limit=5&appid=` + access_key;
    var res = await fetch(url);
    var data = await res.json();
    var location = data[0].name + `,` + data[0].country+`&aqi=yes`;
    fetchData(location);    
}

function findWeather() {
    var location = document.getElementById("search").value;
    fetchData(location)
}
async function fetchData(location) {
    var url = `https://api.weatherapi.com/v1/current.json?key=1c63857a8e0548f9a1a152750210909&q=` + location + `&aqi=yes`;
    var res = await fetch(url);
    var data = await res.json();
    if(res.status == 200){
        setValues(data);
    }
    else{
        var tags = document.getElementsByClassName('reset');
        for (let index = 0; index < tags.length; index++) {
            tags.item(index).innerHTML = ""
        }
        document.getElementById("name").innerHTML = "Location not Found";
    }
}
function setValues(data) {
    var setter = document.getElementById("temp_c");
    setter.innerHTML = data.current.temp_c + `&#176`;

    setter = document.querySelector("#calender");
    setter.innerHTML = data.location.localtime.split(" ")[0];
    
    setter = document.getElementById('name');
    setter.innerHTML = data.location.name;

    setter = document.getElementById("region");
    setter.innerHTML = data.location.region+`, `+data.location.country;
    setter = document.getElementById("feelslike_c");
    setter.innerHTML = "Rmp: "+data.current.feelslike_c + `&#176`;

    setter = document.getElementById("condition");
    setter.innerHTML = data.current.condition.text;

}
