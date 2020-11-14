import React, { Component } from 'react'
import "./SearchForm.css"

export default class SearchForm extends Component {
    render() {
        return (
            <form onSubmit={this.props.getWeather}>
                <label htmlFor="city"></label>
                <input type="text" name="city" placeholder="City" required/>
                <label htmlFor="country"></label>
                <input type="text" name="country" placeholder="Country"/>
                <button type="submit">Get Weather</button>
            </form>
        )
    }
}
