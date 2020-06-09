import React from 'react'
import {Link} from 'react-router-dom'

function DemoGraphicView() {
    return (
        <div className="tested">
            <h2>Demographic Views</h2>
            <Link to="/comparison" style={getStyle}><p className="text text-danger">State Wise Comparison</p></Link>
            <Link to="/twenty" style={getStyle}><p className="text text-danger">Last 20 Days</p></Link>
        </div>
    )
}
const getStyle = {
    cursor : 'pointer',
    textDecoration:'none'
}

export default DemoGraphicView
