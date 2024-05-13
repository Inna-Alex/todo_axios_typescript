import React, { useState } from 'react';

import styles from './headerButtons.module.scss';
import { buttonTypes } from '../Button/Button'
import FilterButton from '../FilterButton/FilterButton';
import ModalForm from '../ModalForm/ModalForm'

function HeaderButtons() {
  const [open, setOpen] = useState(false)
  return (
    <div className={styles.headerButtons}>
      <div className={styles.toFlex}>
        <ModalForm isOpen={open} setOpen={setOpen} triggerShow={true} type={buttonTypes.toAdd} />
      </div>
      <div className={styles.toFlex}>
        <FilterButton/>
      </div>
    </div>
  )
}

export default HeaderButtons