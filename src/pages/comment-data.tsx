import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button, buttonVariants } from "../components/ui/button";
import { DataTable } from "../components/classification/data-table";
import { Comment, columnsComment } from "../components/comments/column";
import { comments } from "../data/comments";
import { Outlet, Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";

function CommentData() {
  return (
    <div className="min-h-screen flex flex-col gap-5 my-8 mx-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-secondary-foreground">
            Komentar
          </h2>
          <p className="text-muted-foreground">
            Kelola data komentar yang ada.
          </p>
        </div>
      </div>
      <DataTable columns={columnsComment} data={comments} />
    </div>
  );
}

export default CommentData;
