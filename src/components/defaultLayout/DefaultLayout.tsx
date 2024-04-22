import { ReactNode } from 'react';
import React from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return <>{children}</>;
};
