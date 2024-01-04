import {
  BaseSelect,
  BaseSelectProps,
} from '@app/components/common/selects/BaseSelect/BaseSelect';
import { Space } from 'antd';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type BaseSelectFieldProps = BaseSelectProps &
  React.RefAttributes<HTMLDivElement>;

interface SelectItem {
  label: string;
  value: string;
}

interface SelectBaseProps extends BaseSelectFieldProps {
  handleChange?: (val: string) => void;
  fieldError?: FieldError;
  options?: SelectItem[];
  label?: string;
  required?: boolean;
  name: string;
}

const SelectFieldBase: React.FC<SelectBaseProps> = (props) => {
  const {
    value,
    label,
    required,
    placeholder,
    disabled,
    options,
    loading,
    handleChange,
    allowClear = true,
    onSearch,
    fieldError,
    onChange,
    ...remainingProps
  } = props;
  const isError = !!fieldError;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectChange = (selected: any) => {
    onChange && onChange(selected, []);
    if (typeof handleChange === 'function') {
      handleChange(selected);
    }
  };

  return (
    <div
      className={`form-item${isError ? ' form-item--has-error' : ''}${
        disabled ? ' form-item--disabled' : ''
      }`}
    >
      <div className="form-item_inner">
        {label && (
          <label className="form-item__label">
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}
        <div className="form-item__control">
          <BaseSelect
            {...(remainingProps as SelectBaseProps)}
            disabled={disabled}
            allowClear={allowClear}
            className="form-select-field"
            placeholder={placeholder}
            value={value || undefined}
            onChange={onSelectChange}
            loading={loading}
            showSearch
            optionFilterProp="children"
            onSearch={onSearch}
            filterOption={(input, option) =>
              ((option?.label ?? '') as string)
                .toLowerCase()
                .includes(input.toLowerCase())
            }
            options={options}
          />
        </div>
      </div>
      {isError && (
        <Space size={4} className="text-error">
          {fieldError?.message}
        </Space>
      )}
    </div>
  );
};

const SelectField: React.FC<SelectBaseProps> = (props) => {
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
      rules={{
        required: props?.required,
      }}
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <SelectFieldBase
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

export default SelectField;
