
import React from 'react';
import BookList from './BookList'
import { Link } from 'react-router-dom';


export default class Library extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      books: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:4000/libraries').then(r => r.json()).then(r => this.setState({books: r.find(lib => lib.id === parseInt(this.props.history.location.pathname.slice(-1))).books}))
  }
  render(){
      console.log(this.props)
    return (
      <div>
        <BookList { ...this.props } books={this.state.books} />
      </div>
    )
  }
}
