import React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

const Table = ({ data, columns }) => {
  const table = useReactTable({
    data,
    columns,
    getFilteredRowModel: getFilteredRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });
  return (
    <div className="w-full overflow-x-auto flex flex-col">
      <table className="w-full flex flex-col border-collapse">
        <thead className="h-[48px] bg-[#383838] pl-[10px] border border-l-transparent border-r-transparent border-t-transparent border-b-[#ffffffe6] !text-[#fff] text-[14px] font-semibold flex w-full items-center">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="flex flex-1">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="flex flex-1">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody className="flex flex-col flex-1">
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className="h-[54px] !text-[#fff] border border-l-transparent border-r-transparent border-t-transparent border-b-[#ffffffe6] text-[14px] font-medium flex items-center w-full"
            >
              {row.getVisibleCells().map((cell, idx) => (
                <td
                  key={cell.id}
                  className="w-[500px] flex-1 flex overflow-x-hidden text-nowrap"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
