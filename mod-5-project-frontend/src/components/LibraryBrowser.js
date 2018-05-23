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
  handleDelete = id => {
    console.log(id)
    fetch(`http://localhost:4000/libraries/${id}`, {
      method: "DELETE"
    }).then(this.getLibs)
  }
  render(){
    console.log('LIBRARYBROWSER STATE',this.state)
    const renderLibs = this.state.libs.map(lib => {
      if(lib.name !== "Your Uploads"){
        return (
          <div key={lib.name}>
            <br/><Link to={`/libraries/${lib.id}`} value={lib.name} > {lib.name}</Link><br/>
            <button value={lib.id} onClick={event => this.handleDelete(lib.id)}> Delete {lib.name} </button>
            <br/><br/>
          </div>
        )
      }
      else {
        return(
          <div id={lib.name} class="lib" key={lib.name}>
            <br/><Link to={`/libraries/${lib.id}`} value={lib.name} > {lib.name}</Link><br/>
            <br/><br/>
          </div>
        )
      }
    })

    return (
      <div>
      <form id="create-lib">
        <br/>
        Create New Library: <input onChange={this.handleChange}/>
        <button onClick={this.handleClick}>Create Library</button>
      </form>
        {renderLibs}
      </div>
  )}
}
