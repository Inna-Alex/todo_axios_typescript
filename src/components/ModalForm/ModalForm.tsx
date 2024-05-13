import React, { useContext, Dispatch, SetStateAction } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import classnames from 'classnames'

import styles from './modalForm.module.scss'
import { BaseChangeForm } from '../BaseChangeForm/BaseChangeForm'
import { BaseDeleteForm } from '../BaseDeleteForm/BaseDeleteForm'
import Button, { buttonTypes } from '../Button/Button'
import ThemeContext from '../../context/ThemeContext'

type Props = {
  todo?: ITodo
  type: string
  isOpen: boolean
  triggerShow: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const ModalForm = ({ isOpen, setOpen, triggerShow, type, todo }: Props) => {
  const { theme } = useContext(ThemeContext)

  return (
    <Dialog.Root open={isOpen} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        {triggerShow &&
          <Button kind={type}>
            {type === buttonTypes.toAdd ? 'Add' : 'Update'} Task
          </Button>
        }
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.DialogOverlay} />
        <Dialog.Content className={classnames(styles.DialogContent, styles[`Dialog${theme.name}`])}>
          {(type === buttonTypes.toAdd || type === buttonTypes.toUpdate) &&
            <BaseChangeForm type={type} setOpen={setOpen} todo={todo} />
          }
          {type === buttonTypes.toDelete &&
            <BaseDeleteForm type={type} setOpen={setOpen} todo={todo} />}
          <Dialog.Close asChild>
            <button className={styles.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
};

export default ModalForm;