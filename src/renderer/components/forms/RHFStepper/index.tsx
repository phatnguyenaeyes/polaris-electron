import React, { useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Button } from 'antd';
import classNames from 'classnames';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';

// eslint-disable-next-line react/display-name
const RHFStepper = React.forwardRef(
  (
    {
      children,
      name,
      hideBackBtn,
      onStepChange,
      onValid,
      onSubmit,
      defaultStep,
      initialValues,
      isShowNavigateBtn = true,
      isShowNextBtn = true,
    }: any,
    ref,
  ) => {
    const childrenArray = React.Children.toArray(children);
    const totalStep = childrenArray?.length;
    const [step, setStep] = useState<number>(defaultStep || 0);
    const submitBtnRef = useRef<HTMLElement>(null);
    const currentChild = childrenArray[step];
    // const preventSubmit = currentChild?.props?.preventSubmit;
    const stepDisplay = (currentChild as any)?.props?.stepDisplay;
    const loading = (currentChild as any)?.props?.loading || false;
    const defaultValues = (currentChild as any)?.props?.defaultValues || {};
    const totalDisplay = (currentChild as any)?.props?.totalDisplay || totalStep;

    const [completed, setCompleted] = useState(false);
    const headFormRef = React.useRef<HTMLDivElement>(null);

    const methods = useForm({
      resolver: yupResolver((currentChild as any)?.props?.validationSchema || {}),
      defaultValues: initialValues || defaultValues || {},
    });

    useImperativeHandle(ref, () => ({
      nextStep: (validate = true) => {
        if (validate) {
          submitBtnRef.current?.click();
        } else {
          setStep((s) => s + 1);
        }
      },
      prevStep: () => {
        if (step === 0) return;
        setStep((s) => s - 1);
      },
      moveToStep: (stepNumber: number) => {
        setStep(stepNumber);
      },
      reset: (resetValues: number) => {
        resetNestedForm(resetValues);
      },
      submit: () => {
        const formValues = methods.getValues();
        onSubmit(formValues);
      },
      getValues: () => {
        return methods.getValues();
      },
      setValue: (name: string, value: unknown) => {
        return methods.setValue(name, value);
      },
      watch: (fields: any) => {
        return methods.watch(fields);
      },
      trigger: (fields: any) => {
        return methods.trigger(fields);
      },
      getErrors: () => {
        return { errors: methods.formState.errors, isValid: methods.formState.isValid };
      },
      currentStep: step,
      totalStep: totalStep,
    }));

    function resetNestedForm(resetValues: any) {
      setStep(0);
      methods.reset(resetValues || {});
    }

    function isLastStep() {
      return step === childrenArray.length - 1;
    }

    const onSubmitForm = async () => {
      if (isLastStep()) {
        // await props.onSubmit(values, helpers);
        setCompleted(true);
      } else {
        setStep(step + 1);
      }
    };

    useEffect(() => {
      if (typeof onStepChange === 'function') {
        onStepChange(step);
      }
    }, [step]);

    useEffect(() => {
      if (typeof onValid === 'function') {
        onValid(!!methods.formState?.isValid);
      }
    }, [methods.formState?.isValid, onValid]);

    return (
      <div className="flex flex-col justify-between h-full">
        <div></div>
        <div className="stepper-form">
          <FormProvider {...methods}>
            <form name={name} onSubmit={methods.handleSubmit(onSubmitForm)}>
              <div ref={headFormRef} />
              {currentChild}
              <div className="mt-2 flex justify-start">
                {step > 0 && !hideBackBtn ? (
                  <Button
                    className="mr-2"
                    htmlType="button"
                    onClick={() => {
                      setStep((s) => s - 1);
                      // headFormRef.current.scrollIntoView();
                    }}
                  >
                    Back
                  </Button>
                ) : null}
                {isShowNextBtn ? (
                  <Button
                    ref={submitBtnRef}
                    className={classNames({
                      'btn-next-step': true,
                      hidden: isLastStep(),
                    })}
                    loading={loading}
                    htmlType="submit"
                  >
                    {isLastStep() ? 'Hoàn tất' : 'Tiếp tục'}
                  </Button>
                ) : null}
              </div>

              <Button
                ref={submitBtnRef}
                className={classNames({
                  hidden: true,
                })}
                style={{ display: 'none' }}
                htmlType="submit"
              >
                Hidden Button
              </Button>
              {/* {isLastStep() && (
                <div>
                  <Button
                    className="mr-2"
                    htmlType="button"
                    onClick={() => {
                      setStep(0);
                      methods.reset();
                    }}
                  >
                    Reset Form Value
                  </Button>
                </div>
              )} */}
            </form>
          </FormProvider>
        </div>

        {isShowNavigateBtn ? (
          <div className="stepper-navigation flex justify-end items-center">
            <div className="pr-2">
              {stepDisplay ? stepDisplay : step + 1}/{totalDisplay ? totalDisplay : totalStep}
            </div>
            <div className="flex">
              <Button
                className="mr-2"
                type="text"
                disabled={step === 0}
                icon={<LeftOutlined />}
                htmlType="button"
                loading={loading}
                onClick={() => {
                  setStep((s) => s - 1);
                  // headFormRef.current.scrollIntoView();
                }}
              />
              <Button
                type="text"
                disabled={step === totalStep - 1}
                htmlType="button"
                loading={loading}
                onClick={() => submitBtnRef.current?.click()}
                icon={<RightOutlined />}
              />
            </div>
          </div>
        ) : null}
      </div>
    );
  },
);

export default RHFStepper;
