import React from 'react';
import Reader from './Reader'
import ReactFilestack from 'filestack-react';
import {Route, Link} from 'react-router-dom'
import { Redirect } from 'react-router'


const apikey = 'AhRLM73SCSb2Q9Z4OPxwsz'


export default class BookList extends React.Component {
  constructor(){
    super()
    this.state = {
      libs: [],
      selectedLib: null,
      selectedbook: null,
      newLib: ''
    }
  }

  componentDidMount(){
    this.getLibs()
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
    .then(r => this.setState({libs:r.libraries}))
  }

  onSuccess = response => {
    this.setState({
      selectedbook: response,
    })
  }
  handleClick = (event, book) => {
    if(this.state.selectedLib){
      event.preventDefault()
      console.log(book)
    fetch(`http://localhost:4000/books/${book.id}/libraries`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/javascript',
        "Authorization": `Token token=${ this.props.auth.token }`
      },
      body: JSON.stringify({
        name: this.state.selectedLib.name,
        user_id: this.props.auth.user_id,
        library_id: this.state.selectedLib.id
      })
    })
    .then(r => r.json())
    .then(r => r ? alert('Succesfully added!') : alert('This book has already been added to your library!'))
    }
  }

  handleChange = event => {
    if(event.target.id === 'selectedLib'){
      this.setState({selectedLib: this.state.libs.find(lib => lib.id == event.target.value)})
    }
    else {
      this.setState({newLib: event.target.value})
    }
  }

  handleNewLib = (event) => {
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


  render(){
    console.log('BOOKLIST STATE',this.state)
    console.log('BOOKLIST PROPS', this.props)

  const renderLibraries = this.state.libs.map(lib => {
    if(lib.name !== "Your Uploads"){
      return (
        <option value={lib.id} key={lib.name}>{lib.name}</option>
      )
    }
  })
  const renderBooks = this.props.books.map(book => {
    return (
      <div class="book">
        <h3>{book.title}</h3>
        <p>by: {book.author}</p>
        <img src={book.cover}/> <br/><br/>
        <ReactFilestack
          apikey={apikey}
          mode="retrieve"
          buttonText= 'Read'
          options={{handle: book.url.slice(-20), extension: '.epub', dl: true}}
          onSuccess={this.onSuccess}
        />
        {this.props.fromLib && this.props.fromYourUploads ?
          <button value={book} onClick={event => this.props.handleDelete(event,book)}>Delete</button>
          :
          <form key={book.id} id={book.title} class="book">
            <label htmlFor='newLib'> <input onChange={this.handleChange} placeholder=" Create a new library..." id="newLib" /></label>
            <button type="reset" onClick={this.handleNewLib}>Create Library</button>
            <br/>
            <select id="selectedLib" onChange={this.handleChange} defaultValue="default">
              <option value="default">Select a Library</option>
              {renderLibraries}
            </select>
            <button onClick={event => this.handleClick(event,book)}>Add to Library</button><br/><br/><br/>
          </form>
        }
        </div>
      )
    })
    return(
      <div>
        <br/>
        {this.state.selectedbook === null ?
        <div>
          Search: <input onChange={this.props.handleSearch} id= "search" placeholder=" by title or author..."/><br/><br/>
          <div id="book-list">
            {renderBooks}
          </div>
        </div>
        :

        <div id="reader">
          <Reader {...this.props} book= {this.state.selectedbook}/>
        </div>
      }
    </div>
  )}
}
