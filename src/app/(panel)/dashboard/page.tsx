import { actions } from '~/components/(entity)/unit/actions';
import { columns } from '~/components/(entity)/unit/columns';
import { DataTableMaster } from '~/components/data-table-master';

export default function Page() {
  return (
    <>
      <DataTableMaster
        context="units"
        columns={columns}
        extendActions={actions}
        omitActions={['EDIT']}
      />
    </>
  );
}
