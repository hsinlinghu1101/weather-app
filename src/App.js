import React from 'react';
import './App.css';
const api={
  key: "03a9bb44a700d09737ee77a8848c9558",
  base: "http://api.openweathermap.org/data/2.5/weather"
}
let date= new Date()
export default class App extends React.Component {

state={
  isSubmit:false,
  isCelsius:true,
  result:{},
  temp:[],
  error:null,
  isValid:true
}


getWeather=(e)=>{
  e.preventDefault();
  const {city, country}=e.target
  fetch(`${api.base}?q=${city.value},${country.value}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(res => this.setState({
        isCelsius:true,
        result:res,
        temp: [Math.round(res.main.temp), Math.round(res.main.temp_min), Math.round(res.main.temp_max)],
        isSubmit:true
      }))
      .catch(res=>{
        this.setState({
          error:res.error,
          isValid:false
        })
      })   
}

getCel=()=>{
  this.setState({
    isCelsius:true,
    temp:this.state.temp.map(e=> Math.round((e - 32) * 5/9))
  })
}
getFah=()=>{
  this.setState({
    isCelsius:false,
    temp:this.state.temp.map(e=> Math.round((e * 9/5) + 32))
  })
}

   

render(){
  
  const {result, temp, isSubmit, isCelsius, isValid, time} = this.state
  
return (
  
  <div className="App">
  <header>Weather App</header>
      <form onSubmit={this.getWeather}>
        <label htmlFor="city"></label>
        <input type="text" name="city" placeholder="City" required/>
        <label htmlFor="country"></label>
        <input type="text" name="country" placeholder="Country"/>
        <button type="submit">Get Weather</button>
      </form>
      {!isValid && <p>City not found, please try again</p>}
      {isSubmit && isValid &&
      <div>
        <h2>{result.name}, {result.sys.country}</h2>
        <img src={`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`} /> 
        <p>  {temp[0]} <button onClick={this.getCel} disabled={isCelsius}>°C</button> <button onClick={this.getFah} disabled={!isCelsius}>°F</button></p>
        <p>{temp[1]}/{temp[2]}</p>
        <p>The local time is {
          new Date(date.getTime() + (date.getTimezoneOffset() * 60000) + (3600000*(result.timezone/3600))).toLocaleString()
        }</p>
        <p>{result.weather[0].description}</p>
      </div>}
  </div>
);
}
}




