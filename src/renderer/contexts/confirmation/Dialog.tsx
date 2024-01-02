import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { IConfirmDialogProps } from '@app/contexts/confirmation/ConfirmationProvider';

export const ConfirmDialog = ({
  open,
  hideOkBtn = false,
  showCancel,
  title = '',
  description = '',
  okText = 'Confirm',
  cancelText = 'Cancel',
  alertDialog,
  onOk,
  onClose,
  isCloseIcon = false,
}: IConfirmDialogProps) => {
  return (
    <BaseModal
      open={open}
      onCancel={onClose}
      closeIcon={Boolean(alertDialog)}
      destroyOnClose
      width={444}
      footer={null}
    >
      <div>
        <BaseTypography.Title level={3}>{title}</BaseTypography.Title>
        {description && (
          <BaseTypography.Paragraph>{description}</BaseTypography.Paragraph>
        )}
      </div>
      <div className="flex justify-center">
        <BaseButton htmlType="button" onClick={onClose} className="mr-4">
          {cancelText}
        </BaseButton>
        <BaseButton type="primary" danger htmlType="button" onClick={onOk}>
          {okText}
        </BaseButton>
      </div>
    </BaseModal>
  );
};
