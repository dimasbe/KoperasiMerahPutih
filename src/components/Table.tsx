import React from "react";

interface TableProps {
  columns: string[];
  data: any[];
  renderRow: (item: any, index: number) => React.ReactNode;
}

const Table: React.FC<TableProps> = ({ columns, data, renderRow }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-200 dark:bg-gray-700">
          {columns.map((col) => (
            <th key={col} className="border p-2 text-left">{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, idx) => renderRow(item, idx))}
      </tbody>
    </table>
  );
};

export default Table;
