import React from 'react';
import BookList from './BookList'


export default class AllBooks extends React.Component {
  constructor() {
    super()
    this.state = {
      books: []
    }
  }
  componentDidMount(){
    fetch(`http://localhost:4000/users/${this.props.auth.user_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/javascript',
        'Authorization': `Token token=${this.props.auth.token}`
      }
    }).then(r => r.json())
      .then(r => r.libraries.forEach(lib => lib.books.forEach(book => this.setState({books: [...this.state.books, book]}))))
  }
  render(){
    console.log('ALLBOOKS PROPS', this.props)
    console.log('ALLBOOKS STATE', this.state)
    return (
      <BookList { ...this.props } books={this.state.books} />
  )}
}
