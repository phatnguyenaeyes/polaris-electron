import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import { Col, RadioChangeEvent, RadioGroupProps, Row, Space } from 'antd';
import classNames from 'classnames';
import _map from 'lodash/map';
import { FieldError } from 'react-hook-form';

const { Button: RadioButton } = BaseRadio;

interface SelectItem {
  label: string;
  value: string;
  span?: number;
  icon?: React.ReactNode;
}

type BaseRadioProps = Omit<RadioGroupProps, 'onChange'>;

export interface BaseRadioGroupProps extends BaseRadioProps {
  handleChange?: (val: string) => void;
  onChange?: (checkedValue: RadioChangeEvent) => void;
  required?: boolean;
  fieldError?: FieldError;
  label?: string;
  options?: SelectItem[];
  radioPerRow?: number;
  name: string;
}

const RadioGroup: React.FC<BaseRadioGroupProps> = (props) => {
  const { label, onChange, value, options, required, fieldError, radioPerRow, ...remaningProps } = props;
  const isError = !!fieldError;
  const radioElements = _map(options, (option) => (
    <Col span={24} lg={option.span || (radioPerRow ? Math.round(24 / radioPerRow) : 6)} key={option.value}>
      <RadioButton className="radio-group__item" value={option.value}>
        <p className="radio-group__content">
          {option.icon && <b className="radio-group__icon  flex items-center">{option.icon}</b>}
          <strong className="radio-group__label">{option.label}</strong>
        </p>
      </RadioButton>
    </Col>
  ));

  return (
    <div
      className={classNames({
        'form-item-radio-group': true,
        'form-item-radio-group--has-error': isError,
      })}
    >
      <div className="form-item_inner">
        <label className="form-item__label">
          {label} {required && <span className="text-error">*</span>}
        </label>
        <div className="pb-2">
          <div>
            <BaseRadio.Group {...remaningProps} buttonStyle="solid" onChange={onChange} value={value}>
              <Row gutter={[24, 14]}>{radioElements}</Row>
            </BaseRadio.Group>
          </div>
          {isError && (
            <Space size={4} className="text-error">
              {fieldError?.message}
            </Space>
          )}
        </div>
      </div>
    </div>
  );
};
export default RadioGroup;
