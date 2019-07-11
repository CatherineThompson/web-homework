import React from 'react'
import PropTypes from 'prop-types'

export class FormContainer extends React.Component {
  state = {
    fields: this.props.defaultFields
  }

  handleChange = (fields) => {
    const newFields = {
      ...this.state.fields,
      ...fields
    }

    this.setState({ fields: newFields })
  }

  render () {
    return (
      this.props.children({
        fields: this.state.fields,
        onChange: this.handleChange
      })
    )
  }
}

FormContainer.propTypes = {
  children: PropTypes.func,
  defaultFields: PropTypes.object
}
