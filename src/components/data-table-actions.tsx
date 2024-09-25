import { Button, Flex } from '@mantine/core';
import Link, { LinkProps } from 'next/link';
import { generateParamsFromSlug } from '~/lib/table';
import { useModalEntityStore } from '~/store/modal-entity';
import {
  DataTableActionType,
  DataTableDefaultActionKeyType,
} from '~/types/data-table';
import { BaseEntityType } from '~/types/entity';

export interface DataTableActionsProps<TData> {
  omitActions?: DataTableDefaultActionKeyType[];
  extendActions?: DataTableActionType[];
  entity: TData;
}

export function DataTableActions<TData extends BaseEntityType>({
  omitActions = [],
  extendActions = [],
  entity,
}: DataTableActionsProps<TData>) {
  return (
    <Flex gap="sm">
      {/**
       * Extended Actions, can button or link.
       */}
      {extendActions?.map((action, key) => (
        <DataTableAction key={key} {...action} entity={entity} />
      ))}

      {/**
       * Default Actions, remove if omitted.
       */}
      {!omitActions.includes('EDIT') && (
        <DataTableAction
          key={`default-action-EDIT`}
          label="Edit"
          color="green"
          entity={entity}
          state="EDIT"
        />
      )}
      {!omitActions.includes('DELETE') && (
        <DataTableAction
          key={`default-action-DELETE`}
          label="Delete"
          color="red"
          entity={entity}
          state="DELETE"
        />
      )}
    </Flex>
  );
}

export function DataTableAction<
  TData extends BaseEntityType,
  THref extends LinkProps['href']
>({
  href,
  label,
  entity,
  state,
  ...props
}: DataTableActionType<THref> & {
  entity: TData;
  state?: DataTableDefaultActionKeyType;
}) {
  const open = useModalEntityStore((state) => state.open);

  return href ? (
    <Link
      href={generateParamsFromSlug(href.toString(), entity)}
      prefetch={false}
      passHref
    >
      <Button size="xs" variant="outline" {...props}>
        {label}
      </Button>
    </Link>
  ) : (
    state && (
      <Button
        size="xs"
        variant="outline"
        {...props}
        onClick={() => {
          open({
            label,
            entity,
            state,
          });
        }}
      >
        {label}
      </Button>
    )
  );
}
