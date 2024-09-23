import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { BaseEntityType } from '~/types/entity';
import { DataTableActions, DataTableActionsProps } from './data-table-actions';

export interface DataTableProps<TData, TValue> extends DataTableActionsProps {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable<TData extends BaseEntityType, TValue>({
  columns,
  data,
  isLoading = true,
  extendActions = [],
  omitActions = [],
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    defaultColumn: {
      size: 200,
      minSize: 50,
      maxSize: 250,
    },
  });

  const hasActions = extendActions.length > 0 || omitActions.length < 1;

  return (
    <table border={1}>
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                colSpan={header.colSpan}
                style={{ width: `${header.getSize()}px` }}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </th>
            ))}
            {hasActions && <th>Actions</th>}
          </tr>
        ))}
      </thead>
      <tbody>
        {data.length === 0 && 'Kosong.'}
        {table.getCoreRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {isLoading
                  ? 'Loading...'
                  : flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
            {hasActions && (
              <td>
                <DataTableActions
                  extendActions={extendActions}
                  omitActions={omitActions}
                />
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
