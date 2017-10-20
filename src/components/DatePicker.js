// @noflow

import moment from 'moment';
import { DatePicker } from 'antd';

import { customMap } from './mapError';
import createComponent from './BaseComponent';

const MonthPicker = DatePicker.MonthPicker;

const datePickerMap = customMap(({input: {onChange, value}, dateFormat}) => {
  let newValue = value;

  if (value !== '') {
    newValue = moment(value, dateFormat);
  }
  return {onChange: (e, v) => onChange(v), value: newValue, format: dateFormat};
});

// datepicker has some problems with formating this this component doesn't have such problems
const datePickerMapRU = customMap(
  ({input: {onChange, value}, displayFormat, valueFormat}) => {
    let newValue = value;

    if (value !== '') {
      newValue = moment(value);
    }
    return {
      onChange: (e) => {
        onChange(e.format(valueFormat));
      },
      value: newValue,
      format: displayFormat
    };
  }
);

export const DatePickerFieldRU = createComponent(DatePicker, datePickerMapRU);
export const DatePickerField = createComponent(DatePicker, datePickerMap);
export const MonthPickerField = createComponent(MonthPicker, datePickerMap);
