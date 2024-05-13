interface ITodo {
  id: string
  title: string
  status: string
  time: string
}
interface ITodoStatus {
  label: string
  value: string
}
interface ITitleStatus {
  title: string
  status: string
}
interface ITodoForm {
  id?: string
  title: string
  todoStatus?: ITodoStatus
  time?: string
}
type TodoType = ITodoForm & {
  status?: string
}
type FormProps = {
  type: string
  todo?: ITodo | TodoFormType
  setOpen: Dispatch<SetStateAction<boolean>>
}

interface IProps {
  isChecked: boolean,
  onCheck: () => void
}

interface ICounter {
  counter: number
}

type OptionType = {
  label: string
  value: string
}
type OptionState = {
  isDisabled: boolean
  isFocused: boolean
  isSelected: boolean
}
type IsMulti = false
