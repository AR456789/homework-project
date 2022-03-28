import React from "react";
import { useState } from "react";
import axios from 'axios';
import './App.css';

function App() {
  let [search, setSearch] = useState("");
  let [message, setMessage] = useState("");
  const [icon, setIcon] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=333d1e7c5f22cf63ff65c69aa26537e4&units=metric`;
    axios.get(url).then(showTemperature);
  }

  function updateSearch(event) {
    setSearch(event.target.value);
  }

  function showTemperature(response) {
    setMessage(
      <strong>
        City: {search}
        <br />
        Temperature: {Math.round(response.data.main.temp)}˚C
        <br />
        Description: {response.data.weather[0].description}
        <br />
        Humidity: {response.data.main.humidity} %
        <br />
        Wind: {Math.round(response.data.wind.speed)} mph
      </strong>
    );
    setIcon(
      `http://openweathermap.org/img/wn/${response.data.weather["0"].icon}@2x.png`
    );
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="type a city name"
          autoFocus={true}
          onChange={updateSearch}
        />
        <input type="submit" value="Search" />
      </form>
      <p>
        {" "}
        {message} <br /> <img src={icon} alt=""></img>{" "}
      </p>
    </div>
  );
}

export default App;
