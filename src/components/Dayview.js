import React, { Component } from 'react';
import 'moment/locale/da';
import 'moment-timezone';
var moment = require('moment');

export default class DayView extends Component {

    render() {
        const { reading } = this.props
        const readingDate = new Date()
        // converting to ms
        readingDate.setTime(reading.dt * 1000)
        // owfonts icons, 5x = size
        const imgURL = `owf owf-${reading.weather[0].id} owf-4x`

        return(
            <div className="col-sm">
                <div className="card">
                    <div className="card-body">
                        <h3 className="card-title">{moment(readingDate).format('dddd')}</h3>
                        <p className="text-muted">{moment(readingDate).format('Do MMM, LT')}</p>
                        <i className={imgURL} />
                        <h4>{Math.round(reading.main.temp)} °C</h4>                        
                        <p className="card-text">{reading.weather[0].description}</p>
                    </div>
                </div>
            </div>
        );
    }
}