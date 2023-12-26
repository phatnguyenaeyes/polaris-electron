import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import UploadListField from '@app/components/formControl/UploadListField';
import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

interface ImportFormInterface {
  fileImport: any;
}

interface ModalImportAnswerProps {
  open: boolean;
  onClose: () => void;
}

const ModalImportAnswer: React.FC<ModalImportAnswerProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const importAnswerFormSchema = yup.object().shape({
    fileImport: yup.array().min(1, 'Vui lòng chọn ít nhất một tuỳ chọn').required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const importFormMethods = useForm<ImportFormInterface>({
    resolver: yupResolver(importAnswerFormSchema),
  });

  const onCreateSubmitForm = (values: any) => {
    console.log('values:', values);
  };
  return (
    <BaseModal title={'Tải lên thư viện câu trả lời'} open={open} footer={null}>
      <FormProvider {...importFormMethods}>
        <form onSubmit={importFormMethods.handleSubmit(onCreateSubmitForm)}>
          <UploadListField
            showDownloadIcon
            required
            excelOnly
            placeholder="Tải tệp lên"
            notAllowDelete={true}
            label="File import"
            helpText={'Định dạng .xlsx'}
            name="fileImport"
            maxLength={1}
          />
          <ButtonContainer>
            <BaseButton
              htmlType="button"
              onClick={() => {
                onClose();
              }}
            >
              {t('POLARIS.CANCEL')}
            </BaseButton>
            <BaseButton type="primary" htmlType="submit">
              {t('POLARIS.SAVE')}
            </BaseButton>
          </ButtonContainer>
        </form>
      </FormProvider>
    </BaseModal>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;

export default ModalImportAnswer;
