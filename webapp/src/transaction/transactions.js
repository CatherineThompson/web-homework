import React from 'react'
import gql from 'graphql-tag'
import { Query, Mutation } from 'react-apollo'
import { FormContainer } from '../helpers/FormContainer'
import LabeledInput from '../components/LabeledInput'
import LabeledNumberInput from '../components/LabeledNumberInput'
import Checkbox from '../components/Checkbox'
import PropTypes from 'prop-types'

const GET_TRANSACTIONS = gql`
  {
    transactions {
      id
      amount
      credit
      debit
      description
    }
  }
`

const TransactionsList = () => (
  <Query query={GET_TRANSACTIONS}>
    {({ loading, error, data }) => {
      if (loading) return 'Loading...'
      if (error) return `Error! ${error.message}`

      return (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Amount</th>
              <th>Credit</th>
              <th>Debit</th>
            </tr>
          </thead>
          <tbody>
            {
              data.transactions.map(t => (
                <tr key={t.id}>
                  <td>{t.description}</td>
                  <td>{t.amount}</td>
                  <td>{t.credit ? 'yes' : 'no'}</td>
                  <td>{t.debit ? 'yes' : 'no'}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      )
    }}
  </Query>
)

const ADD_TRANSACTION = gql`
  mutation AddTransaction($amount: Float, $credit: Boolean, $debit: Boolean, $description: String) {
    addTransaction(amount: $amount, credit: $credit, debit: $debit, description: $description) {
      id
      amount
      credit
      debit
      description
    }
  }
`

const transactionDefaults = {
  description: '',
  debit: false,
  credit: false,
  amount: 0
}

const AddTransaction = ({ onClose }) => (
  <Mutation
    mutation={ADD_TRANSACTION}
    update={(cache, { data: { addTransaction } }) => {
      const { transactions } = cache.readQuery({ query: GET_TRANSACTIONS })
      cache.writeQuery({
        query: GET_TRANSACTIONS,
        data: { transactions: transactions.concat([addTransaction]) }
      })
    }}>
    {(AddTransaction, { data }) => (
      <div>
        <FormContainer defaultFields={transactionDefaults}>
          {({ fields, onChange }) => (
            <form
              onSubmit={e => {
                e.preventDefault()
                AddTransaction({ variables: fields })
                onClose()
              }}
            >
              <LabeledNumberInput
                label='Amount'
                onChange={(_, amount) => onChange({ amount })}
                type='number'
                value={fields.amount} />
              <LabeledInput
                label='Description'
                onChange={ev => onChange({ description: ev.target.value })}
                value={fields.description} />
              <Checkbox
                checked={fields.debit}
                label='Debit'
                onChange={ev => onChange({ debit: ev.target.checked })} />
              <Checkbox
                checked={fields.credit}
                label='Credit'
                onChange={ev => onChange({ credit: ev.target.checked })} />

              <button type='submit'>Submit</button>
              <button onClick={onClose}>Cancel</button>
            </form>
          )}
        </FormContainer>
      </div>
    )}
  </Mutation>
)

AddTransaction.propTypes = {
  onClose: PropTypes.func
}

export class Transactions extends React.Component {
  state = {
    openAddForm: false
  }

  handleAdd = () => {
    this.setState({ openAddForm: true })
  }

  handleClose = () => {
    this.setState({ openAddForm: false })
  }

  render () {
    return (
      <>

        {
          this.state.openAddForm
            ? <AddTransaction onCancel={this.handleClose} />
            : (
              <button onClick={this.handleAdd}>
                Add
              </button>
            )
        }

        <h2>Transactions</h2>
        <TransactionsList />
      </>
    )
  }
}
