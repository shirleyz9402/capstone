import React from 'react';
import Reader from './Reader'
import ReactFilestack from 'filestack-react';

const apikey = 'AhRLM73SCSb2Q9Z4OPxwsz'


export default class BookList extends React.Component {
  constructor(){
    super()
    this.state = {
      selectedbook: null
    }
  }

  onSuccess = response => {
    this.setState({
      selectedbook: response,
    })
  }
  // handleBack = event => {
  //   this.setState({selectedbook: null})
  // }

  render(){
    console.log('BOOKLIST STATE',this.state)
    console.log('BOOKLIST PROPS', this.props)
  const renderBooks = this.props.books.map(book => {
    return (
      // <button value={book.title} onClick={this.handleClick} key={ book.id }>{ book.title }</button>
        <ReactFilestack
        apikey={apikey}
        mode="retrieve"
        buttonText={book.title}
        options={{handle: book.url.slice(-20), extension: '.epub', dl: true}}
        onSuccess={this.onSuccess}
        />

    )}
  )
    return (
    <ol>
      {this.state.selectedbook === null ? renderBooks : <Reader {...this.props} book= {this.state.selectedbook}/>
      }
    </ol>
  )}
}
