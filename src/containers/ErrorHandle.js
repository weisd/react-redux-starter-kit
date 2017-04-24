import React, { Component } from 'react'

class ErrorHandle extends Component {
  render () {

const {query} = this.props.location

    return (
      <div>
        Err:  {query.msg}
      </div>
    )
  }
}

export default ErrorHandle
