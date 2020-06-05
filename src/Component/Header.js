import React, { Component } from 'react'
import Typed from 'react-typed';

class Header extends Component {
    render() {
        return (
            <div>
                    <Typed className="header"
                        strings={[
                            'India COVID19 Statistics',
                            'India : State Wise Details',
                            'Salute to all Front-Liners',
                            'STAY HOME STAY SAFE',
                            'We shall Overcome'
                        ]}
                        typeSpeed={40}
                        backSpeed={50}
                        loop >
                        <input style={getStyle} type="text" />
                    </Typed>
                
            </div>
        )
    }
}
const getStyle = {
    background : 'transparent',
    border: 'none',
    fontSize : '1rem',
    height : '5vh',
    fontWeight : '500',
}

export default Header
