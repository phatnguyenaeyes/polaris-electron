import { ConfirmDialog } from '@app/contexts/confirmation/Dialog';
import * as React from 'react';

export interface IConfirmDialogProps {
  open?: boolean;
  showCancel?: boolean;
  hideOkBtn?: boolean;
  title?: React.ReactNode;
  description?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  alertDialog?: boolean;
  catchOnCancel?: boolean;
  onOk?: () => void;
  onClose?: () => void;
  customButtons?: (props?: any) => JSX.Element;
  isCloseIcon?: boolean;
}

export interface IConfirmDialogContext extends IConfirmDialogProps {
  catchOnCancel?: boolean;
}

//  Confirmation Context
type IAwaitingPromise = {
  resolve: (value: unknown) => void;
  reject: () => void;
};
type IConfirmationContext = (
  options: IConfirmDialogContext,
) => Promise<unknown>;

const ConfirmationServiceContext =
  React.createContext<IConfirmationContext | null>(null);

export function ConfirmationServiceProvider({
  children,
}: React.PropsWithChildren) {
  const [confirmationState, setConfirmationState] =
    React.useState<IConfirmDialogContext | null>(null);

  const awaitingPromiseRef = React.useRef<IAwaitingPromise>();

  const openConfirmation = React.useCallback(
    (options: IConfirmDialogContext) => {
      setConfirmationState(options);
      return new Promise((resolve, reject) => {
        awaitingPromiseRef.current = { resolve, reject };
      });
    },
    [],
  );

  const handleClose = () => {
    if (awaitingPromiseRef.current) {
      if (confirmationState?.catchOnCancel) {
        awaitingPromiseRef.current.reject();
      } else {
        awaitingPromiseRef.current.resolve(false);
      }
    }
    setConfirmationState(null);
  };

  const handleOk = () => {
    if (awaitingPromiseRef.current) {
      awaitingPromiseRef.current.resolve(true);
    }
    setConfirmationState(null);
  };

  return (
    <>
      <ConfirmationServiceContext.Provider value={openConfirmation}>
        {children}
      </ConfirmationServiceContext.Provider>
      <ConfirmDialog
        open={Boolean(confirmationState)}
        onOk={handleOk}
        onClose={handleClose}
        {...confirmationState}
      />
    </>
  );
}

let confirmContext: IConfirmationContext;
let alertContext: IConfirmationContext;

export function Confirm() {
  const useDialog = React.useContext(ConfirmationServiceContext);
  React.useEffect(() => {
    if (!useDialog) {
      throw new Error('Please Use ConfirmationProvider in parent component.');
    }
    confirmContext = useDialog;
  }, [useDialog]);
  return null;
}
export function Alert() {
  const useDialog = React.useContext(ConfirmationServiceContext);
  React.useEffect(() => {
    if (!useDialog) {
      throw new Error('Please Use ConfirmationProvider in parent component.');
    }
    alertContext = useDialog;
  }, [useDialog]);
  return null;
}
export const showConfirm = (options: IConfirmDialogProps) =>
  confirmContext(options);
export const showAlert = (options: IConfirmDialogProps) =>
  alertContext({ alertDialog: true, ...options });

// How to use

// async () => {
//   const ok = await showConfirm({
//      title: 'Confirm'
//    });
//    if (ok) {
//      console.log('user confirmed');
//    }
// }
