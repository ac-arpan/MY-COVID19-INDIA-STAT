import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import YesterdayStat from './YesterdayStat'
import TestComponent from './TestComponent'
import Header from './Header'

class OverView extends Component {
    constructor(props) {
        super(props)
        this.inputRef = React.createRef()
        this.state = {
            data: [],
            query: '',
            myFilter: 'Confirmed'
        }
    }

    componentDidMount() {
        this.inputRef.current.focus();
        this.getData()
    }
    componentDidUpdate() {
        this.message = false;
    }

    getData = async () => {
        const res = await fetch('https://api.covid19india.org/data.json');
        const data = await res.json();

        let result = data["statewise"];
        this.setState({
            data: [...result]

        })

    }
    handleInput = (e) => {
        this.setState({
            query: e.target.value
        })

    }
    message = false
    handleSubmit = (e) => {

        e.preventDefault();
        this.getData();
        setTimeout(() => {

            let queryResults = this.state.data.filter(elem => {
                if (elem.state.split(" ").join('').toLowerCase().includes(this.state.query.split(" ").join('').toLowerCase())) {
                    return elem
                }
            })
            if (queryResults.length === 0) {
                this.message = true
            }
            this.setState({
                data: [...queryResults],
                query: ''
            })

        }, 200);
    }

    filterHandler = (e) => {
        this.setState({
            myFilter: e.target.value
        })
        let value = e.target.value
        let totalObj;
        let final;
        switch (value) {
            case 'Confirmed-Most':
                this.setState({
                    data: this.state.data.sort((a, b) => Number(a.confirmed) < Number(b.confirmed) ? 1 : -1)

                })
                break
            case 'Confirmed-Least':
                this.setState({
                    data: this.state.data.sort((a, b) => Number(a.confirmed) > Number(b.confirmed) ? 1 : -1)

                })
                totalObj = this.state.data.pop()
                final = this.state.data
                final.unshift(totalObj)
                this.setState({
                    data: [...final]

                })
                break
            case 'Active-Most':
                this.setState({
                    data: this.state.data.sort((a, b) => Number(a.active) < Number(b.active) ? 1 : -1)
                })
                break
            case 'Active-Least':
                this.setState({
                    data: this.state.data.sort((a, b) => Number(a.active) > Number(b.active) ? 1 : -1)
                })
                totalObj = this.state.data.pop()
                final = this.state.data
                final.unshift(totalObj)
                this.setState({
                    data: [...final]

                })
                break
            case 'Deaths-Most':
                this.setState({
                    data: this.state.data.sort((a, b) => Number(a.deaths) < Number(b.deaths) ? 1 : -1)
                })
                break
            case 'Deaths-Least':
                this.setState({
                    data: this.state.data.sort((a, b) => Number(a.deaths) > Number(b.deaths) ? 1 : -1)
                })
                totalObj = this.state.data.pop()
                final = this.state.data
                final.unshift(totalObj)
                this.setState({
                    data: [...final]

                })
                break
            case 'Recovered-Most':
                this.setState({
                    data: this.state.data.sort((a, b) => Number(a.recovered) < Number(b.recovered) ? 1 : -1)
                })
                break
            case 'Recovered-Least':
                this.setState({
                    data: this.state.data.sort((a, b) => Number(a.recovered) > Number(b.recovered) ? 1 : -1)
                })
                totalObj = this.state.data.pop()
                final = this.state.data
                final.unshift(totalObj)
                this.setState({
                    data: [...final]

                })
                break

        }
    }
    render() {
        return (
            <div className="wrapper">

                <Header />

                <YesterdayStat />

                <TestComponent />

                <form onSubmit={this.handleSubmit} className="Search-form">
                    <input className="Search-Box" type="text" value={this.state.query} ref={this.inputRef} onChange={this.handleInput}
                        placeholder="Search for State Name.." />
                    <button className="btn" type="submit">Search</button>
                </form>

                {this.state.data.length === 38 ?<div className="filter-options">
                    <select value={this.state.myFilter} onChange={this.filterHandler}>
                        <option value='Confirmed-Most'>Most Confirmed Cases</option>
                        <option value='Confirmed-Least'>Least Confirmed Cases</option>
                        <option value='Active-Most'>Most Active Cases</option>
                        <option value='Active-Least'>Least Active Cases</option>
                        <option value='Deaths-Most'>Most Deaths</option>
                        <option value='Deaths-Least'>Least Deaths</option>
                        <option value='Recovered-Most'>Most Recovered</option>
                        <option value='Recovered-Least'>Least Recovered</option>
                    </select>
                </div> : ''}

                <div className="stateOverviewContainer">
                    {this.state.data.map(elem => (

                        <Link to={`/${elem.statecode}`} className="stateOverview" key={elem.statecode}>
                            <div>
                                <h2 className="box-header">{elem.state}</h2>
                                <em><p>Last Updated On : {elem.lastupdatedtime}</p></em>
                                <p className="text text-danger">Confirmed : {elem.confirmed}[+{elem.deltaconfirmed}]</p>
                                <p className="text text-warning">Active : {elem.active}</p>
                                <p className="text text-success">Recovered : {elem.recovered}[+{elem.deltarecovered}]</p>
                                <p className="text text-fade">Deaths : {elem.deaths}[+{elem.deltadeaths}]</p>
                            </div>
                        </Link>


                    ))}

                    {this.message ?
                        <div className="message">
                            No such state found
                        <ul>
                                <li>1. Please search with exact state name or,</li>
                                <li>2. Search with first three or four letter,if full name not known</li>
                                <li>3. Reload the page or click on search again to get the full overview.</li>
                            </ul>

                        </div> : <div className="message">Reload the page to get the full overview again.</div>}
                </div>

            </div>
        )
    }
}


export default OverView
