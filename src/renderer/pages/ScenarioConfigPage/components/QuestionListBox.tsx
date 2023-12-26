import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { Col, Row, Typography, Alert } from 'antd';
import React from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import TypingText from '@app/components/common/TypingText/TypingText';
import ThreeDotsTyping from '@app/components/common/ThreeDotsTyping/ThreeDotsTyping';
import _isNull from 'lodash/isNull';

const QuestionListBox = React.memo<{
  questions: any;
  isLoading: boolean;
  handleUpdateAnswer: (id: any) => void;
}>(({ questions, isLoading, handleUpdateAnswer }) => {
  return (
    <>
      {questions &&
        questions?.map((q: any, idx: number) => {
          const answer = q?.answers[q?.index];
          const invalidAnswer = _isNull(q?.answers[q?.index]) || answer?.includes('FALSE_ANSWER');
          return (
            <>
              <div key={idx}>
                <Typography.Title level={5}>Nội dung câu hỏi {idx}</Typography.Title>
                <Typography.Text style={{ paddingRight: '140px', display: 'block' }}>
                  {q?.question || '---'}
                </Typography.Text>
                <Typography.Title level={5}>Nội dung câu trả lời {idx}</Typography.Title>
                <Row gutter={[10, 0]} style={{ width: '100%' }}>
                  <Col xs={24} lg={23} style={{ paddingRight: '100px', display: 'block' }}>
                    {q?.isLoading ? <ThreeDotsTyping /> : null}
                    {q?.isNew && !invalidAnswer ? (
                      <TypingText
                        msg={q?.answers[q?.index] || '---'}
                        speed={10}
                        cb={() => {
                          const el: any = document.querySelector('#questions-container');
                          el.scrollTop = el.scrollHeight;
                        }}
                      />
                    ) : null}
                    {!q?.isNew && !q?.isLoading && !invalidAnswer ? (
                      <>
                        <Typography.Text>{q?.answers[q?.index] || '---'}</Typography.Text>
                      </>
                    ) : null}
                    {invalidAnswer ? (
                      <>
                        <Alert
                          message="The message you submitted was invalid, please submit the another one."
                          type="error"
                          showIcon
                          style={{ background: '#483742', border: '1px solid #ef4444' }}
                        />
                      </>
                    ) : null}
                  </Col>
                  <Col xs={24} lg={1}>
                    {!invalidAnswer ? (
                      <BaseButton
                        size="small"
                        icon={<ReloadOutlined />}
                        onClick={() => handleUpdateAnswer(q?._id)}
                        loading={isLoading}
                        disabled={isLoading}
                      />
                    ) : null}
                  </Col>
                </Row>
              </div>
            </>
          );
        })}
    </>
  );
});

export default QuestionListBox;
