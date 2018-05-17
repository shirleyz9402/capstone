
import React from 'react';
import BookList from './BookList'


export default class AllBooks extends React.Component {
// constructor(props){
//   super(props)
//   this.state = {
//     books: this.props.lib.books
//   }
//
// }
  render(){
    // console.log(this.props)
    return (
      <BookList { ...this.props } books={this.props.lib.books} url={`http://localhost:4000/users/${ this.props.auth.user_id }/libraries/${this.props.lib.id}`} />  )}
}
