'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _antd = require('antd');

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Option = _antd.Select.Option; // @noflow

var MultiSelect = function MultiSelect(_ref) {
  var dataSource = _ref.dataSource,
      value = _ref.value,
      onChange = _ref.onChange;

  var options = dataSource.map(function (d) {
    return _react2.default.createElement(
      Option,
      { key: d.id, value: d.label },
      d.label
    );
  });

  //const displayContract = value && find(dataSource, ['id', value]);
  //const { label = '' } = displayContract;
  //console.log(displayContract, value, find(dataSource, ['id', value]));

  var handleChange = function handleChange(val) {
    return onChange((0, _lodash.find)(dataSource, ['label', val]).id);
  };

  return _react2.default.createElement(
    _antd.Select,
    {
      defaultValue: value,
      onChange: handleChange,
      showArrow: true
    },
    options
  );
};

exports.default = MultiSelect;