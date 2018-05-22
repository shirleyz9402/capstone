import React from 'react'
import ReactFilestack from 'filestack-react';


const apikey = 'AhRLM73SCSb2Q9Z4OPxwsz'
const options = {
  accept: 'application/epub+zip',
  maxFiles: 5,
  storeTo: {
    location: 's3',
    access: 'public'
  },
};
export default class Upload extends React.Component{
  constructor(){
    super()
    this.state = {
      handle: '',
      title: '',
      author: '',
      libs: [],
      selectedLib: null,
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

  onSuccess = (response) => {
    fetch('http://localhost:4000/books', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Token token=${ this.props.auth.token }`
      },
      body: JSON.stringify({
        title: this.state.title,
        author: this.state.author,
        url:  'https://cdn.filestackcontent.com/' + response.filesUploaded[0].handle,
        library_id: this.state.selectedLib.id
      })
    })
    .then(r => r.json())
    .then(r => r ? null : alert('This book has already been added to your library!'))
  }

  handleChange = event => {
    if (event.target.id === "selectedLib"){
      this.setState({selectedLib: this.state.libs.find(lib => lib.name = event.target.value)})
    }
    else{
      this.setState({[event.target.id]: event.target.value})
    }
  }


  render(){
    console.log(this.state.libs.length + 1)
    const renderLibraries = this.state.libs.map(lib => {
      return (<option value={lib.id} key={lib.name}>{lib.name}</option>)
    })
    return(
    <div>
      <form>
        <select id="selectedLib" onChange={this.handleChange} defaultValue="default">
          <option value="default">Select a Library</option>
          {renderLibraries}
        </select>
        <br/>
        <label htmlFor='title'>Title: <input onChange={this.handleChange} placeholder="Title" id="title"/></label>
        <br/>
        <label htmlFor='author'>Author: <input onChange={this.handleChange} placeholder="Author" id="author"/></label>
        <br/>
        <ReactFilestack
         apikey={apikey}
         buttonText="Upload"
         buttonClass="classname"
         options={options}
         onSuccess={this.onSuccess}
        />
      </form>
    </div>
    )
  }
}
