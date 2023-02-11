import logo from './logo.svg';
import './App.css';





function App() {
  return ( 
<>
    <head>
<title>Weather App</title>
<script type="text/javascript" src="app.js"></script>
<link rel="stylesheet" href="index.css"></link>

</head>
<body>

    <div class ="container" id="container">
        <div class="header">Seattle Weather Report</div>

        <div class="content-small-left" id="main">
            Current Weather
            <h2 class="center" id="temp"></h2>
            <h3 class="center" id="feels"></h3>
            <h3 class="center" id="weather"></h3>
            <img id="weatherIcon" src="" alt="Icon image of current weather"></img>
        </div>

        <div class="content-small-middle" id="middle">
            Additional Weather Information
            <h3 class="center" id="tempMax"></h3>
            <h3 class="center" id="tempLow"></h3>
            <h3 class="center" id="windSpeed"></h3>
            <h3 class="center" id="humidity"></h3>
        </div>

        <div class="content-small-right" id="right">
           Average Air Pollution Levels
            <h3 class="right" id="airQ"></h3>
            <h3 class="right" id="no2"></h3>
            <h3 class="right" id="pm10"></h3>
            <h3 class="right" id="o3"></h3>   
            <h3 class="right" id="vis"></h3>  
        </div>

        <div class="footer">         
            <form id="changeLocationForm">
                <label class="change">Change Current City</label>
                <textarea id="textLocation" class="change" placeholder="New City Name Here"></textarea>
                <input type='submit' value='Change' class="change" id="change"></input>
                <div id="err" ></div>
            </form>       
        </div>

        <div class="bottom-small-right">
            <button id="darkBtn"  type="button"  >Dark mode</button>
            <button id="lightBtn"  type="button"  >Light mode</button>
            <button id="button1" class="button" >Like</button>
            <h3 id="likes">0</h3>
        </div>
    </div>
</body>

</>




  );
}
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector('#changeLocationForm').addEventListener("submit", (event) => changeLocation(event));
    renderLike();
  })
  
  let storage;
  let weatherLocation = 'Seattle'; // Starting City/default
  let lat = 47.6062; // Seattle lat
  let lon = -122.3321; // Seattle lon
  let IsDarkmode = false;
  
  function fetchWeather() {
      fetch('https://api.openweathermap.org/data/2.5/weather?q=' + weatherLocation + '&units=imperial&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
      .then(response => response.json())
      .then(data => renderWeather(data));
    }
  
    function fetchPollutionReport() {
      fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=' + lat + '&lon=' + lon + '&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
      .then(response => response.json())
      .then(data => renderPollution(data));
      
      // fetch('https://api.openweathermap.org/data/2.5/air_pollution?lat=47.6062&lon=-122.3321&appid=aac56d8ba335e529dfa836fcfbfb5d1d')
      // full api pull for Seattle. For testing and troubleshooting
    }
  
    function renderPollution(json) {
      console.log(json.list[0].main.aqi);
      storage = json
  
      let airQDiv = document.querySelector('#airQ');
      let no2Div = document.getElementById('no2');
      let pm10Div = document.getElementById('pm10');
      let o3Div = document.getElementById('o3');
      let jsonAirQualityIndex = json.list[0].main.aqi;
      let jsonNo2 = json.list[0].components.no2;
      let jsonPm10 = json.list[0].components.pm10;
      let jsono3 = json.list[0].components.o3;
     
      if (jsonAirQualityIndex === 1) {
        airQDiv.innerHTML = "Air Quality is Good";
        airQDiv.style.backgroundColor = 'green';
      }
      if (jsonAirQualityIndex === 2) {
        airQDiv.innerHTML = "Air Quality is Fair";
        airQDiv.style.backgroundColor =  '#6c0';
        }
      if (jsonAirQualityIndex === 3) {
        airQDiv.innerHTML = "Air Quality is Moderate";
        airQDiv.style.backgroundColor = '#ff0';
        }
      if (jsonAirQualityIndex === 4) {
        airQDiv.innerHTML = "Air Quality is Poor";
        airQDiv.style.backgroundColor = '#f90';
        }  
      if (jsonAirQualityIndex === 5) {
        airQDiv.innerHTML = "Air Quality is Very Poor";
        airQDiv.style.backgroundColor =  'red';
        }
      if (!jsonAirQualityIndex >= 1 && jsonAirQualityIndex <= 5) {
        airQDiv.innerHTML = "Air Quality is unavailable at this time"}
  
        no2Div.innerHTML = 'NO2 level: ' + jsonNo2 + ' μg/m3';
      if (jsonNo2 >= 0 && jsonNo2 <= 50) {
          no2Div.style.color = 'green'
        }
      if (jsonNo2 > 50 && jsonNo2 <= 100) {
          no2Div.style.color = '#6c0'
        }
      if (jsonNo2 > 100 && jsonNo2 <= 200) {
          no2Div.style.color = '#ff0'
        }
      if (jsonNo2 > 200 && jsonNo2 <= 400) {
          no2Div.style.color = '#f90'
        }
      if (jsonNo2 > 400) {
          no2Div.style.color = 'red'
        }
  
        pm10Div.innerHTML = 'pm10 level: ' + jsonPm10 + ' μg/m3';
  
      if (jsonPm10 >= 0 && jsonPm10 <= 25) {
          pm10Div.style.color = 'green'
        }
      if (jsonPm10 > 25 && jsonPm10 <= 50) {
          pm10Div.style.color = '#6c0'
        }
      if (jsonPm10 > 50 && jsonPm10 <= 90) {
          pm10Div.style.color = '#ff0'
        }
      if (jsonPm10 > 90 && jsonPm10 <= 180) {
          pm10Div.style.color = '#f90'
        }
      if (jsonPm10 > 180) {
          pm10Div.style.color = '#red'
        }
  
        o3Div.innerHTML = 'O3 level: ' + jsono3 + ' μg/m3';
      
      if (jsono3 >= 0 && jsono3 <= 60) {
        o3Div.style.color = 'green'
      }
      if (jsono3 > 60 && jsono3 <= 120) {
        o3Div.style.color = '#6c0'
      }
      if (jsono3 > 120 && jsono3 <= 180) {
        o3Div.style.color = '#ff0'
      }
      if (jsono3 > 180 && jsono3 <= 240) {
        o3Div.style.color = '#f90'
      }
      if (jsono3 > 240) {
        o3Div.style.color = 'red'
      }
    }
  
  function renderWeather(json) {
    console.log(json);
   let notify = document.getElementById("err");
   let jsonVis = json.visibility;
   let visDiv = document.getElementById('vis');
    storage = json
    weathericon = document.querySelector('#weatherIcon');
    // weathericon = document.getElementById("weatherIcon");
    jsonIcon = json.weather[0].icon;
    document.querySelector('#temp').innerHTML = Math.floor(json.main.temp) + " °F";
    document.querySelector('#weather').innerHTML = json.weather[0].description;
    weathericon.src = '/img/' + json.weather[0].icon + '.png';
    console.log(json.visibility);
  
          if (!json.main) {
          notify.innerHTML = "City not recognized, Please verify spelling or try another City";
          notify.style.display = "block"; }
          else {notify.style.display = "none";
          lat = json.coord.lat;
          lon = json.coord.lon;
          weatherLocation = json.name;
          }
  
          if (jsonVis === 10000) {
            visDiv.innerHTML = "Great Visibility";
          }
          if (jsonVis >= 8000 && jsonVis < 10000) {
            visDiv.innerHTML = "Great Visibility";
          }
          if (jsonVis >= 8000 && jsonVis < 10000) {
            visDiv.innerHTML = "Ok Visibility";
          }
          if (jsonVis >= 5000 && jsonVis < 8000) {
            visDiv.innerHTML = "Limited Visibility";
          }
          if (jsonVis >= 1000 && jsonVis < 5000) {
            visDiv.innerHTML = "Bad Visibility";
          }
          if (jsonVis < 1000) {
            visDiv.innerHTML = "Very Bad Visibility";
          }
          if (jsonIcon === '01d') {
            weathericon.alt = "Clear sky icon"
          }
          if (jsonIcon === '01n') {
            weathericon.alt = "Clear sky night icon"
          }
          if (jsonIcon === '02d') {
            weathericon.alt = "Few clouds icon"
          }
          if (jsonIcon === '02n') {
            weathericon.alt = "Few clouds night icon"
          }
          if (jsonIcon === '03d') {
            weathericon.alt = "Scattered clouds icon"
          }
          if (jsonIcon === '03n') {
            weathericon.alt = "Scattered clouds night icon"
          }
          if (jsonIcon === '04d') {
            weathericon.alt = "Broken clouds icon"
          }
          if (jsonIcon === '04n') {
            weathericon.alt = "Broken clouds night icon"
          }  
          if (jsonIcon === '09d') {
            weathericon.alt = "Shower rain icon"
          }
          if (jsonIcon === '09n') {
            weathericon.alt = "Shower rain night icon"
          }
          if (jsonIcon === '10d') {
            weathericon.alt = "Rain icon"
          }
          if (jsonIcon === '10n') {
            weathericon.alt = "Rain night icon"
          }
          if (jsonIcon === '11d') {
            weathericon.alt = "Thunderstorm icon"
          }
          if (jsonIcon === '11n') {
            weathericon.alt = "Thunderstorm night icon"
          }
          if (jsonIcon === '13d') {
            weathericon.alt = "Snow icon"
          }
          if (jsonIcon === '13n') {
            weathericon.alt = "Snow night icon"
          }
          if (jsonIcon === '50d') {
            weathericon.alt = "Mist icon"
          }
          if (jsonIcon === '50n') {
            weathericon.alt = "Mist night icon"
          }
          
          document.querySelector('#feels').innerHTML = "Feels like " + Math.floor(json.main.feels_like) + " °F";
          document.querySelector('#tempMax').innerHTML = "High Tempature of " + Math.floor(json.main.temp_max) + "  °F";
          document.querySelector('#tempLow').innerHTML = "Low Tempature of " + Math.floor(json.main.temp_min) + "  °F";
          if (json.wind.gust > 0) {
          document.querySelector('#windSpeed').innerHTML = "Average wind speed of " + Math.floor(json.wind.speed) + " mph, with gusts up to " + Math.floor(json.wind.gust) + " mph"; }
          else {document.querySelector('#windSpeed').innerHTML = "Average wind speed of " + Math.floor(json.wind.speed) + " mph." }
          document.querySelector('#humidity').innerHTML = "Humidity at " + json.main.humidity + "%";
          
          fetchPollutionReport();
          recommend();
          windAlert();
          renderDark();
          renderLight();
          
          if (IsDarkmode)
         {document.getElementById('main').style.backgroundColor = '#202020';}
        }
  
      function recommend() {
        const topBar = document.querySelector('.header')
        let temperature = storage.main.temp
        console.log(storage.main.temp)
        console.log(storage.name)
  
        if (temperature <= 32) {
          topBar.innerHTML = `${storage.name} ` + "Current Weather Report. Watch out for icy roads!";
          // main.style.backgroundColor = '#ACE3E8';
          document.getElementById('main').style.backgroundColor = '#ACE3E8';
        } if (temperature > 32 && temperature < 40) {
          topBar.innerHTML = `${storage.name} ` + "Current Weather Report. It's cold Outside!";
          // main.style.backgroundColor = '#d4d4d4';
          document.getElementById('main').style.backgroundColor = '#d4d4d4';
        } if (temperature >= 40 && temperature < 60) {
          topBar.innerHTML = `${storage.name} ` + "Current Weather Report. It's chilly outside!";
          // main.style.backgroundColor = '#d4d4d4';
          document.getElementById('main').style.backgroundColor = '#d4d4d4';
        }  if (temperature >= 60 && temperature < 68) {
          topBar.innerHTML = `${storage.name} ` + "Current Weather Report. Mild temperatures";
          // main.style.backgroundColor = '#d4d4d4';
          document.getElementById('main').style.backgroundColor = '#d4d4d4';
        } if (temperature >= 68 && temperature < 70) {
            topBar.innerHTML = `${storage.name} ` + "Current Weather Report. Mild temperatures";
            // main.style.backgroundColor = '#d4d4d4';
            document.getElementById('main').style.backgroundColor = '#d4d4d4';
        } if (temperature >= 70 && temperature < 80) {
          topBar.innerHTML = `${storage.name} ` + "Current Weather Report. Nice warm weather!";
          // main.style.backgroundColor = '#d4d4d4';
          document.getElementById('main').style.backgroundColor = '#d4d4d4';
        } if (temperature >= 80 && temperature < 90) {
          topBar.innerHTML = `${storage.name} ` + "Current Weather Report. It's hot outside!";
          // main.style.backgroundColor = '#d4d4d4';
          document.getElementById('main').style.backgroundColor = '#d4d4d4';
        } if (temperature >= 90) {
          topBar.innerHTML = `${storage.name} ` + "Current Weather Report. It's very hot outside, stay hydrated!";
          // main.style.backgroundColor = '#F73718';
          document.getElementById('main').style.backgroundColor = '#F73718';
        }
      }
  
      function windAlert() {
        if (storage.wind.speed > 40) {
          document.getElementById('middle').style.backgroundColor = '#FC342A'; // High wind speed indicator background change
        }
      }
      
      function renderDark() {
        document.getElementById('darkBtn').addEventListener("click", () => darkMode());
      }
        
      function darkMode() {
          document.getElementById('main').style.backgroundColor = '#202020';
          document.getElementById('main').style.color = 'white';
          document.getElementById('middle').style.backgroundColor = '#202020';
          document.getElementById('middle').style.color = 'white';
          document.getElementById('right').style.backgroundColor = '#202020';
          document.getElementById('right').style.color = 'white';
          document.getElementById('container').style.backgroundColor = '#202020';
          document.getElementById('textLocation').style.backgroundColor = '#202020';
          document.getElementById('textLocation').style.color = 'white';
          document.getElementById('darkBtn').style.backgroundColor = '#202020';
          document.getElementById('darkBtn').style.color = 'white';
          document.getElementById('lightBtn').style.backgroundColor = '#202020';
          document.getElementById('lightBtn').style.color = 'white';
          document.getElementById('button1').style.backgroundColor = '#202020';
          document.getElementById('button1').style.color = 'white';
          document.getElementById('airQ').style.color = 'black';
          (IsDarkmode = true)
      }
  
      function renderLight() {
          document.getElementById('lightBtn').addEventListener("click", () => lightMode());
      }
  
        function lightMode() {
          document.getElementById('main').style.backgroundColor = '#d4d4d4';
          document.getElementById('main').style.color = 'black';
          document.getElementById('middle').style.backgroundColor = '#d4d4d4';
          document.getElementById('middle').style.color = 'black';
          document.getElementById('right').style.backgroundColor = '#d4d4d4';
          document.getElementById('right').style.color = 'black';
          document.getElementById('container').style.backgroundColor = '#5F8DF0';
          document.getElementById('textLocation').style.backgroundColor = '#FFFFFF';
          document.getElementById('textLocation').style.color = 'black';
          document.getElementById('darkBtn').style.backgroundColor = '#FFFFFF';
          document.getElementById('darkBtn').style.color = 'black';
          document.getElementById('lightBtn').style.backgroundColor = '#FFFFFF';
          document.getElementById('lightBtn').style.color = 'black';
          document.getElementById('button1').style.backgroundColor = '#FFFFFF';
          document.getElementById('button1').style.color = 'black';
          (IsDarkmode = false)
      }
  
      function renderLike() {
        document.getElementById('button1').addEventListener('click', () => liker()); // Render/get likes
      }
       
      function liker() {
         let numbers = document.querySelector('#likes');
            numbers.innerHTML = parseInt(numbers.innerHTML) + 1; // Update likes to + 1
      }
  
      function changeLocation(event) {
        event.preventDefault();
        let input = event.target.textLocation.value; // Text Value 
        weatherLocation = `${input} `;
        fetchWeather();
        event.target.textLocation.value = ''; // Reset text
      }
  
    fetchWeather();
    fetchPollutionReport();

export default App;
