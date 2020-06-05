import React, { Component } from 'react'
import './App.css';
import StateDetails from './Component/StateDetails';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import OverView from './Component/OverView';

export class App extends Component {

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path='/' exact component={OverView} />
            <Route path='/TT' exact component={OverView} />
            <Route path='/:code' exact component={StateDetails} />
          </Switch>
        </div>
      </Router>
    )
  }
}


export default App




