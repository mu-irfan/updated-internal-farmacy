"use client";
import React, { useMemo } from "react";
import DashboardLayout from "../dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";
import Link from "next/link";
import ReportCard from "@/components/ReportCard";
import { companiesReportsTitles } from "@/constant/data";
import { useContextConsumer } from "@/context/Context";
import { useGetProductStats } from "@/hooks/useDataFetch";
import { SkeletonCard } from "@/components/SkeletonLoader";

const Franchises = () => {
  const { token, setMode } = useContextConsumer();

  //
  const { data: stats, isLoading: loading } = useGetProductStats(token);

  const reportsWithStats = useMemo(() => {
    return companiesReportsTitles.map((report) => ({
      title: report.title,
      value:
        stats?.data?.[report.key] < 10
          ? `0${stats.data[report.key]}`
          : stats?.data?.[report.key] || "00",
    }));
  }, [stats]);

  return (
    <>
      <DashboardLayout contentAtCenter>
        <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-7xl mx-auto">
          {loading ? (
            <SkeletonCard className="h-60 w-full col-span-3" />
          ) : (
            reportsWithStats.map((report, index) => (
              <ReportCard
                key={index}
                title={report.title}
                value={report.value}
              />
            ))
          )}
        </div>
        <Link
          href="/companies/companies-list"
          className="w-full mx-auto max-w-xl"
        >
          <Card
            className="w-full relative py-6 lg:py-8 max-w-xl lg:mt-4 rounded-xl text-center bg-muted/50 cards cursor-pointer"
            // onClick={() => {
            //   setAddFranchiseModalOpen((prev) => !prev);
            //   setMode("add");
            // }}
          >
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
                <Search className="h-8 w-8 mx-auto text-farmacieWhite" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
                Company List
              </div>
            </CardContent>
          </Card>
        </Link>
        <p className="text-sm text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Get all the names of the company added in the list or add new in list
        </p>
        <Link
          href="/companies/register-companies"
          className="w-full mx-auto max-w-xl"
        >
          <Card className="relative w-full py-6 lg:py-8 max-w-xl rounded-xl text-center bg-primary/10 border-2 border-primary">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
                <Search className="h-8 w-8 mx-auto text-primary dark:text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl lg:text-4xl font-bold text-primary dark:text-green-500">
                Registered Companies
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </Link>
        <p className="text-sm !text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Get all the companies that are registered and in business with
          Agronomics
        </p>
      </DashboardLayout>
    </>
  );
};

export default Franchises;
