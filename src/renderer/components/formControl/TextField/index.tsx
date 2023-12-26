import {
  BaseInput,
  BaseInputProps,
} from '@app/components/common/inputs/BaseInput/BaseInput';
import { Space } from 'antd';
import React, { ChangeEvent } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type BaseInputFieldProps = BaseInputProps;

interface TextFieldBaseProps extends BaseInputFieldProps {
  handleChange?: (val: string) => void;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  fieldError?: FieldError;
  label?: string;
  textArea?: boolean;
}

const TextFieldBase: React.FC<TextFieldBaseProps> = (props) => {
  const {
    label,
    placeholder,
    fieldError,
    disabled,
    maxLength,
    textArea = false,
    required,
    onChange,
    handleChange,
    ...remainingProps
  } = props;
  const isError = !!fieldError;
  const renderField = () => {
    if (textArea) {
      return (
        <BaseInput.TextArea
          onChange={(e) => {
            onChange && onChange(e);
            handleChange && handleChange(e.target.value);
          }}
          autoSize={{ minRows: 6, maxRows: 8 }}
          disabled={disabled}
          placeholder={placeholder}
          className="form-text-field"
          maxLength={maxLength}
          value={remainingProps.value}
        />
      );
    }

    return (
      <BaseInput
        {...(remainingProps as BaseInputFieldProps)}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(e) => {
          onChange && onChange(e);
          handleChange && handleChange(e.target.value);
        }}
        className="form-text-field"
        maxLength={maxLength}
      />
    );
  };

  return (
    <div className={`form-item${isError ? ' form-item--has-error' : ''}`}>
      <div className="form-item_inner">
        {label && (
          <label className="form-item__label">
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}
        {renderField()}
      </div>
      {isError && (
        <Space size={4} className="text-error">
          {fieldError?.message}
        </Space>
      )}
    </div>
  );
};

const TextField: React.FC<TextFieldBaseProps & { name: string }> = (props) => {
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
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <TextFieldBase
          {...internalProps}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          fieldError={fieldState.error}
        />
      )}
    />
  );
};

export default TextField;
