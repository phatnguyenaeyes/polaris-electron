import { PlusOutlined } from '@ant-design/icons';
import { Image, Modal, Upload, Button, message } from 'antd';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { TYPE_DOC_UPLOAD } from '@app/constants/upload';
import { parseListImage } from '@app/utils/utils';
import { RcFile, UploadChangeParam, UploadFile, UploadProps } from 'antd/lib/upload';
import { Controller, FieldError, useFormContext } from 'react-hook-form';

type BaseUploadProps = Omit<UploadProps, 'onChange'>;

interface UploadListFieldProps extends BaseUploadProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onChange?: (fileList: UploadFile<any>[]) => void;
  onDeleteFile?: (file: UploadFile) => void;
  required?: boolean;
  fieldError?: FieldError;
  label?: string;
  helpText?: string;
  placeholder?: string;
  maxLength?: number;
  name: string;
  allowDocument?: boolean;
  videoOnly?: boolean;
  excelOnly?: boolean;
  showDownloadIcon?: boolean;
  notAllowDelete?: boolean;
  suffixHelpText?: React.ReactNode;
  docsOnly?: boolean;
}

const MAX_50M = 104857600; // Max file size 100M : 100 * 1024 * 1024
// const MAX_50M = 52428800; // Max file size 50M : 50 * 1024 * 1024
// const MAX_5M = 2097152; // Max file size 2M Test

const IMAGE_ONLY_REGEX = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp)$/i;
const VIDEO_ONLY_REGEX = /(\.mp4|\.mov)$/i;
const DOCS_ONLY_REGEX = /(\.pdf)$/i;
const WORDS_DOCS_ONLY_REGEX =
  /\.(docx|doc)|(application\/vnd\.openxmlformats-officedocument\.wordprocessingml\.document)$/i;
const WORKBOOK_ONLY_REGEX = /^application\/(csv|pdf|msword|(vnd\.(ms-|openxmlformats-).*))$/i;
const IMAGE_AND_DOCS_ONLY_REGEX = /(\.jpg|\.jpeg|\.png|\.gif|\.bmp|\.pdf)$/i;

function checkAcceptImageType(
  fileType: string,
  allowDocument?: boolean,
  videoOnly?: boolean,
  excelOnly?: boolean,
  docsOnly?: boolean,
) {
  if (excelOnly) {
    return WORKBOOK_ONLY_REGEX.test(`${fileType}`);
  } else if (videoOnly) {
    return VIDEO_ONLY_REGEX.test(`.${fileType.split('/').pop()}`);
  } else if (docsOnly) {
    return WORDS_DOCS_ONLY_REGEX.test(`.${fileType.split('/').pop()}`);
  } else {
    if (allowDocument) {
      return IMAGE_AND_DOCS_ONLY_REGEX.test(`.${fileType.split('/').pop()}`);
    }
    return IMAGE_ONLY_REGEX.test(`.${fileType.split('/').pop()}`);
  }
}

const beforeUploadProps = (allowDocument?: boolean, videoOnly?: boolean, excelOnly?: boolean, docsOnly?: boolean) => {
  return {
    beforeUpload: (file: RcFile) => {
      const isLtSize = file.size / MAX_50M < 1;

      const isValidType = checkAcceptImageType(
        file.type,
        Boolean(allowDocument),
        Boolean(videoOnly),
        Boolean(excelOnly),
        Boolean(docsOnly),
      );
      if (!isValidType) {
        message.warning('Tệp không hợp lệ');
        return Upload.LIST_IGNORE;
      }
      if (!isLtSize) {
        message.warning(`Kích thước file ${file.name} quá lớn`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
  };
};

const draggerProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  customRequest: ({ onSuccess }: { onSuccess: (body: any, xhr?: XMLHttpRequest) => void }) => {
    setTimeout(() => {
      onSuccess('ok');
    }, 0);
  },
};

const UploadListBase: React.FC<UploadListFieldProps> = (props) => {
  const {
    multiple = true,
    allowDocument = false,
    videoOnly = false,
    excelOnly = false,
    docsOnly = false,
    notAllowDelete = false,
    label,
    placeholder,
    helpText,
    suffixHelpText,
    required,
    maxLength = 7,
    onChange,
    fileList = [],
    listType = 'picture-card',
    iconRender,
    fieldError,
    name,
    onDeleteFile,
    disabled = false,
  } = props;
  const hasError = !!fieldError;

  const onChangeUpload = async ({ fileList: newFileList }: UploadChangeParam) => {
    const originalImages = newFileList.filter((img: UploadFile) => !img?.originFileObj);
    const blobImages = newFileList.filter((img: UploadFile) => img?.originFileObj);
    try {
      const promiseList = blobImages.map((el) => {
        return new Promise((resolve) => {
          if (el.type && (el.type.match('application/pdf') || TYPE_DOC_UPLOAD.includes(el.type))) {
            resolve({
              ...el,
              thumbUrl: '/pdf_icon.png',
            });
          } else if (el.type?.includes('video')) {
            (async () => {
              const result = await generateVideoThumbnails(el.originFileObj, 1);
              resolve({
                ...el,
                originFileObj: el.originFileObj,
                thumbUrl: result,
              });
            })();
          } else {
            // Generate image thumbnail
            const reader = new FileReader();
            reader.readAsDataURL(el.originFileObj as Blob);
            reader.onload = () =>
              resolve({
                ...el,
                originFileObj: el.originFileObj,
                thumbUrl: reader.result,
              });
          }
        });
      });
      const newImageListWithThumb = await Promise.all(promiseList);
      onChange && onChange([...originalImages, ...newImageListWithThumb] as UploadFile[]);
    } catch (error) {
      message.error('Có lỗi! Vui lòng thử lại sau');
    }
  };

  const [visible, setVisible] = useState<string | boolean>(false);
  const [video, setVideo] = useState<{
    src?: string;
    thumbUrl?: string;
    type?: string;
  } | null>();

  const onPreview = async (file: UploadFile & { type?: string; videoPath?: string }) => {
    let src = file?.url;
    const thumbUrl = file?.thumbUrl;
    const videoPath = file?.videoPath;

    if (
      DOCS_ONLY_REGEX.test(`.${file?.type?.split('/').pop()}`) ||
      WORDS_DOCS_ONLY_REGEX.test(`.${file?.type?.split('/').pop()}`)
    ) {
      return;
    }
    if (file?.originFileObj?.type?.includes('video')) {
      src = URL.createObjectURL(file.originFileObj);
      setVideo({
        src,
        thumbUrl,
        type: file.originFileObj.type,
      });
      return;
    }
    if (videoPath) {
      setVideo({
        src: videoPath,
        type: 'video/' + videoPath.split('.').pop(),
        thumbUrl: thumbUrl || videoPath,
      });
    }
    if (!videoPath && (src || thumbUrl)) {
      setVisible((src || thumbUrl) as string);
    }
  };

  const generateVideoThumbnails = async (videoFile: any, videoTimeInSeconds = 0) => {
    return new Promise(async (resolve, reject) => {
      if (!videoFile.type?.includes('video')) reject('Tệp video không hợp lệ');
      try {
        const url = await getVideoThumbnail(videoFile, videoTimeInSeconds);
        resolve(url);
      } catch (error) {
        reject();
      }
    });
  };

  const importFileAndPreview = (file: File, revoke = false) => {
    return new Promise((resolve) => {
      window.URL = window.URL || window.webkitURL;
      const preview = window.URL.createObjectURL(file);
      // remove reference
      if (revoke) {
        window.URL.revokeObjectURL(preview);
      }
      setTimeout(() => {
        resolve(preview);
      }, 100);
    });
  };

  const getVideoThumbnail = (file: File, videoTimeInSeconds = 1) => {
    return new Promise((resolve, reject) => {
      if (file.type.match('video')) {
        importFileAndPreview(file).then((urlOfFIle) => {
          const video = document.createElement('video');
          const timeupdate = function () {
            if (snapImage()) {
              video.removeEventListener('timeupdate', timeupdate);
              video.pause();
            }
          };
          video.addEventListener('loadeddata', function () {
            if (snapImage()) {
              video.removeEventListener('timeupdate', timeupdate);
            }
          });
          const snapImage = function () {
            const canvas = document.createElement('canvas') as any;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            const image = canvas.toDataURL();
            const success = image.length > 100000;
            if (success) {
              URL.revokeObjectURL(urlOfFIle as string);
              resolve(image);
            }
            return success;
          };
          video.addEventListener('timeupdate', timeupdate);
          video.preload = 'metadata';
          video.src = urlOfFIle as string;
          // Load video in Safari / IE11
          video.muted = true;
          video.playsInline = true;
          video.currentTime = videoTimeInSeconds;
          video.play();
        });
      } else {
        reject('Tệp không hợp lệ');
      }
    });
  };

  const fileListProps = useMemo(() => {
    return parseListImage(fileList);
  }, [fileList]);

  const cancelHandler = () => setVideo(null);
  const deleteHandler = async (file: UploadFile) => {
    if (!file?.originFileObj) {
      if (notAllowDelete) {
        message.warn('Không hỗ trợ xoá');
        return false;
      } else {
        if (typeof onDeleteFile === 'function') {
          onDeleteFile(file);
        }
      }
    }
    return true;
  };

  const acceptUpload = useMemo(() => {
    if (excelOnly) {
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel';
    }
    if (allowDocument) {
      return 'image/png, image/jpeg, image/jpg, image/gif, image/bmp, application/pdf';
    }
    if (videoOnly) {
      return 'video/mp4';
    }
    if (docsOnly) {
      return '.doc,.docx';
    }
    return `image/png, image/jpeg, image/jpg, image/gif, image/bmp`;
  }, [allowDocument, videoOnly, excelOnly]);

  return (
    <div
      className={classNames({
        'upload-list-field': true,
        'upload-list-field_error': hasError,
      })}
    >
      {label && (
        <label className="inline-block mb-2 text-[13px]" style={{ display: 'block' }}>
          {label}
          {required && <span className="text-required">*</span>}
        </label>
      )}
      {helpText && <div className="form-item_help-text">{helpText}</div>}
      <Upload
        {...(draggerProps as UploadProps)}
        {...beforeUploadProps(allowDocument, videoOnly, excelOnly, docsOnly)}
        showUploadList={{
          showDownloadIcon: false,
        }}
        listType={listType}
        fileList={fileListProps || []}
        onChange={onChangeUpload}
        onPreview={onPreview}
        multiple={multiple}
        iconRender={iconRender}
        accept={acceptUpload}
        onRemove={deleteHandler}
        maxCount={maxLength}
        name={name}
      >
        {(fileListProps || []).length < maxLength && (
          <>
            {listType !== 'text' ? (
              <div>
                <div>
                  <PlusOutlined />
                </div>
                <div>{placeholder || 'Tải ảnh lên'}</div>
              </div>
            ) : (
              <div>
                <Button icon={<UploadOutlined />} disabled={disabled}>
                  {placeholder || 'Tải file lên'}
                </Button>
              </div>
            )}
          </>
        )}
      </Upload>
      {suffixHelpText && <div className="form-item_help-text">{suffixHelpText}</div>}

      {Boolean(visible) && !Boolean(video) && (
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
      {video && (
        <Modal
          open={Boolean(video)}
          onCancel={cancelHandler}
          footer={null}
          centered
          bodyStyle={{ padding: 0 }}
          closable={false}
        >
          <video width="100%" height="100%" poster={video?.thumbUrl} autoPlay={true} controls>
            <source src={video?.src} type={video?.type} />
          </video>
        </Modal>
      )}
      {hasError && (
        <div style={{ textAlign: 'left' }}>
          <span style={{ color: '#ff4d4f' }}>{fieldError?.message}</span>
        </div>
      )}
    </div>
  );
};

export default function UploadListField(props: UploadListFieldProps): JSX.Element {
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
        <UploadListBase {...internalProps} onChange={onChange} fileList={value} fieldError={fieldState.error} />
      )}
    />
  );
}
