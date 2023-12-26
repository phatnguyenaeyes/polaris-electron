import { Button, ButtonProps } from 'antd';
import React, { PropsWithChildren, forwardRef } from 'react';
import { useTranslation } from 'react-i18next';

interface CreateTemplateProps {
  formId?: string;
  okBtnText?: string;
  saveButtonProps?: ButtonProps;
}

interface CreateTemplateFormProps extends PropsWithChildren {
  formId?: string;
}

interface CompoundedComponent {
  Form: React.ForwardRefExoticComponent<
    CreateTemplateFormProps &
      React.RefAttributes<HTMLFormElement> &
      React.FormHTMLAttributes<HTMLFormElement>
  >;
}

export const CreateTemplate: React.FC<CreateTemplateProps & PropsWithChildren> &
  CompoundedComponent = ({
  saveButtonProps,
  formId = 'basic',
  okBtnText,
  ...props
}) => {
  const { t } = useTranslation();

  return (
    <div>
      <div>{props.children}</div>
      <Button
        {...saveButtonProps}
        type="primary"
        htmlType="submit"
        form={formId}
      >
        {okBtnText || t('POLARIS.SAVE')}
      </Button>
    </div>
  );
};

// eslint-disable-next-line react/display-name
const FormForwardRef = forwardRef<HTMLFormElement, CreateTemplateFormProps>(
  (props, ref) => {
    return <form ref={ref} id="basic" {...props} />;
  },
);

CreateTemplate.Form = FormForwardRef;
