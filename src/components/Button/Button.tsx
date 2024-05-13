import React, { forwardRef, ReactNode } from 'react'
import styles from './button.module.scss'
import classnames from 'classnames'

type ButtonTypes = {
  [key: string]: string
}
type Props = {
  type?: 'button' | 'submit'
  kind: string
  onClick?: () => void
  children?: ReactNode
}

export const buttonTypes: ButtonTypes = {
  toAdd: 'toAdd',
  toUpdate: 'toUpdate',
  toDelete: 'toDelete',
  toCancel: 'toCancel',
}

const Button = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  let { type, kind, children, onClick, ...rest } = props
  type = type === 'submit' ? 'submit' : 'button'
  return (
    <button type={type} onClick={onClick}
      className={classnames(
        styles.button,
        styles[`button__${(buttonTypes as ButtonTypes)[kind]}`],
      )}
      {...rest} ref={ref}
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button