
import React from 'react'
import Auth from './Auth'

export default class Login extends React.Component {

  render(){
    return <Auth { ...this.props }
                     url="http://localhost:4000/sessions" />
  }
}
