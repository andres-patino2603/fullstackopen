import axios from 'axios'
import { useState, useEffect } from 'react'
const WeatherInfo = ({ coord, country }) => {
    const [weatherInfo, setWeatherInfo] = useState(null);
    
    useEffect(() => {
      axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${coord.latitud}&longitude=${coord.longitud}&current=temperature_2m,wind_speed_10m`).then(response => {
       const wether=response.data
        setWeatherInfo(
          {
            temperature: wether.current.temperature_2m,
            wind: wether.current.wind_speed_10m
          }
        )
      }).catch(error => {
        console.log("Error", error)
      })
    }, [coord])
    if(!weatherInfo){
      return <p>No info for charge...</p>
    }
  
    return (
      <>
      <h3>Weather in {country.name.common} </h3>
      <p>Temperature: {weatherInfo.temperature} °C</p>
      <p>Wind: {weatherInfo.wind} m/s</p>
      </>
    )
  }

export default WeatherInfo;