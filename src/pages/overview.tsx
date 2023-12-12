import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button, buttonVariants } from "../components/ui/button";
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
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { fetchMovies } from "../stores/moviesSlice";
import {
  fetchClassifications,
  fetchComments,
  fetchDataTraining,
  fetchMetrics,
  selectMetrics,
} from "../stores/commentsSlice";
import { Item } from "@radix-ui/react-accordion";

function Overview() {
  const latestMovie = useAppSelector((state) =>
    state.movies.data.length > 0
      ? state.movies.data[state.movies.data.length - 1]
      : null
  );
  const totalMovies = useAppSelector((state) => state.movies.data.length);
  const totalComments = useAppSelector((state) => state.comments.data.length);
  const metrics = useAppSelector(selectMetrics);
  const totalPositive = useAppSelector((state) => {
    const classificationCount = state.comments.classification.filter(
      (item) => item.classification === "POSITIVE"
    ).length;

    const dataTrainingCount = state.comments.dataTraining.filter(
      (item) => item.label === "POSITIVE"
    ).length;

    return classificationCount + dataTrainingCount;
  });
  const totalNeutral = useAppSelector((state) => {
    const classificationCount = state.comments.classification.filter(
      (item) => item.classification === "NEUTRAL"
    ).length;

    const dataTrainingCount = state.comments.dataTraining.filter(
      (item) => item.label === "NEUTRAL"
    ).length;

    return classificationCount + dataTrainingCount;
  });
  const totalNegative = useAppSelector((state) => {
    const classificationCount = state.comments.classification.filter(
      (item) => item.classification === "NEGATIVE"
    ).length;

    const dataTrainingCount = state.comments.dataTraining.filter(
      (item) => item.label === "NEGATIVE"
    ).length;

    return classificationCount + dataTrainingCount;
  });
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchMovies());
    dispatch(fetchComments());
    dispatch(fetchClassifications());
    dispatch(fetchDataTraining());
    dispatch(fetchMetrics());
  }, []);
  return (
    <div className="min-h-screen flex flex-col gap-5 mb-8">
      <img
        src="https://images.unsplash.com/photo-1574267432553-4b4628081c31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1631&q=80"
        alt="cover"
        className="object-cover overflow-hidden h-64 w-full col-span-4"
      />
      <div className="flex items-center justify-between space-y-2 mx-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-secondary-foreground">
            Selamat datang!
          </h2>
          <p className="text-muted-foreground">
            Lihat analisis dari film yang ada.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5 mx-4">
        <div className="flex flex-col gap-3">
          <Card className="h-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Film</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4 text-muted-foreground"
              >
                <path d="m16 6 4 14" />
                <path d="M12 6v14" />
                <path d="M8 8v12" />
                <path d="M4 4v16" />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalMovies}</div>
              <p className="text-xs text-muted-foreground">
                Terakhir ditambahkan: {latestMovie?.title}
              </p>
            </CardContent>
          </Card>
          <Button
            asChild
            variant="secondary"
            className="text-secondary-foreground"
          >
            <Link to={`film-data`}>Kelola Film</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <Card className="h-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Komentar
              </CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4 text-muted-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalComments}</div>
              <p className="text-xs text-muted-foreground">
                {totalPositive} positif, {totalNeutral} netral, {totalNegative}{" "}
                negatif.
              </p>
            </CardContent>
          </Card>
          <Button
            asChild
            variant="secondary"
            className="text-secondary-foreground"
          >
            <Link to={`comment-data`}>Kelola Komentar</Link>
          </Button>
        </div>
        <div className="flex flex-col gap-3">
          <Card className="h-fit">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Akurasi</CardTitle>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4 text-muted-foreground"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                />
              </svg>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metrics?.accuracy}</div>
              <p className="text-xs text-muted-foreground">
                Precision: {metrics?.precision} | Recall: {metrics?.recall}
              </p>
            </CardContent>
          </Card>
          <Button
            asChild
            variant="secondary"
            className="text-secondary-foreground"
          >
            <Link to={`klasifikasi`}>Kelola Klasifikasi</Link>
          </Button>
        </div>
      </div>
      {/* <div className="mx-4 gap-3 flex flex-col mt-4 text-secondary-foreground">
        <Table>
          <TableCaption>Urutan film yang paling disukai.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Peringkat</TableHead>
              <TableHead>Judul</TableHead>
              <TableHead>Tahun Rilis</TableHead>
              <TableHead className="text-right">Komentar Positif</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">#1</TableCell>
              <TableCell>Talk To Me</TableCell>
              <TableCell>2023</TableCell>
              <TableCell className="text-right">100</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">#2</TableCell>
              <TableCell>Dark</TableCell>
              <TableCell>2020</TableCell>
              <TableCell className="text-right">88</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div> */}
    </div>
  );
}

export default Overview;
