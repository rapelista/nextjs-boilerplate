'use client';

import { ColumnDef } from '@tanstack/react-table';
import { useGetPaginatedEntity } from '~/services/entity-paginated';
import { BaseEntityType } from '~/types/entity';
import { DataTable, DataTableProps } from './data-table';
import { Modal } from './modal';

interface DataTableMasterProps<TData, TValue>
  extends Omit<DataTableProps<TData, TValue>, 'data' | 'isLoading'> {
  context: string;
  children?: React.ReactNode;
}

export function DataTableMaster<TData, TValue>({
  context,
  columns,
  omitActions = [],
  extendActions = [],
  children,
}: DataTableMasterProps<TData, TValue>) {
  const { data, isFetching } = useGetPaginatedEntity(context);

  return (
    data && (
      <>
        <DataTable
          isLoading={isFetching}
          columns={columns as ColumnDef<BaseEntityType>[]}
          data={data.data}
          omitActions={omitActions}
          extendActions={extendActions}
        />
        <Modal>{children}</Modal>
      </>
    )
  );
}
