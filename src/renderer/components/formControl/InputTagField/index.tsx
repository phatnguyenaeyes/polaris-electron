import classNames from 'classnames';
import React from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { TagsInput, TagsInputProps } from 'react-tag-input-component';
import styled from 'styled-components';

type BaseInputTagProps = TagsInputProps & {
  label?: string;
  required?: boolean;
};

interface NumberFieldBaseProps extends Omit<BaseInputTagProps, 'onChange'> {
  handleChange?: (selected: string[]) => void;
  onChange?: (selected: string[]) => void;
  fieldError?: FieldError;
  label?: string;
  hideError?: boolean;
}

const InputTagFieldBase: React.FC<Partial<NumberFieldBaseProps>> = (props) => {
  const { required, name, label, fieldError, hideError = false, onChange, handleChange, value, placeHolder } = props;
  const renderField = () => {
    return (
      <TagsInput
        value={value}
        classNames={{
          tag: 'tag-container',
          input: 'input-container',
        }}
        onChange={(tags) => {
          onChange && onChange?.(tags);
          handleChange && handleChange?.(tags);
        }}
        name={name}
        placeHolder={placeHolder}
      />
    );
  };

  return (
    <div
      className={classNames({
        'field-item': true,
        'field-item_inputtag': true,
        'field-item--has-error': fieldError,
      })}
    >
      <div className="field-item_inner">
        {label && (
          <label className="field-item__label">
            {label} {required && <span>*</span>}
          </label>
        )}

        <div className="field-item_body">
          <StyledTagInputWrapper>{renderField()}</StyledTagInputWrapper>
        </div>
      </div>
      {fieldError && !hideError && <div style={{ color: '#ff4d4f' }}>{fieldError?.message}</div>}
    </div>
  );
};

const InputTagField = (props: NumberFieldBaseProps & { name: string }) => {
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
      name={props.name}
      control={control}
      render={({ field: { onChange, onBlur, value }, fieldState }) => (
        <InputTagFieldBase
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

const StyledTagInputWrapper = styled.div`
  .rti--container {
    background-color: transparent;
  }

  .input-container {
    background-color: #25284b;
  }

  .tag-container {
    color: #000;
  }
`;

export default InputTagField;
