import React, { memo } from "react";

// Interfaz para las props del DataTable
interface DataTableProps<T> {
  data: T[];
  columns: { header: string; accessorKey: keyof T }[];
  className?: string;
  messageNoData?: string;
}

export const DataTable = memo(
  <T extends object>({
    data,
    columns,
    className = "",
    messageNoData = "No data available",
  }: DataTableProps<T>) => {
    return (
      <div
        className={`p-4 rounded-lg shadow-lg border bg-white ${className}`}
      >
        <table className="w-full border-collapse table-auto text-left">
          <thead className="bg-gray-100">
            <tr>
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-4 py-2 border-b border-gray-200 font-semibold text-gray-600"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((row, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-50">
                  {columns.map((column, colIndex) => (
                    <td
                      key={colIndex}
                      className="px-4 py-2 border-b border-gray-200"
                    >
                      {row[column.accessorKey] as React.ReactNode}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center px-4 py-2 text-gray-500"
                >
                  {messageNoData}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
);
