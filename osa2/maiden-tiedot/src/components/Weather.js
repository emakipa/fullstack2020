import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({ location }) => {

  const [ weather, setWeather ] = useState([])
  const api_key = process.env.REACT_APP_API_KEY
  const query = `http://api.weatherstack.com/current?access_key=${api_key}&query=${location}`
    
  // get weather data
  useEffect(() => {
    axios
      .get(query) 
      .then(response => {
      // set weather data
        setWeather(response.data)
      })
  }, [query])

  return (
    <div>      
      <p>
        <b>temperature:</b> {weather.current ? weather.current.temperature : ''} Celsius      
      </p>
      <img src={weather.current ? weather.current.weather_icons : ''} alt='img' width="50" height="50" />     
      <p>
        <b>wind:</b> {weather.current ? weather.current.wind_speed : ''} kph direction {weather.current ? weather.current.wind_dir : ''}      
      </p>       
    </div>           
  ) 
} 

export default Weather