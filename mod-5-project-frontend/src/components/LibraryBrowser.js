import React from 'react';
import Library from './Library'


export default class LibraryBrowser extends React.Component {
  constructor(props){
    super(props)
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
        // "Authorization": `Token token=${ this.props.auth.token }`
      }
    })
    .then(r => r.json())
    .then(r => r.libraries.forEach(lib => this.setState({libs: [...this.state.libs, lib]})))
  }
  handleClick = event => {
    this.setState({selectedLib: this.state.libs.find(lib => lib.name === event.target.value)})
    console.log(event.target.value)
  }
  render(){
    console.log(this.state)
    const renderLibs = this.state.libs.map(lib => {
      return (
        <button value={lib.name} key={lib.name} onClick={this.handleClick}>{lib.name}</button>
      )
    })
    return (
      <div>
        {this.state.selectedLib === null ? renderLibs : <Library {...this.props} lib={this.state.selectedLib}/>}
      </div>
  )}
}
