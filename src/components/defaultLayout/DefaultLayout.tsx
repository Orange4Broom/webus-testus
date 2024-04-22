/* eslint-disable react/react-in-jsx-scope */
import { ReactNode } from 'react';

interface DefaultLayoutProps {
  children: ReactNode;
}

export const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return <>{children}</>;
};
