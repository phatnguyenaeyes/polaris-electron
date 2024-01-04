import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { Col, RadioChangeEvent, RadioGroupProps, Row, Space } from 'antd';
import classNames from 'classnames';
import _map from 'lodash/map';
import { FieldError } from 'react-hook-form';
import * as S from './RadioGroup.styles';

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
  displayAsTab?: boolean;
  label?: string;
  options?: SelectItem[];
  name: string;
}

const RadioGroup: React.FC<BaseRadioGroupProps> = (props) => {
  const {
    label,
    onChange,
    value,
    options,
    required,
    fieldError,
    displayAsTab,
    ...remaningProps
  } = props;
  const isError = !!fieldError;
  const radioElements = _map(options, (option) => (
    <RadioButton
      className="radio-group__item"
      key={option.value}
      value={option.value}
    >
      <p className="radio-group__content">
        {option.icon && (
          <b className="radio-group__icon  flex items-center">{option.icon}</b>
        )}
        <strong className="radio-group__label">{option.label}</strong>
      </p>
    </RadioButton>
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
            <S.BaseRadioGroup
              {...remaningProps}
              style={{ width: '100%' }}
              $displayAsTab={displayAsTab}
              buttonStyle="solid"
              onChange={onChange}
              value={value}
            >
              <BaseSpace size="large">{radioElements}</BaseSpace>
            </S.BaseRadioGroup>
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
