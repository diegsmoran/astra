import React from "react";

import Form from "./components/Form";
import Weather from "./components/Weather";

const API_KEY = "14b4408d5d27a0fb943cf240f59c0371";
// const n = new Date();
// const y = n.getFullYear();
// const m = getMonth() + 1;
// const d = n.getDate();

// Array of day names
// var dayNames = new Array("Sunday","Monday","Tuesday","Wednesday",
// 				"Thursday","Friday","Saturday");

// // Array of month Names
// var monthNames = new Array(
// "January","February","March","April","May","June","July",
// "August","September","October","November","December");


// var now = new Date();
// document.write(dayNames[now.getDay()] + "\n " + 
// monthNames[now.getMonth()] + " " + 
// now.getDate() + ", " + now.getFullYear());

class App extends React.Component {
  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }
  getWeather = async (e) => {
    e.preventDefault();
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
    const data = await api_call.json();
    
    if (city && country) {
      
      const temp = data.main.temp;
      this.setState({
        temperature: ((temp) * 1.8 + 32).toFixed(0) + "%",
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        error: ""
      });
    }

    else {
      this.setState ({
        temperature: undefined,
        city: undefined,
        country: undefined,
        humidity: undefined,
        description: undefined,
        error: "Please enter a valid location."
      });
    }
  }

  render() {
    return (

        <div className="grid-container">
      <div className="text"><div id="head"></div><div className="astra">Astra</div><div className="weather">Weather</div>
      <p id="paragraph">
        Find your weather wherever you are and whenever you are! Prepare for your day accordingly with astra weather.
      </p>
      </div>
      <div className="info-container">
          <Form getWeather={this.getWeather} />
          <Weather 
            temperature={this.state.temperature} 
            humidity={this.state.humidity}
            city={this.state.city}
            country={this.state.country}
            description={this.state.description}
            error={this.state.error}
          />
      </div>
      <div className="get-started"><a href="https://openweathermap.org/api"><button id="explore">See OpenWeather's API</button></a></div>
      
      </div>

    );
  }
};

export default App;