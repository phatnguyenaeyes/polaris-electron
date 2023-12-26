import styled from 'styled-components';

const ThreeDotsTyping: React.FC = () => {
  return (
    <DIV01>
      <div className="typing">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </DIV01>
  );
};

const DIV01 = styled.div`
  .typing {
    position: relative;

    span {
      content: '';
      animation: blink 1.5s infinite;
      animation-fill-mode: both;
      height: 10px;
      width: 10px;
      background: purple;
      position: absolute;
      left: 0;
      top: 0;
      border-radius: 50%;

      &:nth-child(2) {
        animation-delay: 0.2s;
        margin-left: 15px;
      }

      &:nth-child(3) {
        animation-delay: 0.4s;
        margin-left: 30px;
      }
    }
  }

  @keyframes blink {
    0% {
      opacity: 0.1;
    }
    20% {
      opacity: 1;
    }
    100% {
      opacity: 0.1;
    }
  }
`;

export default ThreeDotsTyping;
