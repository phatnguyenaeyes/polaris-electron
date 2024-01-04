import { LeftOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { BasicTableRow, Pagination } from '@app/api/table.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSortPaginationTable } from '@app/components/common/BaseSortPaginationTable/BaseSortPaginationTable';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import { MoreIcon } from '@app/components/common/icons/MoreIcon';

import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import { CreateTemplate } from '@app/components/templates/FormTemplate/CreateTemplate';
import { notificationController } from '@app/controllers/notificationController';
import * as PS from '@app/pages/Pages.styles';
import { categoryQuestionsService } from '@app/services/categoryQuetions.service';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dropdown,
  message,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const initialPagination = {
  total: 0,
};

const CategoryQuestionsCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageNumRef = useRef<any>();

  const formSchema = yup.object().shape({
    videoStart: yup
      .array()
      .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
    videoEnd: yup
      .array()
      .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<any>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      answerSubject: [
        {
          answer: '',
          livestreamTime: '',
        },
      ],
    },
  });

  const onSubmitForm = () => {};

  const [tableData, setTableData] = useState<{
    data: BasicTableRow[];
    pagination: Pagination;
    loading: boolean;
  }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });

  async function getList(page?: number) {
    try {
      try {
        setTableData({ ...tableData, loading: true });
        const res = await categoryQuestionsService.getList({
          page: page || 1,
          pageSize: 10,
        });

        pageNumRef.current = page;
        const data = res.data;

        const pagination = {
          total: res.total_data,
        };
        setTableData({ data: data, pagination, loading: false });
      } catch (error) {}
    } catch (error) {}
  }

  const handleDelete = async ({ id }: any) => {
    try {
      await categoryQuestionsService.delete({ id });
      notificationController.success({ message: 'Success to delete!' });
    } catch (error) {
      notificationController.error({ message: 'Fail to delete!' });
    }
  };

  const tableHandler = (params: Record<string, unknown>) => {
    const page = params?.page || 1;
    pageNumRef.current = page;
    getList(page as number);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <PageTitle>{t('POLARIS.ADD_NEW_QUESTION_SET')}</PageTitle>
      <div className="">
        <div
          className="flex flex-row items-center gap-x-[10px] cursor-pointer"
          onClick={() => {
            navigate('/category-questions');
          }}
        >
          <LeftOutlined className="text-[rgba(0,0,0,0.5)]" />
          <p className="text-black text-[20px] font-normal">
            {t('POLARIS.ADD_NEW_QUESTION_SET')}
          </p>
        </div>

        {/* main */}
        <form
          id="basic-edit"
          className="w-full h-full flex-1 flex flex-col gap-y-6 mb-[20px]"
          onSubmit={formMethods.handleSubmit(onSubmitForm)}
        >
          <FormProvider {...formMethods}>
            <div className="flex flex-col mt-[37px] gap-y-[20px]">
              <div className="p-[24px] bg-[white] text-field-custom">
                <TextField
                  name="question-topic"
                  required
                  label={t('POLARIS.QUESTION_TOPIC')}
                  placeholder={t('POLARIS.ENTER_YOUR_QUESTION_TOPIC')}
                />
              </div>

              <div className="p-[24px] bg-[white] text-field-custom">
                <TextField
                  name="question-topic"
                  required
                  label={t('POLARIS.QUESTION_TOPIC')}
                  placeholder={t('POLARIS.ENTER_YOUR_QUESTION_TOPIC')}
                />
              </div>
            </div>
          </FormProvider>
        </form>
      </div>
    </>
  );
};

export default CategoryQuestionsCreatePage;
