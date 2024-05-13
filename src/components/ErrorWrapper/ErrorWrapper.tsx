import React from 'react';
import styles from './ErrorWrapper.module.scss'

interface PropMessage {
  message?: string
}

function ErrorWrapper({ message }: PropMessage) {
  return (
    <div className={styles.errorText}>
      {message}
    </div>
  )
}

export default ErrorWrapper