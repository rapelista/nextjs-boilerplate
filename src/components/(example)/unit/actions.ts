'use client';

import { DataTableActionsProps } from '~/components/data-table-actions';

export const actions: DataTableActionsProps['extendActions'] = [
  {
    onClick: () => alert('View'),
    children: 'View',
  },
  {
    href: 'unit/[id]',
    children: 'View (link)',
  },
];
