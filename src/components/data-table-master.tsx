'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useGetPaginatedEntity } from '~/services/entity-paginated';
import { BaseEntityType } from '~/types/entity';
import { DataTable } from './data-table';

interface DataTableMasterProps<TData> {
  columns: ColumnDef<TData>[];
  context: string;
}

export function DataTableMaster<TData>({
  context,
  columns,
}: DataTableMasterProps<TData>) {
  const { data, isFetching } = useGetPaginatedEntity(context);

  return (
    data && (
      <DataTable
        isLoading={isFetching}
        columns={columns as ColumnDef<BaseEntityType>[]}
        data={data?.data}
      />
    )
  );
}
