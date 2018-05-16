import React from 'react';
import BookList from './BookList'


export default class Library extends React.Component {


  render(){
    return (<BookList { ...this.props } url={ `http://localhost:4000/users/${ this.props.auth.user_id }/books` } />
  )}
}
