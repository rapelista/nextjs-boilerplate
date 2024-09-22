export function DataTable() {
  return (
    <table border={1}>
      <thead>
        <tr>
          <th>Column #1</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Row #1</td>
          <td>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
