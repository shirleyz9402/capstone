import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload'
import { BrowserRouter as Router, Route } from 'react-router-dom';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Router>
          <div>
            <Route exact path ="/" component={Upload}/>
            <Route exact path="/upload" component={Upload}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
