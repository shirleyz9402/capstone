import React from 'react';
import Library from './Library'
import {Link} from 'react-router-dom'



export default class LibraryBrowser extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      libs: []
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
        <Link to={`/libraries/${lib.id}`} value={lib.name} key={lib.name}>{lib.name}</Link>
      )
    })

    return (
      <div>
        {renderLibs}
      </div>
  )}
}
