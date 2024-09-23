import { Skeleton, Table } from '@mantine/core';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { defaultColumnSizing } from '~/lib/table';
import { BaseEntityType } from '~/types/entity';
import { DataTableActions, DataTableActionsProps } from './data-table-actions';

export interface DataTableProps<TData, TValue>
  extends Omit<DataTableActionsProps<TData>, 'entity'> {
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
    defaultColumn: defaultColumnSizing,
  });

  const hasActions = extendActions.length > 0 || omitActions.length < 1;

  return (
    <Table layout="unset">
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
            {hasActions && (
              <Table.Th style={{ width: `${defaultColumnSizing.maxSize}px` }}>
                Actions
              </Table.Th>
            )}
          </Table.Tr>
        ))}
      </Table.Thead>
      <Table.Tbody>
        {data.length === 0 && 'Kosong.'}
        {table.getCoreRowModel().rows.map((row) => (
          <Table.Tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <Table.Td key={cell.id}>
                {isLoading ? (
                  <Skeleton my={6} h={14} maw={cell.column.getSize()} />
                ) : (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )}
              </Table.Td>
            ))}
            {hasActions && (
              <Table.Td>
                {isLoading ? (
                  <Skeleton my={8} h={14} maw={defaultColumnSizing.size} />
                ) : (
                  <DataTableActions
                    extendActions={extendActions}
                    omitActions={omitActions}
                    entity={row.original}
                  />
                )}
              </Table.Td>
            )}
          </Table.Tr>
        ))}
      </Table.Tbody>
    </Table>
  );
}
