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
      title: '',
      author: '',
      coverURL: 'http://www.clker.com/cliparts/R/w/q/4/j/l/book-md.png'
    }
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
        cover: this.state.coverURL,
        url:  'https://cdn.filestackcontent.com/' + response.filesUploaded[0].handle,
        user_id: this.props.auth.user_id
      })
    })
    .then(r => r.json())
    .then(r => r ? alert('Upload successful!') : alert('This book has already been added!'))
  }

  handleChange = event => {
    this.setState({[event.target.id]: event.target.value})
  }


  render(){

    return(
    <div id="upload">
      <form id="upload-book">
        <br/>
        <label htmlFor='title'>Title: <input onChange={this.handleChange} placeholder="Title" id="title"/></label>
        <br/>
        <label htmlFor='author'>Author: <input onChange={this.handleChange} placeholder="Author" id="author"/></label>
        <br/>
        <label htmlFor='title'>Cover: <input onChange={this.handleChange} placeholder="Cover URL" id="cover"/></label>
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
