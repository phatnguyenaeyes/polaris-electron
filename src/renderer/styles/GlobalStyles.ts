import { createGlobalStyle } from 'styled-components';
import { resetCss } from './resetCss';
import { BREAKPOINTS, FONT_SIZE, FONT_WEIGHT, media } from './themes/constants';

import {
  commonThemeVariables,
  darkThemeVariables,
  lightThemeVariables,
} from '../themes/themeVariables';

export default createGlobalStyle`
 ${resetCss}

[data-theme='light'],
:root {
  ${lightThemeVariables}
}

[data-theme='dark'] {
  ${darkThemeVariables}
}

:root {
  ${commonThemeVariables};
}

[data-no-transition] * {
  transition: none !important;
}

.range-picker {
  & .ant-picker-panels {
    @media ${media.xs} and (max-width: ${BREAKPOINTS.md - 0.02}px) {
      display: flex;
    flex-direction: column;
    }
  }
}

.search-overlay {
  box-shadow: var(--box-shadow);

  @media ${media.xs} and (max-width: ${BREAKPOINTS.md - 0.02}px)  {
    width: calc(100vw - 16px);
  max-width: 600px;
  }

  @media ${media.md} {
    width: 323px;
  }
}

a {
  color: var(--primary-color);

  &:hover,:active {
    color: var(--ant-primary-color-hover);
  }
}

.ant-picker-cell {
  color: var(--text-main-color);
}

.ant-picker-cell-in-view .ant-picker-calendar-date-value {
  font-weight: ${FONT_WEIGHT.bold};
  color: var(--text-main-color);
}

.ant-picker svg {
  color: var(--text-light-color);
}

/* stylelint-disable-next-line no-invalid-double-slash-comments */
// notifications start
.ant-notification-notice {
  width: 36rem;
  min-height: 6rem;
  padding: 2rem;

  .ant-notification-notice-with-icon .ant-notification-notice-message {
    margin-bottom: 0;
    margin-left: 2.8125rem;
  }

  .ant-notification-notice-with-icon .ant-notification-notice-description {
    margin-top: 0;
    margin-left: 4.375rem;
  }

  .ant-notification-notice-icon {
    margin-left: 0;
    font-size: 2.8125rem
  }

  .ant-notification-notice-close {
    top: 1.25rem;
    right: 1.25rem;
  }

  .ant-notification-notice-close-x {
    display: flex;
    font-size: 0.9375rem;
  }

  .notification-without-description {
    .ant-notification-notice-close {
      top: 1.875rem;
    }

    .ant-notification-notice-with-icon .ant-notification-notice-description  {
      margin-top: 0.625rem;
    }
  }

  .title {
    display: flex;
    align-items: center;
    height: 3rem;
    margin-left: 1.5rem;
    font-size: ${FONT_SIZE.xxl};
    font-weight: ${FONT_WEIGHT.bold};

    &.title-only {
      height: 2rem;
      margin-left: 0.75rem;
      font-size: ${FONT_SIZE.md};
      font-weight: ${FONT_WEIGHT.semibold};
      line-height: 2rem;
      color: var(--text-main-color);
    }
}

  .description {
    font-size: ${FONT_SIZE.md};
    font-weight: ${FONT_WEIGHT.semibold};
    line-height: 1.375rem;
    color: #404040;
  }

  &.ant-notification-notice-success {
    background: var(--notification-success-color);
    border: 1px solid var(--success-color);

    .title {
      color: var(--success-color);
    }
  }

  &.ant-notification-notice-info {
    background: var(--notification-primary-color);
    border: 1px solid var(--primary-color);

    .title {
      color: var(--primary-color);
    }
  }

  &.ant-notification-notice-warning {
    background: var(--notification-warning-color);
    border: 1px solid var(--warning-color);

    .title {
      color: var(--warning-color);
    }
  }

  &.ant-notification-notice-error {
    background: var(--notification-error-color);
    border: 1px solid var(--error-color);

    .title {
      color: var(--error-color);
    }
  }

  .success-icon {
    color: var(--success-color);
  }

  .info-icon {
    color: var(--primary-color);
  }

  .warning-icon {
    color: var(--warning-color);
  }

  .error-icon {
    color: var(--error-color);
  }
}

.ant-menu-inline, .ant-menu-vertical {
  border-right: 0;
}
/* stylelint-disable-next-line no-invalid-double-slash-comments */
// notifications end
/* Form Item */
.form-item {
  margin-bottom: 21px;

  .text-error {
    color: #ff4d4f;
  }

  .form-item_inner {
    /* background-color: #ffffff; */
    display: flex;
    flex-direction: column;
    justify-content: center;

    .form-item_body {
      position: relative;
      display: inline-flex;

      .form-control_number {
        width: 100%;
        min-width: 0;
      }

      .form-control_date {
        width: 100%;
      }

      .form-item_suffix {
        display: flex;
        flex: none;
        align-items: center;

        /* background-color: #ffffff; */
      }
    }
  }

  &--has-error {
    margin-bottom: 0;

    .form-item_inner {
      border-color: #ff4d4f;

      .form-item__label {
        color: #ff4d4f;
      }
    }
  }

  .form-item__label {
    font-size: 17px;
  }

  &.form-item--disabled {
    .form-item_inner {
      background: #f5f5f5;
    }
  }

  .ant-input {
  }

  .ant-select {
    width: 100%;
  }

  .form-item_number {
    padding: 11.4px 11px;
    background-color: var(--background-color);
    border: 1px solid var(--border-base-color);
    border-radius: 7px;

    input {
      width: 100%;
      padding: 12px;
      padding-top: 2px;
      padding-bottom: 2px;
      padding-left: 0;
      background: transparent;
      border: none;

      &:focus {
        outline: none;
      }
    }
  }

  &.form-item-suffix {
    .form-control_number {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .form-item_suffix {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;

      /* background-color: #ffffff; */
    }
  }
}

.form-item-checkbox-group {
margin-bottom: 21px;

  .text-error {
    color: #ff4d4f;
  }

.form-item__label {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 17px;
  font-style: normal;
}

.checkbox-group__item {
  width: 100%;
  padding: 12px;
  border: 1px solid rgb(0 0 0 / 0.1);
  border-radius: 8px;

  .checkbox-group__content {
    display: flex;
    align-items: center;

    .checkbox-group__icon {
      margin-right: 10px;
    }
  }
}

&.checkbox-end {
  .checkbox-group__item {
    align-items: center;
    justify-content: space-between;

    .ant-checkbox {
      order: 2;
    }
  }
}

&--has-error {
  margin-bottom: 0;
}
}

.form-item_switch {
  .form-item_body {
    height: 52px;
    padding-top: 12px;
  }
}

.form-item-radio-group {
  margin-bottom: 21px;

  .text-error {
    color: #ff4d4f;
  }

.form-item__label {
  display: inline-block;
  margin-bottom: 8px;
  font-size: 17px;
  font-style: normal;
}

.radio-group__item {
  width: 100%;
  height: 50px;
  padding: 9px 12px 7px;

  &.ant-radio-button-wrapper:first-child:last-child {
    border-radius: 8px;
  }

  .radio-group__content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 33px;
    margin-bottom: 0;

    .radio-group__label {
      font-weight: normal;
    }

    .radio-group__icon {
      margin-right: 10px;
    }
  }
}

&--has-error {
  margin-bottom: 0;
}
}

.form-item_help-text {
  font-size: 13px;
  font-style: italic;
  color: #5F656C;
}

.text-required {
  color: #ff4d4f;
}
`;
