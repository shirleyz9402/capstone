import React from 'react'
import {Link} from 'react-router-dom'

export default class AllLibraries extends React.Component {
  constructor(){
    super()
    this.state = {
      libs: [],
      filtered: []
    }
  }
  componentDidMount(){
    fetch('http://localhost:4000/libraries', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/javascript',
        'Authorization': `Token token=${this.props.auth.token}`
      }
    }).then(r => r.json()).then(r => this.setState({libs: r, filtered: r}))
  }

  handleSearch = event => {
    let searchWord = event.target.value
    if(searchWord !== ''){
      this.setState({filtered: this.state.libs.filter(lib => lib.name.toLowerCase().includes(searchWord))})
    }
    else {
      this.setState({filtered: this.state.libs})
    }
  }
  render(){
    const renderLibs = this.state.filtered.map(lib => {
      if(lib.name && lib.name !== 'Your Uploads'){
        return(
          <div id={lib.name}  key={lib.name}>
            <br/><Link to={`/libraries/${lib.id}`} value={lib.name} > <h3>{lib.name}</h3></Link><br/>
            <br/><br/>
          </div>
        )
      }
    })
    return(
      <div>
      Search <input onChange={this.handleSearch}/>
        {renderLibs}
      </div>
    )
  }
}
