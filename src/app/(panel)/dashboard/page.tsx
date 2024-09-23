import { actions } from '~/components/(example)/unit/actions';
import { columns } from '~/components/(example)/unit/columns';
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
