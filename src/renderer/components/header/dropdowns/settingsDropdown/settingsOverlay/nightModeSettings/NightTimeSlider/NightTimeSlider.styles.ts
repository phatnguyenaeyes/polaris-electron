import styled from 'styled-components';
import { InputNumber } from '@app/components/common/inputs/InputNumber/InputNumber';
import { FONT_SIZE, FONT_WEIGHT } from '@app/styles/themes/constants';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

const pathWidth = 22;

export const Wrapper = styled.div`
  position: relative;
  display: flex;

  --round-slider-handle-cursor: grabbing;
  --round-slider-path-width: ${pathWidth}px;
  --round-slider-bar-color: var(--primary-color);
  --round-slider-path-color: #def0ff;
  --round-slider-handle-color: #fff;
  --round-slider-handle-border-color: var(--primary-color);

  round-slider {
    z-index: 1;
  }
`;

export const InnerWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: calc(100% - ${pathWidth * 2}px);
  height: calc(100% - ${pathWidth * 2}px);
  pointer-events: none;
  border-radius: 50%;
  transform: translate(-50%, -50%);
`;

export const BackgroundWrapper = styled(InnerWrapper)`
  background: linear-gradient(270deg, rgb(1 53 154 / 0.3) 0%, rgb(96 126 233 / 0.4) 0.01%, rgb(79 192 255 / 0.05) 100%);
`;

export const ShadowWrapper = styled(InnerWrapper)`
  z-index: 2;
  box-shadow: 0 -4px 16px rgb(1 80 154 / 0.1), 0 4px 16px rgb(1 80 154 / 0.1);
`;

export const Text = styled(BaseTypography.Text)`
  font-size: ${FONT_SIZE.xs};
`;

export const TopText = styled(Text)`
  position: absolute;
  top: 5%;
  left: 50%;
  transform: translateX(-50%);
`;

export const BotText = styled(Text)`
  position: absolute;
  bottom: 5%;
  left: 50%;
  transform: translateX(-50%);
`;

export const LeftText = styled(Text)`
  position: absolute;
  top: 50%;
  left: 5%;
  transform: translateY(-50%);
`;

export const RightText = styled(Text)`
  position: absolute;
  top: 50%;
  right: 5%;
  transform: translateY(-50%);
`;

export const CenterText = styled(BaseTypography.Text)`
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: ${FONT_SIZE.xl};
  font-weight: ${FONT_WEIGHT.semibold};
  transform: translate(-50%, -50%);
`;

export const TimeRow = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
`;

export const TimeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  align-items: center;
  width: 50%;
  padding: 1rem;
  border-radius: 14px;
  box-shadow: ${(props) => props.theme.boxShadow};
`;

export const NumberInput = styled(InputNumber)`
  width: unset;

  input {
    font-weight: ${FONT_WEIGHT.semibold};
  }
`;
