import React, { PropsWithChildren } from 'react';

export function RHFStep({ children, validationSchema }: PropsWithChildren & { validationSchema: any }) {
  return <>{children}</>;
}
