
import React from 'react';
import BookList from './BookList'
import { Link } from 'react-router-dom';


export default class Library extends React.Component {
  constructor(){
    super()
    this.state = {
      books: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:4000/libraries').then(r => r.json()).then(r => this.setState({books: r.find(lib => lib.id === parseInt(this.props.history.location.pathname.split('/')[2])).books}))
  }
  render(){
      console.log(this.props)
    return (
      <div class="library">
        <BookList { ...this.props } books={this.state.books} />
      </div>
    )
  }
}
