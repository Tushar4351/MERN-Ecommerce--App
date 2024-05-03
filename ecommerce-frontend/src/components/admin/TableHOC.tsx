// import {
//   AiOutlineSortAscending,
//   AiOutlineSortDescending,
// } from "react-icons/ai";
import {
  Column,
  usePagination,
  useSortBy,
  useTable,
  TableOptions,
} from "react-table";

function TableHOC<T extends object>(
  columns: Column<T>[],
  data: T[],
  containerClassname: string,
  heading: string
  // showPagination: boolean = false
) {
  return function HOC() {
    const options: TableOptions<T> = {
      columns,
      data,
      //   initialState: {
      //     pageSize: 6,
      //   },
    };

    const {
      getTableProps,
      getTableBodyProps,
      headerGroups,
      rows,
      //  page,
      prepareRow,
      //   nextPage,
      //   pageCount,
      //   state: { pageIndex },
      //   previousPage,
      //   canNextPage,
      //   canPreviousPage,
    } = useTable(options, useSortBy, usePagination);

    return (
      <div className={containerClassname}>
        <h2 className="heading antialiased tracking-normal text-2xl font-semibold leading-snug mb-4">
          {heading}
        </h2>

        <table
          className="table w-full text-sm text-left rtl:text-right text-gray-500"
          {...getTableProps()}
        >
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th className="px-6 py-3" {...column.getHeaderProps()}>
                    {column.render("Header")}
                    {/* {column.isSorted && (
                      <span>
                        {" "}
                        {column.isSortedDesc ? (
                          <AiOutlineSortDescending />
                        ) : (
                          <AiOutlineSortAscending />
                        )}
                      </span>
                    )} */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);

              return (
                <tr {...row.getRowProps()} className="bg-white border-b">
                  {row.cells.map((cell) => (
                    <td className="px-6 py-4" {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* {showPagination && (
          <div className="table-pagination">
            <button disabled={!canPreviousPage} onClick={previousPage}>
              Prev
            </button>
            <span>{`${pageIndex + 1} of ${pageCount}`}</span>
            <button disabled={!canNextPage} onClick={nextPage}>
              Next
            </button>
          </div>
        )} */}
      </div>
    );
  };
}

export default TableHOC;
