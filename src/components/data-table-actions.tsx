import React from 'react';

export type DataTableDefaultAction = 'DELETE' | 'EDIT';

export interface DataTableActionsProps {
  omitActions?: DataTableDefaultAction[];
  extendActions?: (
    | React.AnchorHTMLAttributes<HTMLAnchorElement>
    | React.ButtonHTMLAttributes<HTMLButtonElement>
  )[];
}

export function DataTableActions({
  omitActions = [],
  extendActions = [],
}: DataTableActionsProps) {
  return (
    <>
      {/**
       * Extended Actions, can button or link.
       */}
      {extendActions?.map((props, key) => {
        if ('href' in props) {
          return (
            <a
              key={key}
              {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
            />
          );
        } else {
          return (
            <button
              key={key}
              {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
            />
          );
        }
      })}

      {/**
       * Default Actions, remove if omitted.
       */}
      {!omitActions.includes('EDIT') && (
        <button key={`button-default-EDIT`} onClick={() => alert('Edit')}>
          Edit
        </button>
      )}
      {!omitActions.includes('DELETE') && (
        <button key={`button-default-DELETE`} onClick={() => alert('Delete')}>
          Delete
        </button>
      )}
    </>
  );
}
