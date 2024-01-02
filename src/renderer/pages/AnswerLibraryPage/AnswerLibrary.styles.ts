import styled, { css } from 'styled-components';

export const AnswerGroupWrapper = styled.div`
  position: relative;
  padding: 24px;
  margin-top: 24px;
  margin-bottom: 24px;
  border: 1px solid #fff;
  border-radius: 12px;
`;

export const UploadVideoGroup = styled.div`
  display: flex;
  width: 100%;
`;
export const RemoveVideoIcon = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 100px;
`;

export const FieldInfoContentTabContainer = styled.div`
  display: flex;
  padding-top: 13px;
`;

export const FieldInfoContentTab = styled.div<{ $active?: boolean }>`
  margin-right: 12px;
  ${(props) =>
    props.$active &&
    css`
      ${FieldInfoContentTabItem} {
        background-color: #000;
        color: #fff;
      }
    `}
`;

export const FieldInfoContentTabItem = styled.div`
  min-width: 168px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: #ededed;
`;

export const ActiveTabContainer = styled.div<{ $active?: boolean }>`
  border: 2px solid transparent;
  padding: 32px;
  display: block;
  ${(props) =>
    props.$active &&
    css`
      border-color: #000;
    `}
  ${(props) =>
    !props.$active &&
    css`
      display: none;
    `}
`;
