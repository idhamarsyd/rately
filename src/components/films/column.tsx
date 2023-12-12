"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { fetchMovies } from "../../stores/moviesSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { UpdateMovieForm } from "../ui/update-movie-form";
import { useToken } from "../../hooks/useToken";

export type Film = {
  cover: string;
  description: string;
  genre: string;
  id: string;
  title: string;
  trailer: string;
  year: number;
};

export const filmsColumn: ColumnDef<Film>[] = [
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
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "year",
    header: "Year",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const movie = row.original;
      const dispatch = useAppDispatch();
      const { token } = useToken();

      const deleteMovie = async () => {
        try {
          await axios({
            method: "DELETE",
            url: `/delete_movie/${movie.id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setTimeout(() => {
            toast({
              title: "Berhasil menghapus data film",
              description: `Film ${movie.title} berhasil dihapus.`,
            });
            dispatch(fetchMovies());
          }, 1000);
        } catch (error) {
          console.error("Error deleting movie:", error);
        }
      };

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => deleteMovie()}>
              Delete
            </DropdownMenuItem>
            <Sheet>
              <Button
                variant="ghost"
                asChild
                className="font-normal w-full justify-start text-left cursor-default select-none rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <SheetTrigger>Update</SheetTrigger>
              </Button>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Tambah Data Film</SheetTitle>
                  <SheetDescription>
                    Masukkan informasi film yang ingin ditambahkan.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 text-secondary-foreground">
                  <UpdateMovieForm {...movie} />
                </div>
              </SheetContent>
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
