// @noflow

import React, { PureComponent } from 'react';
import FormItem from 'antd/lib/form/FormItem';

export default function createComponent(AntdComponent, mapProps) {
  class InputComponent extends PureComponent {
    getRenderedComponent() {
      return this.fieldRef;
    }

    mountRef = (ref: Object) => { this.fieldRef = ref; }

    render() {
      const {
        label,
        labelCol,
        wrapperCol,
        help,
        extra,
        validateStatus,
        hasFeedback = true,
        colon,
        floatingLabelText,
        ...rest
      } = mapProps(this.props);

      return (
        <FormItem
            colon={colon}
            extra={extra}
            hasFeedback={hasFeedback}
            help={help}
            label={label}
            labelCol={labelCol}
            ref={this.mountRef}
            validateStatus={validateStatus}
            wrapperCol={wrapperCol}
        >
          { floatingLabelText ? <label>{floatingLabelText}</label> : null }
          <AntdComponent {...rest} />
        </FormItem>
      );
    }
  }
  InputComponent.dispayName = `Redux-form${AntdComponent.dispayName}`;

  return InputComponent;
}
