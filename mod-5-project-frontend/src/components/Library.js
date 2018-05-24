
import React from 'react';
import BookList from './BookList'
import { Link } from 'react-router-dom';


export default class Library extends React.Component {
  constructor(){
    super()
    this.state = {
      books: [],
      fromLib: true
    }
  }
  componentDidMount(){
    fetch('http://localhost:4000/libraries').then(r => r.json()).then(r => this.setState({books: r.find(lib => lib.id === parseInt(this.props.history.location.pathname.split('/')[2])).books}))
  }
  getBooks = () => {
    fetch('http://localhost:4000/libraries').then(r => r.json()).then(r => this.setState({books: r.find(lib => lib.id === parseInt(this.props.history.location.pathname.split('/')[2])).books}))
  }

  handleDelete = (event, book) => {
    console.log(book)
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
    }).then(r => r.json()).then(r => r ? null : alert(`${book.title} was deleted from your library`)).then(this.getBooks)
  }
  render(){
      console.log(this.props)
    return (
      <div class="library">
        <BookList { ...this.props } handleDelete={this.handleDelete}fromLib={this.state.fromLib} books={this.state.books} />
      </div>
    )

  }
}
