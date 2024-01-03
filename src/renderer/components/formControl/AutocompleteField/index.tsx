import {
  BaseAutoComplete,
  BaseAutoCompleteProps,
} from '@app/components/common/BaseAutoComplete/BaseAutoComplete';
import { Space } from 'antd';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

interface AutoCompleteFieldBaseProps extends BaseAutoCompleteProps {
  onChange?: (val: string) => void;
  handleChange?: (val: string) => void;
  fieldError?: FieldError;
  required?: boolean;
  label?: string;
}

const AutocompleteFieldBase: React.FC<AutoCompleteFieldBaseProps> = (props) => {
  const {
    label,
    placeholder,
    fieldError,
    disabled,
    maxLength,
    required,
    onChange,
    handleChange,
    ...remainingProps
  } = props;
  const isError = !!fieldError;
  const renderField = () => {
    return (
      <BaseAutoComplete
        {...(remainingProps as BaseAutoCompleteProps)}
        disabled={disabled}
        placeholder={placeholder}
        onChange={(val: string) => {
          onChange && onChange(val);
          handleChange && handleChange(val);
        }}
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

const AutocompleteField: React.FC<
  AutoCompleteFieldBaseProps & { name: string }
> = (props) => {
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
        <AutocompleteFieldBase
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

export default AutocompleteField;
