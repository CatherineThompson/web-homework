import React from 'react'
import { css } from '@emotion/core'
import PropTypes from 'prop-types'

const containerStyle = css`
    display: flex;
    flex-direction: column;
    padding: 8px;
    width: 200px;
`

const labelStyle = css`
  margin-bottom: 8px;
`

const LabeledInput = ({ label, ...other }) => (
  <div css={containerStyle}>
    <label css={labelStyle}>{label}</label>
    <input {...other} />
  </div>
)

LabeledInput.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.any,
  type: PropTypes.string
}

export default LabeledInput
