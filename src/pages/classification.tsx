import React from "react";
import { DataTable } from "../components/classification/data-table";
import {
  columnsComment,
  columnsClassification,
} from "../components/classification/column";
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
  fetchDataClassifications,
  fetchComments,
  fetchDataTraining,
  selectClassifications,
  selectComments,
  selectDataTesting,
  selectDataTraining,
  fetchDataTesting,
  resetClassification,
  fetchStartClassification,
  selectMetrics,
  fetchMetrics,
  emptyClassification,
} from "../stores/commentsSlice";
import { Button } from "../components/ui/button";
import { Icons } from "../components/ui/icons";
import { toast } from "../components/ui/use-toast";
import { Toaster } from "../components/ui/toaster";

type EChartsOption = echarts.EChartsOption;

function Classification() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [isLoadingReset, setIsLoadingReset] = React.useState<boolean>(false);
  const [selectedTab, setSelectedTab] = React.useState<string>("training");

  const training = useAppSelector(selectDataTraining);
  const testing = useAppSelector(selectDataTesting);
  const classifications = useAppSelector(selectClassifications);

  const dispatch = useAppDispatch();

  const classificationHandler = async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchStartClassification());
      dispatch(fetchDataClassifications());
      dispatch(fetchMetrics());
    } catch (error) {
      console.error("Error in classificationHandler:", error);
    } finally {
      setIsLoading(false);
      toast({
        title: "Klasifikasi selesai.",
        description: "Proses klasifikasi selesai, silahkan lihat hasilnya.",
      });
    }
  };

  const resetHandler = async () => {
    try {
      setIsLoadingReset(true);
      await dispatch(resetClassification());
      dispatch(emptyClassification());
      // dispatch(fetchDataClassifications());
    } catch (error) {
      console.error("Error in resetHandler:", error);
    } finally {
      setIsLoadingReset(false);
      toast({
        title: "Reset klasiikasi selesai.",
        description: "Proses reset klasifikasi selesai, tabel akan kosong.",
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      switch (selectedTab) {
        case "training":
          await dispatch(fetchDataTraining());
          break;
        case "testing":
          await dispatch(fetchDataTesting());
          break;
        case "classification":
          await dispatch(fetchDataClassifications());
          await dispatch(fetchMetrics());
          break;
        default:
          break;
      }
    };

    fetchData();
  }, [dispatch, selectedTab]);

  const metrics = useAppSelector(selectMetrics);

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
          {
            value: classifications.filter(
              (data) => data.validation === "SESUAI"
            ).length,
            name: "SESUAI",
          },
          {
            value: classifications.filter(
              (data) => data.validation === "TIDAK SESUAI"
            ).length,
            name: "TIDAK SESUAI",
          },
        ],
      },
    ],
  };

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
        <div className="flex items-center gap-4">
          <Button
            disabled={isLoading}
            variant="default"
            onClick={() => classificationHandler()}
          >
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Klasifikasi
          </Button>
          <Button
            disabled={isLoadingReset}
            variant="destructive"
            onClick={() => resetHandler()}
          >
            {isLoadingReset && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Reset
          </Button>
        </div>
      </div>
      <Tabs
        value={selectedTab}
        onValueChange={(value) => setSelectedTab(value)}
        className="flex flex-col text-secondary-foreground gap-2"
      >
        <TabsList className="w-fit">
          <TabsTrigger value="training">Data Training</TabsTrigger>
          <TabsTrigger value="testing">Data Testing</TabsTrigger>
          <TabsTrigger value="classification">Hasil Klasifikasi</TabsTrigger>
        </TabsList>
        <TabsContent value="training">
          <DataTable columns={columnsComment} data={training} />
        </TabsContent>
        <TabsContent value="testing">
          <DataTable columns={columnsComment} data={testing} />
        </TabsContent>
        <TabsContent value="classification">
          <DataTable columns={columnsClassification} data={classifications} />
          <div className="text-secondary-foreground h-[400px] flex">
            <ReactECharts option={option} theme="dark" />
          </div>
          <div className="col-span-1">
            <Table>
              <TableCaption>Performa Klasifikasi</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead></TableHead>
                  <TableHead>Accuracy</TableHead>
                  <TableHead>Precision</TableHead>
                  <TableHead>Recall</TableHead>
                  <TableHead>F-1 Score</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>Hasil</TableCell>
                  <TableCell>{metrics?.accuracy}</TableCell>
                  <TableCell>{metrics?.precision}</TableCell>
                  <TableCell>{metrics?.recall}</TableCell>
                  <TableCell>{metrics?.f1_score}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
      <Toaster />
    </div>
  );
}

export default Classification;
