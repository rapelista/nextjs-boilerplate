import { ButtonProps } from '@mantine/core';
import { LinkProps } from 'next/link';

export type DataTableActionType<T extends LinkProps['href'] = string> =
  ButtonProps & {
    href?: T;
    label: string;
  };

export type DataTableDefaultActionKeyType =
  | 'DELETE'
  | 'EDIT'
  | Omit<string, 'DELETE' | 'EDIT'>;
