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
    fetch('http://localhost:4000/books').then(r => r.json()).then(r => this.setState({books: r}))
  }
  render(){
    return (
      <BookList { ...this.props } books={this.state.books} url="http://localhost:4000/books" />
  )}
}
