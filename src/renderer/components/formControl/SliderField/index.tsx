import { BaseSlider, BaseSliderProps } from '@app/components/common/BaseSlider/BaseSlider';
import { Space } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type BaseSliderFieldProps = BaseSliderProps;

// interface NumberFieldBaseProps extends Omit<BaseSwitchProps, 'onChange'> {
interface SliderFieldProps extends BaseSliderFieldProps {
  handleChange?: (val: string) => void;
  required?: boolean;
  // onChange?: (checked: boolean) => void;
  fieldError?: FieldError;
  label?: string;
  hideError?: boolean;
}

const SliderFieldBase: React.FC<Partial<SliderFieldProps>> = (props) => {
  const { required, fieldError, label, onChange, ...remainingProps } = props;
  const isError = !!fieldError;
  const renderField = () => {
    return (
      <BaseSlider
        {...remainingProps}
        onChange={(value) => {
          // console.log('checked:', checked)
          onChange && onChange(value);
        }}
      />
    );
  };

  return (
    <div
      className={classNames({
        'form-item': true,
        'form-item_switch': true,
        'form-item--has-error': isError,
      })}
    >
      {label && (
        <label className="form-item__label">
          {label} {required && <span className="text-error">*</span>}
        </label>
      )}

      <div className="form-item_body">{renderField()}</div>
      {isError && (
        <Space size={4} className="text-error">
          {fieldError?.message}
        </Space>
      )}
    </div>
  );
};

const SliderField = (props: SliderFieldProps & { name: string }): JSX.Element => {
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
        <SliderFieldBase {...internalProps} onChange={onChange} value={value} fieldError={fieldState.error} />
      )}
    />
  );
};

export default SliderField;
