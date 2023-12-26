import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { BaseForm } from '@app/components/common/forms/BaseForm/BaseForm';
import { BaseInput as CommonInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { InputPassword as CommonInputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import {
  BORDER_RADIUS,
  FONT_SIZE,
  FONT_WEIGHT,
  media,
} from '@app/styles/themes/constants';
import { BaseCheckbox } from '@app/components/common/BaseCheckbox/BaseCheckbox';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

export const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
`;

export const BackgroundWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
`;

export const LoginWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translate(-50%, -50%);
`;

export const FormWrapper = styled.div`
  width: 31.75rem;
  padding: 2.5rem;
  overflow: auto;
  background-color: rgb(var(--background-rgb-color) 0.93);
  border-radius: ${BORDER_RADIUS};

  @media ${media.xs} {
    width: 20.75rem;
    max-height: calc(100vh - 3rem);
    padding: 2.5rem 1.25rem;
  }

  @media ${media.md} {
    width: 31.75rem;
    max-height: calc(100vh - 3rem);
    padding: 2.5rem;
  }
`;

export const FormTitle = styled.div`
  color: var(--primary-color);

  @media ${media.xs} {
    margin-bottom: 0.625rem;
    font-size: ${FONT_SIZE.lg};
    font-weight: ${FONT_WEIGHT.bold};
    line-height: 1.5625rem;
  }

  @media ${media.md} {
    margin-bottom: 0.875rem;
    font-size: ${FONT_SIZE.xxl};
    font-weight: ${FONT_WEIGHT.bold};
    line-height: 1.9375rem;
  }

  @media ${media.xl} {
    margin-bottom: 0.9375rem;
    font-size: ${FONT_SIZE.xxxl};
    font-weight: ${FONT_WEIGHT.extraBold};
    line-height: 2.125rem;
  }
`;

export const FormCheckbox = styled(BaseCheckbox)`
  display: flex;
  padding-left: 0.125rem;

  & .ant-checkbox-inner {
    border-radius: 3px;
    transform: scale(1.375);
  }

  & .ant-checkbox-input {
    transform: scale(1.375);
  }
`;

export const FormItem = styled(BaseForm.Item)`
  margin-bottom: 0.75rem;

  & .ant-form-item-control-input {
    min-height: 3.125rem;
  }

  & .ant-form-item-explain-error {
    font-size: ${FONT_SIZE.xs};
  }

  & label {
    font-size: ${FONT_SIZE.xs};
    line-height: 1.25rem;
    color: var(--primary-color);
  }

  &.ant-form-item-has-feedback .ant-input-affix-wrapper .ant-input-suffix {
    padding-right: 1.5rem;
  }
`;

export const FormInput = styled(CommonInput)`
  color: var(--text-main-color);
  background: transparent;

  & input.ant-input {
    background: transparent;
  }
`;

export const FormInputPassword = styled(CommonInputPassword)`
  color: var(--text-main-color);
  background: transparent;

  & input.ant-input {
    background: transparent;
  }
`;

export const ActionsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Text = styled.span`
  font-size: ${FONT_SIZE.xs};
  font-weight: ${FONT_WEIGHT.regular};
  color: var(--text-main-color);
`;

export const LinkText = styled(Text)`
  color: var(--primary-color);
  text-decoration: underline;
`;

export const SubmitButton = styled(BaseButton)`
  width: 100%;
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
`;

export const SocialButton = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 1rem;
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  color: var(--primary-color);
  background: transparent;
  border: 1px solid var(--primary-color);
`;

export const FooterWrapper = styled.div`
  margin-top: 1.25rem;
  text-align: center;
`;

export const BackIcon = styled(LeftOutlined)`
  margin-right: 0.75rem;
  font-size: 0.75rem;
`;

export const BackWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  font-size: ${FONT_SIZE.md};
  font-weight: ${FONT_WEIGHT.semibold};
  cursor: pointer;
`;

export const SocialIconWrapper = styled.div`
  display: flex;
  margin-right: 0.8125rem;

  @media ${media.xs} {
    margin-right: 0.625rem;
  }

  @media ${media.md} {
    margin-right: 0.8125rem;
  }
`;
