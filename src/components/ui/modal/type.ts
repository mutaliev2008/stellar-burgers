import { TOrder } from '@utils-types';
import { ReactNode } from 'react';

export type TModalUIProps = {
  title: string | undefined;
  onClose: () => void;
  children?: ReactNode;
  titleStyle?: string;
};
