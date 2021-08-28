import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import {Link} from 'react-router-dom';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class HistoryGraph extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
            type: 'column'
        }

    }
    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        // const res = await fetch('https://api.covid19india.org/data.json');
        const res = await fetch('https://data.covid19india.org/data.json');
        const data = await res.json();

        let result = data["cases_time_series"];
        let length = result.length;
        console.log(length);

        result = result.splice(0, length);
        console.log(result);

        this.setState({
            data: [...result]

        })

    }

    getChart = () => {
        return this.state.data.map(elem => {
            return {
                label: elem.date,
                y: parseInt(elem.dailyconfirmed)
            }
        })
    }
    getChart1 = () => {
        return this.state.data.map(elem => {
            return {
                label: elem.date,
                y: parseInt(elem.dailydeceased)
            }
        })
    }

    getChart3 = () => {
        return this.state.data.map(elem => {
            return {
                label: elem.date,
                y: parseInt(elem.dailyrecovered)
            }
        })
    }

    render() {
        const options = {
            backgroundColor: "#ffe3e3",
            title: {
                text: "Confirmed Cases"
            },
            height: 500,
            axisY: {
                title: "Confirmed Cases",

            },
            data: [{
                type: "column",
                color: 'red',
                dataPoints: this.getChart()
            }]
        }
        const options1 = {
            height: 500,
            backgroundColor: "#e3e3e3",
            title: {
                text: "Deceased"
            },
            axisY: {
                title: "Deaths",

            },
            data: [{
                type: "column",
                color: "grey",
                dataPoints: this.getChart1()
            }]
        }

        const options3 = {
            height: 500,
            backgroundColor: 'rgb(220, 255, 170)',
            title: {
                text: "Recovered"
            },
            axisY: {
                title: "Recovered",

            },
            data: [{
                type: "column",
                color: 'green',
                dataPoints: this.getChart3()
            }]
        }


        const optionsOne = {
            backgroundColor: "#ffe3e3",
            theme: "light2",
            title: {
                text: "Confirmed Cases"
            },
            axisY: {
                title: "Number of cases",
            },
            data: [{
                type: "line",
                color: 'red',
                xValueFormatString: "MMM YYYY",
                dataPoints: this.getChart()
            }]
        }
        const optionsTwo = {
            backgroundColor: "#e3e3e3",
            theme: "light2",
            title: {
                text: "Deaths"
            },
            axisY: {
                title: "Number of cases",
            },
            data: [{
                type: "line",
                color: 'grey',
                xValueFormatString: "MMM YYYY",
                dataPoints: this.getChart1()
            }]
        }
        const optionsThree = {
            backgroundColor: 'rgb(220, 255, 170)',
            theme: "light2",
            title: {
                text: "Recovered Cases"
            },
            axisY: {
                title: "Number of cases",
            },
            data: [{
                type: "line",
                color: 'green',
                xValueFormatString: "MMM YYYY",
                dataPoints: this.getChart3()
            }]
        }

        return (
            <div style={wrapperStyle}>
                <h2 className="header">From Starting</h2>
                <Link style={linkStyle} to="/"><button className="home-btn" style={getStyle}>HOME</button></Link>
                {this.state.type === 'column' ? <div>
                    <button onClick={() => this.setState({ type: '' })} className="home-btn" style={getStyle}>Line View</button>
                    <CanvasJSChart
                        options={options}
                    />
                    <br/>
                    <br/>
                    <CanvasJSChart
                        options={options1}
                    />
                    <br />
                    <br />
                    <CanvasJSChart
                        options={options3}
                    />
                </div> : <div>
                        <button onClick={() => this.setState({ type: 'column' })} className="home-btn" style={getStyle}>Chart View</button>
                        <CanvasJSChart
                            options={optionsOne}
                        />
                        <br />
                        <br />

                        <CanvasJSChart
                            options={optionsTwo}
                        />
                        <br />
                        <br />
                        <CanvasJSChart
                            options={optionsThree}
                        />
                    </div>}
            </div>
        );
    }
}
const linkStyle = {
    textDecoration:'none'
}
const getStyle = {
    boxShadow : 'none',
    backgroundColor : 'rgb(255, 230, 208)',
    border:'2px solid salmon',
    marginTop:'10px',
    marginBottom:'10px',
}
const wrapperStyle = {
    backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
    width:'100%',
    position:'absolute',
    top:0
  }
export default HistoryGraph;