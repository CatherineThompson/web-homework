import React from 'react'
import LabeledInput from './LabeledInput'
import PropTypes from 'prop-types'

const LabeledNumberInput = ({ label, onChange, value }) => (
  <LabeledInput
    label={label}
    onChange={ev => onChange(ev, ev.target.value === '' ? null : Number(ev.target.value))}
    type='number'
    value={value} />
)

export default LabeledNumberInput

LabeledNumberInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.number
}
