import { Space, TimePicker, TimePickerProps } from 'antd';
import classNames from 'classnames';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

export const TIME_FORMAT = 'HH:mm:ss';

interface TimepickerFieldProps {
  fieldError?: FieldError;
  label?: string;
  required?: boolean;
  name: string;
  placeholder?: string;
}

const TimepickerFieldBase: React.FC<TimepickerFieldProps & TimePickerProps> = (props) => {
  const { required, fieldError, placeholder, label, onChange, value, ...remainingProps } = props;
  const isError = !!fieldError;
  const renderField = () => {
    return (
      <TimePicker
        {...remainingProps}
        format={TIME_FORMAT}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    );
  };

  return (
    <div
      className={classNames({
        'form-item': true,
        'form-item--has-error': isError,
      })}
    >
      <div className="form-item_inner">
        {label && (
          <label className="form-item__label">
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}

        <div className="form-item_body">{renderField()}</div>
      </div>
      {isError && (
        <Space size={4} className="text-error">
          {fieldError?.message}
        </Space>
      )}
    </div>
  );
};

const TimepickerField: React.FC<TimepickerFieldProps> = (props) => {
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
        <TimepickerFieldBase {...internalProps} onChange={onChange} value={value} fieldError={fieldState.error} />
      )}
    />
  );
};

export default TimepickerField;
