import React, { useState, CSSProperties } from 'react';
import Select, { StylesConfig } from 'react-select';

import styles from './filterButton.module.scss';
import { updateFilterStatus } from '../../slices/todoSlice'
import * as Consts from '../../utils/consts'
import { useAppDispatch } from '../../app/hooks'

export const statusOptions = [
  { value: Consts.Incomplete, label: 'Incomplete' },
  { value: Consts.Completed, label: 'Completed' },
]

const filterOptions = [
  { value: 'all', label: 'All' },
  ...statusOptions,
];

const controlColourStyles: CSSProperties = {
  backgroundColor: '#ecedf6',
  color: '#585858',
  fontWeight: 500,
}
const optionColourStyles = ({ isDisabled, isFocused, isSelected }: OptionState) => {
  return {
    backgroundColor: isDisabled ? '#dedfe1' : isSelected ? '#cccdde' : isFocused ? '#646681' : '#ecedf6',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    fontWeight: 500,
    color: isFocused && !isSelected ? '#fff' : '#000'
  }
}
const selectStyle: StylesConfig<OptionType, IsMulti> = {
  control: (baseStyles) => {
    return {
      ...baseStyles,
      ...controlColourStyles
    };
  },
  option: (baseStyles, state) => {
    return {
      ...baseStyles,
      ...optionColourStyles({
        isDisabled: state.isDisabled, 
        isFocused: state.isFocused,
        isSelected: state.isSelected})
    }
  }
}

function FilterButton() {
  const dispatch = useAppDispatch()
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(filterOptions[0]);
  const updateFilter = (e: OptionType | null) => {
    setSelectedOption(e)
    dispatch(updateFilterStatus(e!.value))
  }

  return (
    <Select
      className={styles.select}
      defaultValue={selectedOption}
      onChange={(e) => updateFilter(e)}
      options={filterOptions}
      styles={selectStyle}
    />
  );
}

export default FilterButton;