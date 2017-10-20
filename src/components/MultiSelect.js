// @noflow

import React from 'react';
import { Radio, Select } from 'antd';

const Option = Select.Option;
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;
const getEmptyArr = () => {};

type Props = { labelKey?: string, optionsKey?: string, valueKey?: string };

const withOptions = (OptionType, getType) => Component =>
  class MultiSelect extends React.PureComponent {
    static defaultProps = {
      valueKey: 'Id',
      labelKey: 'Label',
      optionsKey: 'options'
    };

    props: Props;
    container: HTMLElement;

    mountRef = (ref: HTMLElement) => { this.container = ref; }

    getContainer = () => this.container;

    render() {
      const props = this.props;
      let OptionElement = OptionType;

      if (getType) {
        OptionElement = getType(props);
      }
      const { labelKey, optionsKey, valueKey } = props;
      const options = (optionsKey && this.props[optionsKey]) || getEmptyArr();

      return (
        <div>
          <div ref={this.mountRef} />
          <Component getPopupContainer={this.getContainer} {...props}>
            {options.map(
              ({[valueKey]: value, [labelKey]: label, ...rest}, key) => (
                <OptionElement {...rest} key={key} value={String(value)}>
                  {label}
                </OptionElement>
              )
            )}
          </Component>
        </div>
      );
    }
  };

export const RadioField = withOptions(
  null,
  ({ button }) => (button ? RadioButton : Radio)
)(RadioGroup);
export const SelectField = withOptions(Option)(Select);
