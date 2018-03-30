import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { ApolloProvider } from 'react-apollo'
import { createClient } from './apolloClient'

const client = createClient()

render((
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
), document.getElementById('app'))