'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useGetPaginatedEntity } from '~/services/entity-paginated';
import { BaseEntityType } from '~/types/entity';
import { DataTable, DataTableProps } from './data-table';

interface DataTableMasterProps<TData, TValue>
  extends Omit<DataTableProps<TData, TValue>, 'data' | 'isLoading'> {
  context: string;
}

export function DataTableMaster<TData, TValue>({
  context,
  columns,
  omitActions = [],
  extendActions = [],
}: DataTableMasterProps<TData, TValue>) {
  const { data, isFetching } = useGetPaginatedEntity(context);

  return (
    <DataTable
      isLoading={isFetching}
      columns={columns as ColumnDef<BaseEntityType>[]}
      data={data?.data ?? []}
      omitActions={omitActions}
      extendActions={extendActions}
    />
  );
}
