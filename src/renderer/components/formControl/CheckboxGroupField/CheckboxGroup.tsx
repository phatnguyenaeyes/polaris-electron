import { BaseCheckbox } from '@app/components/common/BaseCheckbox/BaseCheckbox';
import { CheckboxProps, Col, Image, Row, Space } from 'antd';
import { CheckboxValueType } from 'antd/lib/checkbox/Group';
import classNames from 'classnames';
import _map from 'lodash/map';
import { FieldError } from 'react-hook-form';

type BaseCheckboxProps = Omit<CheckboxProps, 'onChange'>;

interface SelectItem {
  label: string;
  value: string;
  span?: number;
  icon?: React.ReactNode;
  iconPath?: string;
}

export interface BaseCheckboxGroupProps extends BaseCheckboxProps {
  handleChange?: (val: string) => void;
  onChange?: (checkedValue: Array<CheckboxValueType>) => void;
  required?: boolean;
  fieldError?: FieldError;
  label?: string;
  options?: SelectItem[];
  checkboxPositionEnd?: boolean;
  checkboxPerRow?: number;
  name: string;
}

const CheckboxGroup: React.FC<BaseCheckboxGroupProps> = (props) => {
  const {
    label,
    value,
    required,
    checkboxPositionEnd,
    checkboxPerRow,
    onChange,
    options,
    fieldError,
    ...remaningProps
  } = props;
  const isError = !!fieldError;
  const checkboxElements = _map(options, (option) => (
    <Col key={option.label} span={24} lg={option.span || (checkboxPerRow ? Math.round(24 / checkboxPerRow) : 6)}>
      <BaseCheckbox className="checkbox-group__item" value={option.value}>
        <div className="checkbox-group__content">
          {option.icon && <div className="checkbox-group__icon">{option.icon}</div>}
          {option.iconPath && (
            <div className="checkbox-group__icon">
              <Image src={option.iconPath} alt={option.iconPath} width={30} height={30} preview={false} />
            </div>
          )}
          <div className="checkbox-group__label">{option.label}</div>
        </div>
      </BaseCheckbox>
    </Col>
  ));

  return (
    <div
      className={classNames({
        'form-item-checkbox-group': true,
        'form-item-checkbox-group--has-error': isError,
        'checkbox-end': checkboxPositionEnd,
      })}
    >
      <div className="form-item_inner">
        <label className="form-item__label">
          {label} {required && <span className="text-error">*</span>}
        </label>
        <div className="pb-2">
          <div>
            <BaseCheckbox.Group
              style={{
                width: '100%',
              }}
              {...remaningProps}
              value={value}
              onChange={onChange}
            >
              <Row gutter={[24, 14]}>{checkboxElements}</Row>
            </BaseCheckbox.Group>
            {isError && (
              <Space size={4} className="text-error">
                {fieldError?.message}
              </Space>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CheckboxGroup;
