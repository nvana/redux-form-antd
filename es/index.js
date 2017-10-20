'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MonthPickerField = exports.DatePickerFieldRU = exports.DatePickerField = exports.MaskedDatePickerField = exports.AutoCompleteField = exports.SliderField = exports.NumberField = exports.SwitchField = exports.TextField = exports.RadioField = exports.CheckboxField = exports.SelectCustom = exports.SelectField = exports.LazyTextField = exports.CheckboxGroupField = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _DatePicker = require('./components/DatePicker');

Object.defineProperty(exports, 'DatePickerField', {
  enumerable: true,
  get: function get() {
    return _DatePicker.DatePickerField;
  }
});
Object.defineProperty(exports, 'DatePickerFieldRU', {
  enumerable: true,
  get: function get() {
    return _DatePicker.DatePickerFieldRU;
  }
});
Object.defineProperty(exports, 'MonthPickerField', {
  enumerable: true,
  get: function get() {
    return _DatePicker.MonthPickerField;
  }
});

var _antd = require('antd');

var _lodash = require('lodash');

var _DateInput = require('components/DateInput');

var _DateInput2 = _interopRequireDefault(_DateInput);

var _BaseComponent = require('./components/BaseComponent');

var _BaseComponent2 = _interopRequireDefault(_BaseComponent);

var _SelectAntd = require('./components/SelectAntd');

var _SelectAntd2 = _interopRequireDefault(_SelectAntd);

var _MultiSelect = require('./components/MultiSelect');

var _mapError = require('./components/mapError');

var _mapError2 = _interopRequireDefault(_mapError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /**
                                                                                                                                                                                                                              * Redux-form-antd package
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * https://github.com/zhDmitry/redux-form-antd
                                                                                                                                                                                                                              *
                                                                                                                                                                                                                              * 
                                                                                                                                                                                                                              */
// $FlowFixMe: add Slider to antd flow definition


var CheckboxGroup = _antd.Checkbox.Group;

var defaultTo = function defaultTo(value, d) {
  if (!value && value !== 0) return d;
  return value;
};

var eventMap = (0, _mapError.customMap)(function (_ref) {
  var _onChange = _ref.input.onChange;
  return {
    onChange: function onChange(v) {
      return _onChange(v.target.value);
    }
  };
});

var checkboxGroupMap = (0, _mapError.customMap)(function (_ref2) {
  var _ref2$input = _ref2.input,
      onChange = _ref2$input.onChange,
      _ref2$input$value = _ref2$input.value,
      value = _ref2$input$value === undefined ? [] : _ref2$input$value;

  var newValue = defaultTo(value, []);
  return { onChange: onChange, value: newValue };
});

var sliderMap = (0, _mapError.customMap)(function (_ref3) {
  var _ref3$input = _ref3.input,
      onChange = _ref3$input.onChange,
      _ref3$input$value = _ref3$input.value,
      value = _ref3$input$value === undefined ? 0 : _ref3$input$value,
      range = _ref3.range,
      _ref3$min = _ref3.min,
      min = _ref3$min === undefined ? 0 : _ref3$min,
      _ref3$max = _ref3.max,
      max = _ref3$max === undefined ? 100 : _ref3$max;

  var newValue = defaultTo(value, range ? [min, max] : 0);
  return { onAfterChange: onChange, value: newValue };
});
var textFieldMap = (0, _mapError.customMap)(function (_ref4) {
  var _onChange2 = _ref4.input.onChange;
  return {
    onChange: function onChange(v) {
      return _onChange2(v.nativeEvent.target.value);
    }
  };
});

var selectFieldMap = (0, _mapError.customMap)(function (_ref5) {
  var _ref5$input = _ref5.input,
      _onChange3 = _ref5$input.onChange,
      value = _ref5$input.value,
      multiple = _ref5.multiple,
      options = _ref5.options,
      rest = _objectWithoutProperties(_ref5, ['input', 'multiple', 'options']);

  var newValue = value;
  if (options && options.length > 0) {
    newValue = value || (multiple ? [options[0].value] : options[0].value);
  }
  return _extends({}, rest, { onChange: function onChange(v) {
      return _onChange3(v);
    }, onSelect: function onSelect(v) {
      return _onChange3(v);
    }, value: newValue });
});
var bluredFieldMap = function bluredFieldMap(_ref6) {
  var _ref6$meta = _ref6.meta;
  _ref6$meta = _ref6$meta === undefined ? {} : _ref6$meta;

  var touched = _ref6$meta.touched,
      error = _ref6$meta.error,
      warning = _ref6$meta.warning,
      valid = _ref6$meta.valid,
      _ref6$input = _ref6.input,
      value = _ref6$input.value,
      onChange = _ref6$input.onChange,
      props = _objectWithoutProperties(_ref6, ['meta', 'input']);

  return _extends({}, props, {
    defaultValue: value,
    onBlur: function onBlur(e) {
      onChange(e.nativeEvent.target.value);
    },
    validateStatus: (0, _mapError.getValidateStatus)(touched, error, warning, valid),
    help: touched && (error || warning)
  });
};

var switchMap = (0, _mapError.customMap)(function (_ref7) {
  var value = _ref7.input.value;
  return {
    checked: value
  };
});

var autoCompleteMap = (0, _mapError.customMap)(function (_ref8) {
  var _ref8$input = _ref8.input,
      onChange = _ref8$input.onChange,
      rest = _objectWithoutProperties(_ref8$input, ['onChange']);

  // added onChange to avoid triggering selecting an option when user types it's value(ID)
  return _extends({}, rest, { onChange: _lodash.noop, onSelect: function onSelect(v) {
      return onChange(v);
    } });
});

var CheckboxGroupField = exports.CheckboxGroupField = (0, _BaseComponent2.default)(CheckboxGroup, checkboxGroupMap);

// will trigger on change only onBlur
// usefull for performance reasons
var LazyTextField = exports.LazyTextField = (0, _BaseComponent2.default)(_antd.Input, bluredFieldMap);

var SelectField = exports.SelectField = (0, _BaseComponent2.default)(_MultiSelect.SelectField, selectFieldMap);
var SelectCustom = exports.SelectCustom = (0, _BaseComponent2.default)(_SelectAntd2.default, selectFieldMap);
var CheckboxField = exports.CheckboxField = (0, _BaseComponent2.default)(_antd.Checkbox, eventMap);
var RadioField = exports.RadioField = (0, _BaseComponent2.default)(_MultiSelect.RadioField, eventMap);
var TextField = exports.TextField = (0, _BaseComponent2.default)(_antd.Input, textFieldMap);
var SwitchField = exports.SwitchField = (0, _BaseComponent2.default)(_antd.Switch, switchMap);
var NumberField = exports.NumberField = (0, _BaseComponent2.default)(_antd.InputNumber, _mapError2.default);
var SliderField = exports.SliderField = (0, _BaseComponent2.default)(_antd.Slider, sliderMap);
var AutoCompleteField = exports.AutoCompleteField = (0, _BaseComponent2.default)(_antd.AutoComplete, autoCompleteMap);
var MaskedDatePickerField = exports.MaskedDatePickerField = (0, _BaseComponent2.default)(_DateInput2.default, eventMap);