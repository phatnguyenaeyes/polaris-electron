import { BaseSwitch } from '@app/components/common/BaseSwitch/BaseSwitch';
import { Space, SwitchProps } from 'antd';
import classNames from 'classnames';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type BaseSwitchProps = SwitchProps;
interface SwitchFieldProps extends BaseSwitchProps {
  handleChange?: (val: string) => void;
  required?: boolean;
  onChange?: (checked: boolean) => void;
  fieldError?: FieldError;
  label?: string;
  hideError?: boolean;
  desc?: string;
}

const SwitchFieldBase: React.FC<Partial<SwitchFieldProps>> = (props) => {
  const { required, fieldError, label, onChange, ...remainingProps } = props;
  const isError = !!fieldError;
  const renderField = () => {
    return (
      <BaseSwitch
        {...remainingProps}
        onChange={(checked) => {
          // console.log('checked:', checked)
          onChange && onChange(checked);
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

      <div className="form-item_body">
        <Space align="baseline">
          {renderField()} {props?.desc ? <p>{props?.desc}</p> : null}
        </Space>
      </div>
      {isError && (
        <Space size={4} className="text-error">
          {fieldError?.message}
        </Space>
      )}
    </div>
  );
};

const SwitchField = (props: SwitchFieldProps & { name: string }): JSX.Element => {
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
        <SwitchFieldBase
          {...internalProps}
          onChange={onChange}
          checked={value}
          fieldError={fieldState.error}
          desc={props?.desc}
        />
      )}
    />
  );
};

export default SwitchField;
