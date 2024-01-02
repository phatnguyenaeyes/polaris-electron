import { Controller, useFormContext } from 'react-hook-form';

import RadioGroup, { BaseRadioGroupProps } from './RadioGroup';

const RadioGroupField: React.FC<BaseRadioGroupProps> = (props) => {
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
        <RadioGroup
          {...internalProps}
          onChange={onChange}
          value={value}
          fieldError={fieldState.error}
        />
      )}
    />
  );
};

export default RadioGroupField;
