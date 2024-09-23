import { ColumnDef } from '@tanstack/react-table';
import { UnitType } from '~/types/unit';

export const columns: ColumnDef<UnitType>[] = [
  {
    accessorKey: 'name',
    header: 'Unit Name',
    size: 400,
  },
];
