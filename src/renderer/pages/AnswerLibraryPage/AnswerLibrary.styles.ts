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

export const FieldInfoContentTab = styled.div<{ $active?: boolean }>`
  margin-bottom: 12px;
  ${(props) =>
    props.$active &&
    css`
      ${FieldInfoContentTabItem} {
        background-color: #0b98ac;
      }
    `}
`;

export const FieldInfoContentTabContainer = styled.div`
  display: flex;
`;
export const FieldInfoContentTabItem = styled.div`
  min-width: 168px;
  padding: 12px;
  text-align: center;
  cursor: pointer;
  background: #121212;
  border-radius: 12px;
`;
