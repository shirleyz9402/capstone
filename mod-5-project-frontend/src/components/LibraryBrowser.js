import React from 'react';
import Library from './Library'
import {Route} from 'react-router-dom';



export default class LibraryBrowser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      libs: [],
      selectedLib: null
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
    .then(r => r.libraries.forEach(lib => this.setState({libs: [...this.state.libs, lib]})))
    }
  }
  handleClick = event => {
    this.setState({selectedLib: this.state.libs.find(lib => lib.name === event.target.value)})
  }
  handleBack = event => {
    if (this.state.selectedLib){
    this.setState({selectedLib: null})
    }
    else if (this.state.selectedbook){
      this.setState({selectedbook: null})
    }
  }
  render(){
    console.log('LIBRARYBROWSER STATE',this.state)
    const renderLibs = this.state.libs.map(lib => {
      return (
        <button value={lib.name} key={lib.name} onClick={this.handleClick}>{lib.name}</button>
      )
    })

    return (
      <div>
        {this.state.selectedLib === null ? renderLibs :
        <div>
          <Library {...this.props} lib={this.state.selectedLib}/>
        </div>}
      </div>
  )}
}
