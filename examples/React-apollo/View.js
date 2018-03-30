import React, { Component } from 'react'

class View extends Component {
  
  static mapPropsToProps = props => {
    
    return {
      message: props.data.hello,
      ...props
    }
  }
  
  render() {
    const { message } = this.props
    
    return (
      <div style={{ fontSize: '15em' }}>
        { message }
      </div>
    )
  }
}

export default View