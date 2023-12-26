import { Space } from 'antd';
import classNames from 'classnames';
import { Controller, FieldError, useFormContext } from 'react-hook-form';
import { NumericFormat, NumericFormatProps } from 'react-number-format';

type BaseInputNumberProps = NumericFormatProps;

interface NumberFieldBaseProps extends Omit<BaseInputNumberProps, 'onChange'> {
  handleChange?: (val: string) => void;
  onChange?: (string: number | undefined) => void;
  fieldError?: FieldError;
  label?: string;
  hideError?: boolean;
}

const NumberFieldBase: React.FC<Partial<NumberFieldBaseProps>> = (props) => {
  const { required, fieldError, suffix, label, disabled, isAllowed, onChange, ...remainingProps } = props;
  const isError = !!fieldError;
  const renderField = () => {
    return (
      <NumericFormat
        {...remainingProps}
        min={0}
        isAllowed={isAllowed}
        onValueChange={(values) => {
          onChange && onChange(values.floatValue as number);
        }}
        allowLeadingZeros
        disabled={disabled}
        decimalSeparator=","
        thousandSeparator="."
      />
    );
  };

  return (
    <div
      className={classNames({
        'form-item': true,
        'form-item--has-error': isError,
        'form-item-suffix': !!suffix,
      })}
    >
      <div className="form-item_inner">
        {label && (
          <label className="form-item__label">
            {label} {required && <span className="text-error">*</span>}
          </label>
        )}

        <div className="form-item_body form-item_number">
          {renderField()}
          {suffix && <div className="form-item_suffix">{suffix}</div>}
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

const NumberField = (props: NumberFieldBaseProps & { name: string }): JSX.Element => {
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
        <NumberFieldBase
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

export default NumberField;
