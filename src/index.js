/**
 * Redux-form-antd package
 *
 * https://github.com/zhDmitry/redux-form-antd
 *
 * @flow
 */
// $FlowFixMe: add Slider to antd flow definition
import { Checkbox, Input, Slider, InputNumber, Switch, AutoComplete } from 'antd';
import { noop as NOOP } from 'lodash';

import DateInput from 'components/DateInput';

import createComponent from './components/BaseComponent';
import SelectAntd from './components/SelectAntd';
import {
  RadioField as Radio,
  SelectField as Select
} from './components/MultiSelect';
import mapError, { customMap, getValidateStatus} from './components/mapError';

const CheckboxGroup = Checkbox.Group;

const defaultTo = (value, d) => {
  if (!value && value !== 0) return d;
  return value;
};

const eventMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.target.value)
}));

const checkboxGroupMap = customMap(({ input: { onChange, value = [] } }) => {
  const newValue = defaultTo(value, []);
  return { onChange, value: newValue };
});

const sliderMap = customMap(
  ({ input: { onChange, value = 0 }, range, min = 0, max = 100 }) => {
    const newValue = defaultTo(value, range ? [min, max] : 0);
    return { onAfterChange: onChange, value: newValue };
  }
);
const textFieldMap = customMap(({ input: { onChange } }) => ({
  onChange: v => onChange(v.nativeEvent.target.value)
}));

const selectFieldMap = customMap(
  ({ input: { onChange, value }, multiple, options, ...rest }) => {
    let newValue = value;
    if (options && options.length > 0) {
      newValue = value || (multiple ? [options[0].value] : options[0].value);
    }
    return {...rest, onChange: v => onChange(v), onSelect: (v) => onChange(v), value: newValue };
  }
);
const bluredFieldMap = ({
    meta: {touched, error, warning, valid} = {},
    input: {value, onChange},
    ...props
  }) => ({
    ...props,
    defaultValue: value,
    onBlur: e => {
      onChange(e.nativeEvent.target.value);
    },
    validateStatus: getValidateStatus(touched, error, warning, valid),
    help: touched && (error || warning)
  });

const switchMap = customMap(({input: {value}}) => ({
  checked: value
}));

const autoCompleteMap = customMap(({ input: { onChange, ...rest } }) => {
  // added onChange to avoid triggering selecting an option when user types it's value(ID)
  return { ...rest, onChange: NOOP, onSelect: (v) => onChange(v) };
});

export const CheckboxGroupField = createComponent(
  CheckboxGroup,
  checkboxGroupMap
);

// will trigger on change only onBlur
// usefull for performance reasons
export const LazyTextField = createComponent(
  Input,
  bluredFieldMap
);

export const SelectField = createComponent(Select, selectFieldMap);
export const SelectCustom = createComponent(SelectAntd, selectFieldMap);
export const CheckboxField = createComponent(Checkbox, eventMap);
export const RadioField = createComponent(Radio, eventMap);
export const TextField = createComponent(Input, textFieldMap);
export const SwitchField = createComponent(Switch, switchMap);
export const NumberField = createComponent(InputNumber, mapError);
export const SliderField = createComponent(Slider, sliderMap);
export const AutoCompleteField = createComponent(AutoComplete, autoCompleteMap);
export const MaskedDatePickerField = createComponent(DateInput, eventMap);

export { DatePickerField, DatePickerFieldRU, MonthPickerField } from './components/DatePicker';
