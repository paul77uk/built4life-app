"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import AddSet from "../dashboard/day/[workoutId]/exercise/[dayId]/add-set";
import EditExercise from "../dashboard/day/[workoutId]/exercise/[dayId]/edit-exercise";
import DeleteExercise from "./delete-exercise";
import { Exercises } from "@/lib/infer-types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  exercise: Exercises;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  exercise,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableCell
              colSpan={4}
              className="bg-primary rounded-t-md text-secondary-foreground"
            >
              <div className="flex w-full justify-between">
                <div>{exercise.name}</div>
                <div className="flex gap-2 items-center">
                  <AddSet exercise={exercise} />
                  <EditExercise exercise={exercise} />
                  <DeleteExercise id={exercise.id} />
                </div>
              </div>
            </TableCell>
          </TableRow>
        </TableHeader>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className="text-center">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="text-gray-400 text-center">
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
