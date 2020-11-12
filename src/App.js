import React from 'react';
import './App.css';
const api={
  key: "03a9bb44a700d09737ee77a8848c9558",
  base: "http://api.openweathermap.org/data/2.5/weather"
}
export default class App extends React.Component {

state={
  temp:""
}


 getWeather=(e)=>{
   e.preventDefault()
   const {city, country}=e.target
     fetch(`${api.base}?q=${city.value},${country.value}&units=metric&appid=${api.key}`)
       .then(res => res.json())
       .then(res => this.setState({
         temp: res.main.temp
       }))
  }
  render(){
  return (
    <div className="App">
       <form onSubmit={this.getWeather}>
         <label htmlFor="city"></label>
         <input type="text" name="city" placeholder="City"/>
         <label htmlFor="country"></label>
         <input type="text" name="country" placeholder="Country"/>
         <button type="submit">Get Weather</button>
       </form>
      <p>weather:{this.state.temp}</p>
    </div>
  );
}
}


