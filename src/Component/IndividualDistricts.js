import React, { Component } from 'react'

class IndividualDistrict extends Component {
    render() {
        const { districts } = this.props

        return (
            <div>
                {districts.map(district => (
                    <div className="district-cards">
                        <h2>{district.districtName}</h2>
                        <p className="text text-danger confirmed">Confirmed : {district.districtDetails.confirmed}[+{district.districtDetails.delta.confirmed}]</p>
                        <p className="text text-warning active">Active : {district.districtDetails.active}</p>
                        <p className="text text-success recovered">Recovered : {district.districtDetails.recovered}[+{district.districtDetails.delta.recovered}]</p>
                        <p className="text text-fade deaths">Deaths : {district.districtDetails.deceased}[+{district.districtDetails.delta.deceased}]</p>
                    </div>
                ))}
            </div>
        )
    }
}

export default IndividualDistrict
