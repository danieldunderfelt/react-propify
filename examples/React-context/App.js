import React, { Component } from 'react'
import View from './View'
import { propify } from '../../src/propify'
import { MessageContext } from './index'

class App extends Component {
  
  render() {
    
    return (
      <div>
        <MessageContext.Consumer>
          { propify(View) }
        </MessageContext.Consumer>
      </div>
    )
  }
}

export default App