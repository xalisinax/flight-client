import { JSX, useState } from "react";

interface Column<T> {
  label: string;
  accessor?: string;
  render?: (row: T) => JSX.Element;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
}

export function Table<T>({ data, columns }: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedData = [...data].sort((a : any, b : any) => {
    if (!sortColumn) return 0;
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
    }
    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    return 0;
  });

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            {columns.map((col) => (
              <th
                key={col.accessor as string}
                className="py-3 px-4 text-left font-semibold cursor-pointer"
                onClick={col.accessor ? () => handleSort(col.accessor as string) : undefined}
              >
                {col.label}
                {sortColumn === col.accessor && (
                  <span className="ml-2 text-gray-500">
                    {sortDirection === "asc" ? "▲" : "▼"}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
        {sortedData.map((row : any, index) => (
            <tr key={index} className="border-t hover:bg-gray-50">
              {columns.map((col) => (
                <td key={col.label} className="py-3 px-4">
                  {col.accessor ? row[col.accessor] : col.render ? col.render(row) : null}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
