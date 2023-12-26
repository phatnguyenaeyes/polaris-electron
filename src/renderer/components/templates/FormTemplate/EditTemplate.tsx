import { Button, ButtonProps } from 'antd';
import React, { PropsWithChildren, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

interface EditTemplateProps {
  formId?: string;
  title?: string;
  hideButton?: boolean;
  okBtnText?: string;
  saveButtonProps?: ButtonProps;
}

interface EditTemplateFormProps extends PropsWithChildren {
  formId?: string;
}

interface CompoundedComponent {
  Form: React.ForwardRefExoticComponent<
    EditTemplateFormProps & React.RefAttributes<HTMLFormElement> & React.FormHTMLAttributes<HTMLFormElement>
  >;
}

export const EditTemplate: React.FC<EditTemplateProps & PropsWithChildren> & CompoundedComponent = ({
  saveButtonProps,
  formId = 'basic-edit',
  title,
  okBtnText,
  hideButton = false,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div>
      {title && <div>{title || 'Edit'}</div>}
      <div>{props.children}</div>
      {!hideButton ? (
        <Button {...saveButtonProps} type="primary" htmlType="submit" form={formId}>
          {okBtnText || t('POLARIS.UPDATE')}
        </Button>
      ) : null}
    </div>
  );
};

const FormForwardRef = forwardRef<HTMLFormElement, EditTemplateFormProps>((props, ref) => {
  return <form ref={ref} id="basic-edit" {...props} />;
});

EditTemplate.Form = FormForwardRef;
