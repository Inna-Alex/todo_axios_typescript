import { format } from 'date-fns';
import * as Consts from './consts'

export const getFormatDate = (date: string) =>
  date ? format(date, Consts.DateFormat) : ''