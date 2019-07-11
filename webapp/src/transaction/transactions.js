import React from 'react'
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
// import { ApolloConsumer } from 'react-apollo'

const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      amount
    }
  }
`

const TransactionsList = () => (
  <Query query={GET_TRANSACTIONS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return (
        data.transactions.map(t => (
          <div key={t.id}>
            {t.amount}
          </div>
        ))
      )
    }}
  </Query>
)

export function Transactions () {
  return (
    <>
      <div>Transactions</div>
      <TransactionsList />
    </>
  )
}
