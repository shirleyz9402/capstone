import React from 'react';
import Library from './Library'
import {Link} from 'react-router-dom'



export default class LibraryBrowser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      libs: [],
      newLib: ''
    }
  }
  componentDidMount(){
    if(this.props.auth.user_id){
    fetch(`http://localhost:4000/users/${this.props.auth.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript",
        "Authorization": `Token token=${ this.props.auth.token }`
      }
    })
    .then(r => r.json())
    .then(r => this.setState({libs:  r.libraries}))
    }
  }
  getLibs = () => {
    fetch(`http://localhost:4000/users/${this.props.auth.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript",
        "Authorization": `Token token=${ this.props.auth.token }`
      }
    })
    .then(r => r.json())
    .then(r => this.setState({libs:  r.libraries}))
    }

  handleChange = event => {
    this.setState({newLib: event.target.value})
  }
  handleClick = event => {
    event.preventDefault()
    fetch('http://localhost:4000/libraries', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token token=${ this.props.auth.token }`
      },
      body: JSON.stringify({
        name: this.state.newLib,
        user_id: this.props.auth.user_id
      })
    }).then(this.getLibs)
  }
  // handleBack = event => {
  //   if (this.state.selectedLib){
  //   this.setState({selectedLib: null})
  //   }
  //   else if (this.state.selectedbook){
  //     this.setState({selectedbook: null})
  //   }
  // }
  render(){
    console.log('LIBRARYBROWSER STATE',this.state)
    const renderLibs = this.state.libs.map(lib => {
      return (
        <div key={lib.name}>
          <br/><Link to={`/libraries/${lib.id}`} value={lib.name} > {lib.name}</Link><br/><br/>
        </div>
      )
    })

    return (
      <div>
        {renderLibs}
        <form>
          Create New Library: <input onChange={this.handleChange}/>
          <button onClick={this.handleClick}>Create Library</button>
        </form>
      </div>
  )}
}
