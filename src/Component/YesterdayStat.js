import React, { Component } from 'react'

class YesterdayStat extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            confirmed : 0,
            recovered : 0,
            deaths : 0,
            date : ''
        }
    }

    componentDidMount(){
        this.getPrevData()
    }
    getPrevData = async () => {
        // const res = await fetch('https://api.covid19india.org/data.json');
        const res = await fetch('https://data.covid19india.org/data.json');
        const data = await res.json();

        // let result = data["cases_time_series"][data["cases_time_series"].length - 2];
        let result = data["cases_time_series"].pop();
        // console.log(result)
        let {dailyconfirmed, dailyrecovered, dailydeceased,date} = result
        this.setState({
            confirmed : dailyconfirmed,
            recovered : dailyrecovered,
            deaths : dailydeceased,
            date : date
        })

    }
    render() {
        
        return (
            <div className="prevday-card">
                <h2>Yesterday : {this.state.date}</h2>
                <p className="text text-danger">Confirmed : {this.state.confirmed}</p>
                <p className="text text-success">Recovered : {this.state.recovered}</p>
                <p className="text text-fade">Deaths : {this.state.deaths}</p>
            </div>
        )
    }
}

export default YesterdayStat
