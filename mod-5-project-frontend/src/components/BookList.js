import React from 'react';
import Reader from './Reader'
import ReactFilestack from 'filestack-react';
import {Link} from 'react-router-dom'

const apikey = 'AhRLM73SCSb2Q9Z4OPxwsz'


export default class BookList extends React.Component {
  constructor(){
    super()
    this.state = {
      libs: [],
      selectedLib: null,
      selectedbook: null
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

  onSuccess = response => {
    this.setState({
      selectedbook: response,
    })
  }
  handleClick = (event, book) => {
    if(this.state.selectedLib){
      event.preventDefault()
      console.log(book)
      let libraries = {
        name: this.state.selectedLib.name,
        user_id: this.props.auth.user_id
      }
    fetch(`http://localhost:4000/books/${book.id}/libraries`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/javascript',
        "Authorization": `Token token=${ this.props.auth.token }`
      },
      body: JSON.stringify(libraries)
    })
    .then(r => r.json())
    .then(r => r ? alert('Succesfully added!') : alert('This book has already been added to your library!'))
    }
  }

  handleChange = event => {
    console.log(event.target.id)
    console.log(event.target.value)
    if (event.target.id === "selectedLib"){
      this.setState({selectedLib: this.state.libs.find(lib => lib.id = event.target.value)})

    }
    else{
      this.setState({[event.target.id]: event.target.value})
    }
  }

  render(){
    console.log('BOOKLIST STATE',this.state)
    console.log('BOOKLIST PROPS', this.props)
  const renderLibraries = this.state.libs.map(lib => {
    return (<option value={lib.id} key={lib.name}>{lib.name}</option>)
  })
  const renderBooks = this.props.books.map(book => {
    return (
      <form key={book.id} id={book.title}>
        {book.title}<br/><br/>
        <ReactFilestack
        apikey={apikey}
        mode="retrieve"
        buttonText= "Read"
        options={{handle: book.url.slice(-20), extension: '.epub', dl: true}}
        onSuccess={this.onSuccess}
        />
        <select id="selectedLib" onChange={this.handleChange} defaultValue="default">
          <option value="default">Select a Library</option>
          {renderLibraries}
        </select>
        <button onClick={event => this.handleClick(event,book)}>Add to Library</button><br/><br/>
      </form>

    )}
  )
    return (
    <div id="book-list">
      <br/>
      {this.state.selectedbook === null ? renderBooks :
        <div>
          <Reader {...this.props} book= {this.state.selectedbook}/>
        </div>
      }
    </div>
  )}
}
