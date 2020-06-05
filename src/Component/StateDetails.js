import React, { Component } from 'react'
import IndividualDistrict from './IndividualDistricts';
import {Link} from 'react-router-dom';

class StateDetails extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.getData()
    }

    getData = async () => {
        const res = await fetch('https://api.covid19india.org/state_district_wise.json');
        const data = await res.json();

        let result = [];

        for (var i in data) {
            let districtResult = [];
            for (var j in data[i]["districtData"]) {
                districtResult.push({
                    districtName: j,
                    districtDetails: data[i]["districtData"][j]
                })
            }
            result.push({
                stateName: i,
                statecode: data[i]["statecode"],
                details: [...districtResult]
            })
        }
        const finalResult = result.filter(elem => elem.statecode === this.props.match.params.code);

        this.setState({
            data: [...finalResult]
        })

    }



    render() {


        return (
            <div className="wrapper">
                {this.state.data.map(elem => (
                    <div>
                        <p className="state-name">{elem.stateName.toUpperCase()}</p>
                        <Link style={linkStyle} to="/"><button className="home-btn">HOME</button></Link>

                        <IndividualDistrict districts={elem.details} />

                    </div>
                )
                )}
            </div>
        )
    }
}
const linkStyle = {
    textDecoration:'none'
}

export default StateDetails
