import { CaretDownOutlined, CloseOutlined } from '@ant-design/icons';
import classNames from 'classnames';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import Select, {
  components,
  DropdownIndicatorProps,
  MultiValueRemoveProps,
  PropsValue,
} from 'react-select';

export interface SelectItem {
  label: string;
  value: string;
}

interface SelectBaseProps {
  onChange?: (newValue: PropsValue<SelectItem>) => void;
  handleChange?: (newValue: PropsValue<SelectItem>) => void;
  fieldError?: FieldError;
  options?: SelectItem[];
  name: string;
  label?: string;
  placeholder?: string;
  required?: boolean;
  isMulti?: boolean;
  isDisabled?: boolean;
  value?: PropsValue<SelectItem>;
}

const MultiValueRemove = (props: MultiValueRemoveProps<any>) => {
  return (
    <components.MultiValueRemove {...props}>
      <span className="relative lg:top-[-1px]">
        <CloseOutlined />
      </span>
    </components.MultiValueRemove>
  );
};

const DropdownIndicator = (props: DropdownIndicatorProps<any, true>) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownOutlined />
    </components.DropdownIndicator>
  );
};

const SelectFieldBase: React.FC<Omit<SelectBaseProps, 'children'>> = (
  props,
) => {
  const {
    isMulti,
    fieldError,
    label,
    required,
    options,
    onChange,
    handleChange,
    isDisabled,
    ...remainingProps
  } = props;
  const renderField = () => {
    return (
      <Select
        isMulti={isMulti}
        isDisabled={isDisabled}
        className="react-select_selector"
        classNamePrefix="rselect"
        components={{
          MultiValueRemove,
          IndicatorSeparator: () => null,
        }}
        {...remainingProps}
        onChange={(option) => {
          onChange && onChange(option);
          option && handleChange && handleChange(option);
        }}
        options={options}
      />
    );
  };

  return (
    <div
      className={classNames({
        'field-item': true,
        'field-item_reactselect': true,
        'w-full': true,
        // 'field-item--has-value': Boolean(props.value),
        'field-item--has-error': Boolean(fieldError),
      })}
    >
      <div className="form-item_inner">
        {label && (
          <label className="form-item__label">
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}
        <div className="form-item__control">{renderField()}</div>

        {fieldError && (
          <div className="mt-2 text-error">
            {(fieldError as any)?.label?.message ||
              (fieldError as any)?.value?.message ||
              fieldError?.message}
          </div>
        )}
      </div>
    </div>
  );
};

const ReactSelectField = (props: Omit<SelectBaseProps, 'children'>) => {
  const { control } = useFormContext();
  const internalProps = {
    ...props,
  };
  return (
    <Controller
      {...props}
      name={props.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <SelectFieldBase
          {...internalProps}
          onChange={onChange}
          value={value}
          fieldError={fieldState.error}
        />
      )}
    />
  );
};

export default ReactSelectField;
