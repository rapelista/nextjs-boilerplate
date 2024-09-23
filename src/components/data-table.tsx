import { Table } from '@mantine/core';
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
  });

  const hasActions = extendActions.length > 0 || omitActions.length < 1;

  return (
    <Table layout="fixed">
      <Table.Thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <Table.Tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <Table.Th
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
              </Table.Th>
            ))}
            {hasActions && <Table.Th>Actions</Table.Th>}
          </Table.Tr>
        ))}
      </Table.Thead>
      <Table.Tbody>
        {data.length === 0 && 'Kosong.'}
        {table.getCoreRowModel().rows.map((row) => (
          <Table.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Td key={cell.id}>
                {isLoading
                  ? 'Loading...'
                  : flexRender(cell.column.columnDef.cell, cell.getContext())}
              </Table.Td>
            ))}
            {hasActions && (
              <Table.Td>
                <DataTableActions
                  extendActions={extendActions}
                  omitActions={omitActions}
                />
              </Table.Td>
            )}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
