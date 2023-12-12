// import React from "react";
import { DataTable } from "../components/classification/data-table";
import { Comment, columnsTesting } from "../components/classification/column";

import { columnsComment } from "../components/comments/column";
// import { comments } from "../data/comments";
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
import { ReactECharts } from "../components/ui/charts";
import { useAppDispatch, useAppSelector } from "../stores/hooks";
import { useEffect } from "react";
import {
  fetchClassifications,
  fetchComments,
  fetchDataTraining,
  selectClassifications,
  selectComments,
  selectDataTraining,
} from "../stores/commentsSlice";

type EChartsOption = echarts.EChartsOption;

const option: EChartsOption = {
  color: ["#A8DF8E", "#FF4B91"],
  tooltip: {
    trigger: "item",
  },
  legend: {
    top: "5%",
    left: "center",
  },
  series: [
    {
      name: "Klasifikasi",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 0,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 24,
          fontWeight: "bold",
          fontFamily: "Inter",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: "Sesuai" },
        { value: 80, name: "Tidak Sesuai" },
      ],
    },
  ],
};

function Classification() {
  const comments = useAppSelector(selectDataTraining);
  const classifications = useAppSelector(selectClassifications);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchDataTraining());
    dispatch(fetchClassifications());
    // dispatch(fetchMoviesList());
  }, []);
  return (
    <div className="min-h-screen flex flex-col gap-5 my-8 mx-4">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-secondary-foreground">
            Klasifikasi
          </h2>
          <p className="text-muted-foreground">
            Proses dan hasil klasifikasi komentar film.
          </p>
        </div>
      </div>
      <Tabs
        defaultValue="training"
        className="flex flex-col text-secondary-foreground gap-2"
      >
        <TabsList className="w-fit">
          <TabsTrigger value="training">Data Training</TabsTrigger>
          <TabsTrigger value="testing">Data Testing</TabsTrigger>
        </TabsList>
        <TabsContent value="training">
          <DataTable columns={columnsComment} data={comments} />
        </TabsContent>
        <TabsContent value="testing">
          <DataTable columns={columnsTesting} data={classifications} />
        </TabsContent>
      </Tabs>
      <div className="text-secondary-foreground h-[400px] flex">
        <ReactECharts option={option} theme="dark" />
      </div>
      <div className="col-span-1">
        <Table>
          <TableCaption>Confusion Matrix</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Klasifikasi Positif</TableHead>
              <TableHead>Klasifikasi Negatif</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>Aktual Positif</TableCell>
              <TableCell>78%</TableCell>
              <TableCell>78%</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Aktual Negatif</TableCell>
              <TableCell>78%</TableCell>
              <TableCell>78%</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Classification;
