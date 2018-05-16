
import React from 'react';
import BookList from './BookList'


export default class AllBooks extends React.Component {

  render(){
    return (
      <BookList { ...this.props } url={`http://localhost:4000/users/${ this.props.auth.user_id }/libraries/${this.props.lib.id}`} />  )}
}
