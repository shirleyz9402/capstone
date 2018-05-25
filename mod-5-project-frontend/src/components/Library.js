
import React from 'react';
import BookList from './BookList'
import { Link } from 'react-router-dom';


export default class Library extends React.Component {
  constructor(){
    super()
    this.state = {
      books: [],
      fromLib: true,
      fromYourUploads: false
    }
  }
  componentDidMount(){
    let libId = parseInt(this.props.history.location.pathname.split('/')[2])
    console.log(libId)
    fetch('http://localhost:4000/libraries').then(r => r.json()).then(r => {
      if(r.find(lib => lib.id === libId).name === 'Your Uploads'){
        this.setState({
          fromYourUploads: true,
          books: r.find(lib => lib.id === libId).books
        })
      }
      else {
        this.setState({books: r.find(lib => lib.id === libId).books})
      }
    })
  }
  getBooks = () => {
    fetch('http://localhost:4000/libraries').then(r => r.json()).then(r => this.setState({books: r.find(lib => lib.id === parseInt(this.props.history.location.pathname.split('/')[2])).books}))
  }

  handleDelete = (event, book) => {
    if(!this.state.fromYourUploads){
      fetch(`http://localhost:4000/books/${book.id}`, {
        method: "PATCH",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token token=${ this.props.auth.token }`
        },
        body: JSON.stringify({
          library_id: parseInt(this.props.history.location.pathname.split('/')[2]),
          delete: true
        })
      }).then(r => r.json()).then(r => r ? alert(`${book.title} was removed from your library`) : alert('error')).then(this.getBooks)
    }
    else {
      fetch(`http://localhost:4000/books/${book.id}`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Token token=${ this.props.auth.token }`
        },
        body: JSON.stringify({
          library_id: parseInt(this.props.history.location.pathname.split('/')[2])
        })
      }).then(r => r.json()).then(r => r ? alert(`${book.title} has been deleted`) : alert('error')).then(this.getBooks)
    }
  }
  render(){
      console.log(this.props)
      console.log(this.state)
    return (
      <div class="library">
        <BookList { ...this.props } handleDelete={this.handleDelete} fromYourUploads={this.state.fromYourUploads} fromLib={this.state.fromLib} books={this.state.books} />
      </div>
    )

  }
}
