"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Checkbox } from "../ui/checkbox";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export type Comment = {
  id: number;
  comment: string;
  movie: string;
  label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  category: "TESTING" | "TRAINING";
};

export type Classification = {
  id: number;
  comment_id: number;
  comment: string;
  movie: string;
  classification: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
  validation: "SESUAI" | "TIDAK SESUAI";
};

export const columnsComment: ColumnDef<Comment>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "comment",
    header: "Komentar",
  },
  {
    accessorKey: "movie",
    header: "Movie",
  },
  {
    accessorKey: "label",
    header: "Label",
  },
];

export const columnsClassification: ColumnDef<Classification>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "comment_id",
    header: "ID Komentar",
  },
  {
    accessorKey: "comment",
    header: "Komentar",
  },
  {
    accessorKey: "movie",
    header: "Movie",
  },
  {
    accessorKey: "classification",
    header: "Klasifikasi",
  },
  {
    accessorKey: "validation",
    header: "Validasi",
  },
];
