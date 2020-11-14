import React from 'react';
import './App.css';
import SearchForm from "./components/SearchForm"
const api={
  key: "03a9bb44a700d09737ee77a8848c9558",
  base: "http://api.openweathermap.org/data/2.5/weather"
}

export default class App extends React.Component {

state={
  isSubmit:false,
  isCelsius:true,
  result:{},
  temp:[],
  time:"",
  sky:"",
  error:null,
  isValid:true
}


 getWeather= (e)=>{
  e.preventDefault();
  this.setState({
    isValid:true
  })
  const {city, country}=e.target
  fetch(`${api.base}?q=${city.value},${country.value}&units=metric&appid=${api.key}`)
      .then(res => res.json())
      .then(res => this.setState({
        isCelsius:true,
        result:res,
        temp: [Math.round(res.main.temp), Math.round(res.main.temp_min), Math.round(res.main.temp_max)],
        isSubmit:true
      }))
      .then(
        this.getTime
      )
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

getTime =  () => {
  let localTime= new Date(new Date().getTime() + (new Date().getTimezoneOffset() * 60000) + (3600000*(this.state.result.timezone/3600))).toLocaleString()
  this.setState({
    time: localTime
  })
  
  
  let time= localTime.split("")
  
  if(Number(time[12]) >= 5 && time[20]==="A"){
    this.setState({
      sky:"view morning"
    }) 
  }else if ((Number(time[12]) <= 4 && time[20]==="P")|| (Number(time[13]) === 2 && time[21]==="P")){
    this.setState({
      sky:"view afternoon"
    })  
  }else if (Number(time[12]) >= 5 && Number(time[12]) <= 8 && time[20]==="P"){
    this.setState({
      sky:"view evening"
    })  
  }
  else {
    this.setState({
      sky:"view night"
    }) 
  }
};   

render(){
  
  const {result, temp, isSubmit, isCelsius, isValid, time, sky} = this.state
  
return (
  
  <div className="App">
  <header>How's the weather ?</header>
      <SearchForm getWeather={this.getWeather}/>
      {!isValid && <p>City not found, please try again</p>}
      {isSubmit && isValid &&
      <div className={sky}>
        <h2 className="city">{result.name}, {result.sys.country}</h2>
        <p>{result.weather[0].description}</p>
        <img  alt="icon" src={`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`} /> 
        <p className="current">  {temp[0]} <button className={isCelsius && "switch"} onClick={this.getCel} disabled={isCelsius}>°C</button> <button className={!isCelsius && "switch"} onClick={this.getFah} disabled={!isCelsius}>°F</button></p>
        <p className="minmax"> {temp[1]}/{temp[2]}</p>
        <p className="time">The local time is {time}</p>  
      </div>}
  </div>
);
}
}




