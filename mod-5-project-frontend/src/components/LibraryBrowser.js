import React from 'react';
import Library from './Library'


export default class LibraryBrowser extends React.Component {
  constructor(){
    super()
    this.state = {
      libs: [],
      selectedLib: null
    }
  }
  componentDidMount(){
    fetch(`http://localhost:4000/users/${this.props.auth.user_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript",
        "Authorization": `Token token=${ this.props.auth.token }`
      }
    })
    .then(r => r.json())
    .then(r => r.libraries.forEach(lib => this.setState({libs: [...this.state.libs, lib]})))
  }
  handleClick = event => {
    this.setState({selectedLib: this.state.libs.find(lib => lib === event.target.id)})
  }
  render(){
    const renderLibs = this.state.libs.map(lib => {
      return (
        <h1 id={lib} key={lib.name} onClick={this.handleClick}>{lib.name}</h1>
      )
    })
    return (
      <div>
        {this.state.selectedLib === null ? renderLibs : <Library lib={this.state.selectedLib}/>}
      </div>
  )}
}
