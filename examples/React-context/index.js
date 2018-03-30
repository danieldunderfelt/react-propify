import React from 'react'
import { render } from 'react-dom'
import App from './App'

export const MessageContext = React.createContext('message from context')

render((
  <MessageContext.Provider>
    <App />
  </MessageContext.Provider>
), document.getElementById('app'))