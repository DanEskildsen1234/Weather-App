import React, { Component } from 'react';
import apiConfig from '../../ApiKey';
import DataCard from '../../components/Datacard';

export default class DayView extends Component {

    state = {
        allData:[],
        currentDay:[],
        // todo local area
        city:'København'
    }

    componentDidMount = () => {        
        const city = this.state.city
        const weekURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=da&APPID=${apiConfig.apiKey}`
        fetch(weekURL)
            .then(res => res.json())
            .then(wdata => {
                // 
                // todo fix
                const currentDayTable = wdata.list.filter(reading => new Date(reading.dt_txt).getHours())


                this.setState({
                    allData: wdata,
                    currentDay: currentDayTable
                }, () => console.log(this.state))

                document.getElementById("cityTitle").innerHTML = this.state.allData.city.name
            })  
    }

    dataCards = () => {
        return this.state.currentDay.map((reading, index) => <DataCard reading={reading} key={index} />)
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
            <h1 className="display-4 jumbotron">Dagens vejr</h1>
                <input type="text" id="searchCity" placeholder={" " /*+ this.state.city*/} onChange={this.handleInputChange}/>
                <button onClick={this.handleSubmit}>Find</button>
            <hr />
        <h5 id="cityTitle" className="display-5 text-muted">{}</h5>
            <div className="row justify-content-center">     
                {this.dataCards()}
            </div>
            </div>
        );
    }
}

