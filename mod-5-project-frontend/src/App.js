import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import Upload from './components/Upload'
import Login from './components/Login'
import Register from './components/Register'
import Logout from './components/Logout'
import LibraryBrowser from './components/LibraryBrowser'
import AllBooks from './components/AllBooks'
import Reader from './components/Reader'
import Library from './components/Library'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Redirect } from 'react-router'


class App extends Component {
  state = {
    auth: {
      user_id: null,
      username: '',
      token: ""
    }
  }

  componentDidMount() {
    if (localStorage.auth) {
      const auth = JSON.parse(localStorage.auth)
      this.setState({ auth: auth });
    }
  }

  authFetched = (auth) =>{
    localStorage.auth = JSON.stringify(auth);
    this.setState({ auth: auth });
  }

  logout = () => {
    localStorage.removeItem("auth")
    this.setState({ auth: null })
  }

  authyBits = () => {
    if (this.state.auth) {
      return (
        <div>
        <Switch>
          <Route exact path='/' render={ () => (
            this.state.auth.user_id !== null ? (<Redirect to='/books'/>) : (null)
          )
        } />
          <Route exact path='/books' render={ (renderProps) => {
              return <AllBooks history={ renderProps.history } auth={ this.state.auth } />
            }
          } />
          <Route path='/books/:id' render={ (renderProps) => {
              return <Reader history={ renderProps.history } auth={ this.state.auth } />
            }
          } />
          </Switch>
          <Switch>
          <Route exact path='/libraries' render={ (renderProps) => {
              return <LibraryBrowser history={ renderProps.history } auth={ this.state.auth } />
            }
          } />
          <Route  path='/libraries/:id' render={ (renderProps) => {
              return <Library history={ renderProps.history } auth={ this.state.auth } />
            }
          } />
          </Switch>
          <Route exact path="/upload" render={ (renderProps) => {
              return <Upload  auth={ this.state.auth } />
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
    console.log('APP STATE',this.state.auth)
    return (
      <div className="App">
        <header className="App-header">

        </header>
        <Router>
        <div id="capstone">
        { this.state.auth ?
            <div class="links">
              <Link to="/" id="books-link"> All Books </Link>
              <Link to="/libraries" id="lib-link"> Your Libraries </Link>
              <Link to="/upload" id="upload-link"> Upload </Link>
              <Link to="/logout" id="logout-link"> Log out </Link><br/>
            </div>
          :
            <div class="links">
              <Link to="/register" id="register-link">Register</Link><br/>
              <Link to="/login" id="login-link">Login</Link>
            </div>
        }
            <div class="routes">
              <Route exact path="/register" render={ (renderProps) =>
                <Register history={ renderProps.history } authSet={ this.authFetched } />
              } />
              <Route exact path="/login" render={ (renderProps) =>
                <Login history={ renderProps.history } authSet={ this.authFetched } />
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
