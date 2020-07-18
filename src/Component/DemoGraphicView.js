import React from 'react'
import {Link} from 'react-router-dom'

function DemoGraphicView() {
    return (
        <div className="tested">
            <h2>Demographic Views</h2>
            <Link to="/comparison" style={getStyle}><i style={iconStyle} className="fa fa-hand-o-right"></i><span className="text text-danger">State Wise Comparison</span></Link>
            <Link to="/twenty" style={getStyle}><i style={iconStyle} className="fa fa-hand-o-right"></i><span className="text text-danger">From Starting</span></Link>
        </div>
    )
}
const getStyle = {
    cursor : 'pointer',
    textDecoration:'none'
}
const iconStyle = {
    fontSize:'20px',
    color:'red'
}

export default DemoGraphicView
