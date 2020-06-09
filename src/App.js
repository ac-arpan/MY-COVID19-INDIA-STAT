import React, { Component } from 'react'
import './App.css';
import StateDetails from './Component/StateDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OverView from './Component/OverView';
import HistoryGraph from './Component/HistoryGraph'
import Chart from './Component/Chart';

export class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact component={OverView} />
            <Route path='/TT' exact component={OverView} />
            <Route path='/twenty' exact component={HistoryGraph} />
            <Route path='/comparison' exact component={Chart} />
            <Route path='/TT' exact component={OverView} />
            <Route path='/:code' exact component={StateDetails} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App




