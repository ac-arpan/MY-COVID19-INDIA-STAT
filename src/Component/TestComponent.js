import React, { Component } from 'react'

class TestComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            totalTested: 0,
            todayTested: 0,
            date: ''
        }
    }

    componentDidMount() {
        this.getPrevData()
    }
    getPrevData = async () => {
        // const res = await fetch('https://api.covid19india.org/data.json');
        const res = await fetch('https://data.covid19india.org/data.json');
        const data = await res.json();

        let testResult = data["tested"].pop();
        let { samplereportedtoday, totalsamplestested, updatetimestamp } = testResult;

        this.setState({
            totalTested: totalsamplestested,
            todayTested: samplereportedtoday,
            date: updatetimestamp
        })

    }
    render() {

        return (
            <div className="tested">
                <h2>Test Summary</h2>
                <p className="text text-success">Total Till Today : {this.state.totalTested} [+ {this.state.todayTested}] </p>
                <p><em>Updated on </em></p>
                <p><em>{this.state.date} </em></p>
            </div>
        )
    }
}

export default TestComponent
