import React from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
import { CheckIcon } from '@radix-ui/react-icons';
import styles from './checkboxMain.module.scss';


const CheckboxMain = ({ isChecked, onCheck }: IProps) => {
  const rootClass = isChecked ? styles.CheckboxRootChecked : styles.CheckboxRoot

  return (
    <Checkbox.Root className={rootClass} checked={isChecked} onCheckedChange={onCheck}>
      <Checkbox.Indicator className={styles.CheckboxIndicator}>
        <CheckIcon />
      </Checkbox.Indicator>
    </Checkbox.Root>
  )
};

export default CheckboxMain;