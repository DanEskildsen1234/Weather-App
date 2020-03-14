import React, { Component } from 'react';
import apiConfig from '../ApiKey';
import DayView from './Dayview';

export default class WeekView extends Component {

    state = {
        allData:[],
        currentTime:[],
        // todo local area
        city:'København'
    }

    componentDidMount = () => {        
        const city = this.state.city
        const weekURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=da&APPID=${apiConfig.apiKey}`
        fetch(weekURL)
            .then(res => res.json())
            .then(wdata => {
                const timeNow = new Date().getHours()
                // todo make dry
                const currentTimeTable = wdata.list.filter(reading => new Date(reading.dt_txt).getHours() >= timeNow && new Date(reading.dt_txt).getHours() < timeNow +3)

                this.setState({
                    allData: wdata,
                    currentTime: currentTimeTable,
                }, () => console.log(this.state))

                document.getElementById("cityTitle").innerHTML = this.state.allData.city.name
            })  
    }

    dayCards = () => {
        return this.state.currentTime.map((reading, index) => <DayView reading={reading} key={index} />)
    }

    handleInputChange = (event) => {
        // todo try-catch?
        // todo + zip, city-id convert?
        this.setState({city: event.target.value });
    }

    handleSubmit = () => {
        this.componentDidMount();
    }

    render() {
        return(
            <div className="container">
            <h1 className="display-4 jumbotron">5 dages prognose</h1>
                <input type="text" id="searchCity" placeholder={" " + this.state.city} onChange={this.handleInputChange}/>
                <button onClick={this.handleSubmit}>Find</button>
            <hr />
        <h5 id="cityTitle" className="display-5 text-muted">{}</h5>
            <div className="row justify-content-center">     
                {this.dayCards()}     
            </div>
            </div>
        );
    }
}

