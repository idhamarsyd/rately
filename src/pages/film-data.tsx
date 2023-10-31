import React from "react";
import { Button, buttonVariants } from "../components/ui/button";
import { DataTable } from "../components/films/data-table";
import { filmsColumn } from "../components/films/column";
import { films } from "../data/films";
import { Outlet, Link } from "react-router-dom";

function FilmData() {
  return (
    <div className="min-h-screen flex flex-col gap-5 my-8 mx-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-secondary-foreground">
            Film
          </h2>
          <p className="text-muted-foreground">Kelola data film yang ada.</p>
        </div>
      </div>
      <DataTable columns={filmsColumn} data={films} />
    </div>
  );
}

export default FilmData;
