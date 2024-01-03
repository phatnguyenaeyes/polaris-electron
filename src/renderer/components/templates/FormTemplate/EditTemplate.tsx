import { ButtonContainer } from '@app/components/buttonContainer';
import {
  BaseButton,
  BaseButtonProps,
} from '@app/components/common/BaseButton/BaseButton';
import React, { PropsWithChildren, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

interface EditTemplateProps {
  formId?: string;
  title?: string;
  hideButton?: boolean;
  okBtnText?: string;
  saveButtonProps?: BaseButtonProps;
  showCancel?: boolean;
  onCancel?: () => void;
}

interface EditTemplateFormProps extends PropsWithChildren {
  formId?: string;
}

interface CompoundedComponent {
  Form: React.ForwardRefExoticComponent<
    EditTemplateFormProps &
      React.RefAttributes<HTMLFormElement> &
      React.FormHTMLAttributes<HTMLFormElement>
  >;
}

export const EditTemplate: React.FC<EditTemplateProps & PropsWithChildren> &
  CompoundedComponent = ({
  saveButtonProps,
  formId = 'basic-edit',
  title,
  okBtnText,
  hideButton = false,
  showCancel = false,
  onCancel,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div>
      {title && <div>{title || 'Edit'}</div>}
      <div>{props.children}</div>
      <ButtonContainer>
        {showCancel && (
          <BaseButton
            htmlType="button"
            onClick={onCancel}
            loading={saveButtonProps?.loading}
          >
            Cancel
          </BaseButton>
        )}
        {!hideButton ? (
          <BaseButton
            {...saveButtonProps}
            type="primary"
            htmlType="submit"
            form={formId}
          >
            {okBtnText || t('POLARIS.UPDATE')}
          </BaseButton>
        ) : null}
      </ButtonContainer>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const FormForwardRef = forwardRef<HTMLFormElement, EditTemplateFormProps>(
  (props, ref) => {
    return <form ref={ref} id="basic-edit" {...props} />;
  },
);

EditTemplate.Form = FormForwardRef;
