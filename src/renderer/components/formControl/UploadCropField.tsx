import { PlusOutlined } from '@ant-design/icons';
import { parseListImage } from '@app/utils/utils';
import { Image, Upload, UploadProps, message } from 'antd';
import ImgCrop from 'antd-img-crop';
import { RcFile, UploadChangeParam, UploadFile } from 'antd/lib/upload';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type BaseUploadProps = Omit<UploadProps, 'onChange'>;

interface UploadCropFieldProps extends BaseUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (fileList: UploadFile<any>[]) => void;
  required?: boolean;
  fieldError?: FieldError;
  label?: string;
  helpText?: string;
  maxLength?: number;
  name: string;
}

const MAX_5M = 5242880; // Max file size 5M : 5 * 1024 * 1024
// const MAX_5M = 2097152; // Max file size 2M Test

const IMAGE_ONLY_REGEX = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i;

function checkAcceptImageType(fileType: string) {
  return IMAGE_ONLY_REGEX.test(`.${fileType.split('/').pop()}`);
}

const getBase64 = (file: RcFile) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const beforeCropProps = {
  beforeCrop: (file: RcFile) => {
    const isLtSize = file.size / MAX_5M < 1;

    const isValidType = checkAcceptImageType(file.type);
    if (!isValidType) {
      message.warning('Tệp hình ảnh không hợp lệ');
      return Upload.LIST_IGNORE;
    }
    if (!isLtSize) {
      message.warning(`Kích thước file ${file.name} quá lớn`);
      return Upload.LIST_IGNORE;
    }
    return true;
  },
};

const draggerProps = {
  showUploadList: false,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customRequest: ({
    onSuccess,
  }: {
    onSuccess: (body: any, xhr?: XMLHttpRequest) => void;
  }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  },
  onDrop: () => {
    //
  },
};

const UploadCropBase: React.FC<UploadCropFieldProps> = (props) => {
  const {
    label,
    helpText,
    required,
    maxLength = 1,
    onChange,
    fileList = [],
    listType = 'picture-card',
    iconRender,
    name,
    fieldError,
  } = props;

  const hasError = !!fieldError;
  const onChangeUpload = async ({
    fileList: newFileList,
  }: UploadChangeParam) => {
    onChange && onChange([...newFileList]);
  };

  const [visible, setVisible] = useState<string | boolean>(false);

  const onPreview = async (file: UploadFile) => {
    const src = file?.url;
    if (file?.originFileObj) {
      const preview = await getBase64(file.originFileObj).catch(() => false);
      setVisible(preview as string);
    }
    if (src) {
      setVisible(src);
    }
  };

  const fileListProps = useMemo(() => {
    return parseListImage(fileList);
  }, [fileList]);

  const deleteHandler = async () => {
    return true;
  };

  return (
    <div
      className={classNames({
        'upload-crop-field_error': hasError,
        'upload-crop-field': true,
        'upload-crop-field_16x9': true,
      })}
    >
      {label && (
        <label className="inline-block mb-2 text-[13px]">
          &#x2022; {label}
          {required && <span className="text-error">*</span>}
        </label>
      )}
      {helpText && <div className="form-item_help-text">{helpText}</div>}
      <ImgCrop
        modalTitle="Cắt ảnh"
        modalOk="Ok"
        modalCancel="Huỷ"
        aspect={16 / 9}
        quality={1}
        minZoom={1}
        {...beforeCropProps}
      >
        <Upload
          {...(draggerProps as UploadProps)}
          showUploadList={true}
          listType={listType}
          fileList={fileListProps || []}
          onChange={onChangeUpload}
          onPreview={onPreview}
          multiple={false}
          iconRender={iconRender}
          accept={`image/png, image/jpeg, image/jpg`}
          onRemove={deleteHandler}
          maxCount={1}
          name={name}
        >
          {(fileListProps || []).length < maxLength && (
            <div>
              <div>
                <PlusOutlined />
              </div>
              <div>Tải ảnh lên</div>
            </div>
          )}
        </Upload>
      </ImgCrop>
      {Boolean(visible) && (
        <Image
          style={{ display: 'none' }}
          src={visible as string}
          preview={{
            visible: Boolean(visible),
            src: visible as string,
            onVisibleChange: (value) => {
              setVisible(value);
            },
          }}
        />
      )}
      {hasError && (
        <div style={{ textAlign: 'left' }}>
          <span style={{ color: '#ff4d4f' }}>{fieldError?.message}</span>
        </div>
      )}
    </div>
  );
};

function UploadCropField(props: UploadCropFieldProps): JSX.Element {
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
      name={props.name}
      control={control}
      render={({ field: { onChange, value }, fieldState }) => (
        <UploadCropBase
          {...internalProps}
          onChange={onChange}
          fileList={value}
          fieldError={fieldState.error}
        />
      )}
    />
  );
}

export default UploadCropField;
