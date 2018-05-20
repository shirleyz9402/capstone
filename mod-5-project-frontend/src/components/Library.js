
import React from 'react';
import BookList from './BookList'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';


export default class Library extends React.Component {

  render(){
      // console.log(this.props)
    return (
      <div>
      <Link to='/'>Back</Link>
      <BookList { ...this.props } books={this.props.lib.books} />
      </div>
    )
  }
}
