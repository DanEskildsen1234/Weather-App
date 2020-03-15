import React, { Component } from 'react';
import DataCard from '../../components/Datacard';

export default class WeekView extends Component {

    state = {
        allData:[],
        currentTime:[],
        // todo local area
        city:'København'
    }

    componentDidMount = () => {    
        const { reading } = this.props    
        this.setState({
            allData: reading.allData,
            currentTime: reading.currentTime
        })
                document.getElementById("cityTitle").innerHTML = this.state.allData.city.name
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
                {this.dataCards()}     
            </div>
            </div>
        );
    }
}

