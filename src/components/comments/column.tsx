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
import axios from "axios";
import { toast } from "../ui/use-toast";
import { useAppSelector, useAppDispatch } from "../../stores/hooks";
import { fetchComments } from "../../stores/commentsSlice";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { useToken } from "../../hooks/useToken";
import { UpdateCommentForm } from "../ui/update-comment-form";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
// export type Comment = {
//   ID: string;
//   komentar: string;
//   film: string;
//   label: number;
//   klasifikasi: number;
//   validasi: boolean;
// };

export type Comment = {
  id: number;
  comment: string;
  movie: string;
  label: "POSITIVE" | "NEGATIVE" | "NEUTRAL";
};

export const columnsComment: ColumnDef<Comment>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={table.getIsAllPageRowsSelected()}
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
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
    // id: "label",
    // cell: ({ row }) => {
    //   const comment = row.original;

    //   return (
    //     <DropdownMenu>
    //       <DropdownMenuTrigger asChild>
    //         <Button variant="secondary" className="text-secondary-foreground">
    //           {comment.label}
    //         </Button>
    //       </DropdownMenuTrigger>
    //       <DropdownMenuContent align="end">
    //         <DropdownMenuLabel>Atur Label</DropdownMenuLabel>
    //         <DropdownMenuItem>POSITIVE</DropdownMenuItem>
    //         <DropdownMenuItem>NEGATIVE</DropdownMenuItem>
    //       </DropdownMenuContent>
    //     </DropdownMenu>
    //   );
    // },
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const comment = row.original;
      const dispatch = useAppDispatch();
      const { saveToken, token } = useToken();

      const deleteComment = async () => {
        try {
          await axios({
            method: "DELETE",
            url: `/delete_comment/${comment.id}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // await axios.delete(`/delete_comment/${comment.id}`);
          setTimeout(() => {
            toast({
              title: "Berhasil menghapus komentar",
              description: `Komentar dari film ${comment.movie} berhasil dihapus.`,
            });
            dispatch(fetchComments());
          }, 1000);
        } catch (error) {
          console.error("Error deleting comment:", error);
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
            <DropdownMenuItem onClick={() => deleteComment()}>
              Delete
            </DropdownMenuItem>
            <Sheet>
              <Button
                variant="ghost"
                onClick={() => console.log(comment)}
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
                  <UpdateCommentForm {...comment} />
                </div>
              </SheetContent>
            </Sheet>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
