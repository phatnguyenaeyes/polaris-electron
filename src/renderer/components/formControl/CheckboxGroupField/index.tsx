import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import CheckboxGroup, { BaseCheckboxGroupProps } from './CheckboxGroup';

const CheckboxGroupField: React.FC<BaseCheckboxGroupProps> = (props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const internalProps = {
    ...props,
    errors,
  };
  return (
    <Controller
      {...props}
      name={props.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <CheckboxGroup {...internalProps} onChange={onChange} value={value} fieldError={fieldState.error} />
      )}
    />
  );
};

export default CheckboxGroupField;
