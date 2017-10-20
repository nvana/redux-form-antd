// @noflow

import React from 'react';
import { Select } from 'antd';
import { find } from 'lodash';

const Option = Select.Option;

type Props = {
  dataSource: Object,
  value: string,
  selectColor: Function,
  onChange: Function
};

const MultiSelect = ({ dataSource, value, onChange }: Props) => {
  const options = dataSource.map(d => <Option key={d.id} value={d.label} >{d.label}</Option>);

  //const displayContract = value && find(dataSource, ['id', value]);
  //const { label = '' } = displayContract;
  //console.log(displayContract, value, find(dataSource, ['id', value]));

  const handleChange = (val) => onChange(find(dataSource, ['label', val]).id);

  return (
    <Select
        defaultValue={value}
        onChange={handleChange}
        showArrow
    >
      {options}
    </Select>
  );
};

export default (MultiSelect);
