import React from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

const containerStyle = css`
  display: flex;
  align-items: center;
  padding: 8px;
  width: 200px;
`

const inputStyle = css`
  margin-right: 8px;
`

const LabeledInput = ({ label, ...other }) => (
  <div css={containerStyle}>
    <input css={inputStyle} type='checkbox' {...other} />
    <label>{label}</label>
  </div>
)

LabeledInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  checked: PropTypes.bool
}

export default LabeledInput
