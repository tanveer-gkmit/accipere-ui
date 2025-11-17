import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function DataTable({ columns, data }) {
  return (
    <Card>
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column, index) => (
              <TableHead key={index} className={column.className}>
                {column.header}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map((column, colIndex) => (
                  <TableCell key={colIndex} className={column.className}>
                    {typeof column.accessor === "function"
                      ? column.accessor(row)
                      : row[column.accessor]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
