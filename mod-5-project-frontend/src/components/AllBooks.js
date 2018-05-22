import React from 'react';
import BookList from './BookList'


export default class AllBooks extends React.Component {
  constructor() {
    super()
    this.state = {
      books: [],
      filtered: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:4000/books', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/javascript',
        'Authorization': `Token token=${this.props.auth.token}`
      }
    }).then(r => r.json())
      .then(r => this.setState({books: r, filtered: r}))
  }
  handleChange = event => {
    let searchWord = event.target.value
    if(searchWord !== ''){
      this.setState({filtered: this.state.books.filter(book => book.title.toLowerCase().includes(searchWord) || book.author.toLowerCase().includes(searchWord.toLowerCase()))})
    }
    else {
      this.setState({filtered: this.state.books})
    }
  }

  render(){
    console.log('ALLBOOKS PROPS', this.props)
    console.log('ALLBOOKS STATE', this.state)
    return (
    <div>
      Search: <input onChange={this.handleChange} placeholder="by title or author..."/>
      <BookList { ...this.props } books={this.state.filtered} />
    </div>
  )}
}
