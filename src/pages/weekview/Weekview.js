import React, { Component } from 'react';
import apiConfig from '../../ApiKey';
import DataCard from '../../components/Datacard';

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
                // isolating dataset instances within 3hours from current time (data gets pulled every 3h for 5d)
                // todo make dry
                try {
                    const currentTimeTable = wdata.list.filter(reading => new Date(reading.dt_txt).getHours() >= timeNow && new Date(reading.dt_txt).getHours() < timeNow +3)

                    this.setState({
                        allData: wdata,
                        currentTime: currentTimeTable
                    }, () => console.log(this.state))
                }
                catch(error) {
                    document.getElementById("errorTxt").innerHTML = "Please enter a valid city name"
                }
                document.getElementById("cityTitle").innerHTML = this.state.allData.city.name
            })  
    }

    dataCards = () => {
        return this.state.currentTime.map((reading, index) => <DataCard reading={reading} key={index} />)
    }

    handleInputChange = (event) => {
        // todo try-catch?
        // todo + zip, city-id convert?
        this.setState({city: event.target.value });
    }

    handleSubmit = () => {
        this.componentDidMount()
    }

    render() {
        return(
            <div className="container">
            <h1 className="display-4 jumbotron">5 dages prognose</h1>
                <input type="text" id="searchCity" placeholder={" " + this.state.city} onChange={this.handleInputChange}/>
                <button onClick={this.handleSubmit}>Find</button>
                <div id="errorTxt"></div>
            <hr />
            <h5 id="cityTitle" className="display-5 text-muted">{}</h5>
            <div className="row justify-content-center">     
                {this.dataCards()}     
            </div>
            </div>
        );
    }
}

