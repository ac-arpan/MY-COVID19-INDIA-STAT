import React, { Component } from "react";
import CanvasJSReact from "../canvasjs.react";
import {Link} from 'react-router-dom';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Chart extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: [],
        }

    }  
    componentDidMount() {
        this.getData()
    }
    getData = async () => {
        const res = await fetch('https://api.covid19india.org/data.json');
        const data = await res.json();

        // let result = data["statewise"].splice(1,25);
        // result = result.slice(0,20);

        let result = data["statewise"].filter(state => state.statecode !== "UN");
        result = result.sort((a, b) => Number(a.confirmed) < Number(b.confirmed) ? 1 : -1)
        result = result.splice(1, 25)
        result = result.slice(0, 20)
        
        this.setState({
            data: [...result]

        })

    }

    getChart = () => {
        return this.state.data.map(elem => {
            return {
                y: parseInt(elem.confirmed),
                label : elem.state
                }
            })
    }
    getChart1 = () => {
        return this.state.data.map(elem => {
            return {
                label : elem.state,
                 y: parseInt(elem.deaths)
                }
            })
    }
    getChart2 = () => {
        return this.state.data.map(elem => {
            return {
                label : elem.state,
                 y: parseInt(elem.active)
                }
            })
    }
    getChart3 = () => {
        return this.state.data.map(elem => {
            return {
                label : elem.state,
                 y: parseInt(elem.recovered)
                }
            })
    }
  
  render() {
    const options = {
        backgroundColor: "#ffe3e3",
        title: {
          text: "State Wise Confirmed Cases"
        },
        height:500,
        axisX: {
          title: "States",
          reversed :true
        },
        axisY: {
          title: "Confirmed Cases",

        },
        data: [{              
                  type: "bar",
                  color:'red',
                  dataPoints:this.getChart()
         }]
     }
    const options1 = {
        height:500,
        backgroundColor: "#e3e3e3",
        title: {
          text: "State Wise Deceased"
        },
        axisX: {
          title: "States",
          reversed :true
        },
        axisY: {
          title: "Deaths",

        },
        data: [{              
                  type: "bar",
                  color:"grey",
                  dataPoints:this.getChart1()
         }]
     }
    const options2 = {
        height:500,
        backgroundColor: "#e0e8ff",
        title: {
          text: "State Wise Active Cases"
        },
        axisX: {
          title: "States",
          reversed :true
        },
        axisY: {
          title: "Active Cases",

        },
        data: [{              
                  type: "bar",
                  color:'blue',
                  dataPoints:this.getChart2()
         }]
     }
    const options3 = {
        height:500,
        backgroundColor:'rgb(220, 255, 170)',
        title: {
          text: "State Wise Recovered"
        },
        axisX: {
          title: "States",
          reversed :true
        },
        axisY: {
          title: "Recovered",

        },
        data: [{              
                  type: "bar",
                  color:'green',
                  dataPoints:this.getChart3()
         }]
     }

    return (
      <div style={wrapperStyle}>
        <h2 className="header">Top 20 State's Demographic View</h2>
        <Link style={linkStyle} to="/"><button className="home-btn" style={getStyle}>HOME</button></Link>
        <CanvasJSChart
          options={options}
        />
        <br/>
        <br/>
        <CanvasJSChart
          options={options1}
        />
        <br/>
        <br/>
        <CanvasJSChart
          options={options2}
        />
        <br/>
        <br/>
        <CanvasJSChart
          options={options3}
        />
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
  marginBottom:'15px'
}
const wrapperStyle = {
  backgroundImage: 'linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%)',
  width:'100%',
  position:'absolute',
  top:0
}
export default Chart;