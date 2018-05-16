import React from 'react';

export default class BookList extends React.Component {

  state = {
    books: []
  }

  componentDidMount(){
    if (!this.state.books.length) {
      this.getBooks()
    };
  }

  componentDidUpdate(){
    if (!this.state.books.length){
      this.getBooks()
    };
  }

  getBooks() {
    if (!this.props.auth) {
      return
    }
    fetch(this.props.url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/javascript",
        "Authorization": `Token token=${ this.props.auth.token }`
      }
    }).then(res => res.json()).then(data => this.setState({ books: data }))
  }

  render(){
    return (<ol>
      { this.state.books.map(book => <li key={ book.id }>{ book.title }</li>)}
    </ol>
  )}
}
