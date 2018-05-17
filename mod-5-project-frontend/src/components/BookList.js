import React from 'react';
import Reader from './Reader'

export default class BookList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedbook: null
    }
  }
  handleClick = event => {
    this.setState({selectedbook: this.props.books.find(book => book.title === event.target.value)})
  }
  // componentDidMount(){
  //   if (!this.state.books.length) {
  //     this.getBooks()
  //   };
  // }

  // componentDidUpdate(){
  //   if (!this.state.books.length){
  //     this.getBooks()
  //   };
  // }

  // getBooks() {
  //   if (!this.props.auth) {
  //     return
  //   }
  //   fetch(this.props.url, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "Accept": "application/javascript",
  //       "Authorization": `Token token=${ this.props.auth.token }`
  //     }
  //   }).then(res => res.json()).then(data => this.setState({ books: data }))
  // }

  render(){
    console.log(this.state)
    console.log(this.props)
  const renderBooks = this.props.books.map(book => {
    return (
      <button value={book.title} onClick={this.handleClick} key={ book.id }>{ book.title }</button>
    )}
  )
    return (
    <ol>
      {this.state.selectedbook === null ? renderBooks : <Reader {...this.props} book={this.state.selectedbook}/>}
    </ol>
  )}
}
