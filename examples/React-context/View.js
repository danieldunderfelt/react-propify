import React, { Component } from 'react'

class View extends Component {
  
  render() {
    const { context } = this.props
    
    return (
      <div style={{ fontSize: '15em' }}>
        { context }
      </div>
    )
  }
}

export default View