import React , { Component } from 'react'
import PropTypes from 'prop-types'


import {
  Container,
  Card,
  View,
} from 'amazeui-touch';


class Info extends Component {
  componentDidMount() {
   
    
  }

  render() {
    const { params} = this.props

    return (
      <div>{params.id}</div>
    )
  }
}

export default Info
