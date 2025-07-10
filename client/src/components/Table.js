import { usePagination, useSortBy, useTable } from "react-table";
import "./Dashboard/orders.scss";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
const Table = ({ columns, data }) => {
  const table = useTable({ columns, data }, useSortBy, usePagination);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state,
    pageOptions,
    canNextPage,
    nextPage,
    canPreviousPage,
    previousPage,
  } = table;
  const { pageIndex } = state;
  return (
    <>
      <table className="table" {...getTableProps()}>
        <thead className="thead">
          {headerGroups.map((headerGroup) => (
            <tr className="tr" {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  className="th"
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render("Header")}
                  {column.isSorted ? (column.isSortedDesc ? " ▼" : " ▲") : ""}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="tbody" {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr className="table-row tr" {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td className="td table-d" {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {pageOptions.length > 1 && (
        <div className="orders-pagination">
          <span>{`Page ${pageIndex + 1} of ${pageOptions.length}`}</span>
          <span
            onClick={() => {
              previousPage();
            }}
            style={{ cursor: canPreviousPage && "pointer" }}
          >
            <MdKeyboardArrowLeft
              size={30}
              color={!canPreviousPage ? "grey" : undefined}
            />
          </span>
          <span
            onClick={() => nextPage()}
            style={{ cursor: canNextPage && "pointer" }}
          >
            <MdKeyboardArrowRight
              size={30}
              color={!canNextPage ? "grey" : undefined}
            />
          </span>
        </div>
      )}
    </>
  );
};

export default Table;
