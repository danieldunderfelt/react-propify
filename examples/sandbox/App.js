import React, { Component } from 'react'
import View from './View'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'
import { propify } from '../../src/propify'

const query = gql`
    {
        hello
    }
`

class App extends Component {
  
  render() {
    
    return (
      <div>
        <Query query={ query }>
          { propify(View) }
        </Query>
      </div>
    )
  }
}

export default App