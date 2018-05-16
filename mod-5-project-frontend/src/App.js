import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import Library from './components/Library'
import AllBooks from './components/AllBooks'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

class App extends Component {
  state = {

  }

  componentDidMount() {
    if (localStorage.auth) {
      const auth = JSON.parse(localStorage.auth)
      this.setState({ auth });
    }
  }

  authFetched = (auth) =>{
    localStorage.auth = JSON.stringify(auth);
    this.setState({ auth });
  }

  logout = () => {
    localStorage.removeItem("auth")
    this.setState({ auth: null })
  }

  authyBits = () => {
    if (this.state.auth) {
      return (
        <div>
          <Route exact path="/books" render={ (renderProps) => {
              return <AllBooks auth={ this.state.auth } />
            }
          } />
          <Route exact path="/library" render={ (renderProps) => {
              return <Library auth={ this.state.auth } />
            }
          } />
          <Route exact path="/logout" render={ (renderProps) => {
              return <Logout logout={ this.logout } />
            }
          } />
        </div>
      )
    }
    else {
      return ""
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>

        </header>
        <Router>
        <div>
        { this.state.auth ?
            <div>
              <Link to="/books">Books</Link>
              <Link to="/library">Library</Link>
              <Link to="/logout">Log out</Link>
            </div>
          :
            <div>
              <Link to="/register">Register</Link>
              <Link to="/login">Login</Link>
            </div>
        }
          <div>
            <Route exact path="/register" render={ (renderProps) =>
              <Register history={ renderProps.history } authSet={ this.authFetched } />
            } />
            <Route exact path="/login" render={ (renderProps) =>
              <Login history={ renderProps.history } authSet={ this.authFetched } />
            } />
            <Route exact path="/upload" render={ (renderProps) =>
              <Upload history={ renderProps.history } authSet={ this.authFetched } />
            } />
            {this.authyBits()}
          </div>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
