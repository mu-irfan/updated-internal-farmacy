"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, Search } from "lucide-react";
import AddFranchiseModal from "@/components/forms-modals/franchice/AddFranchise";
import Link from "next/link";
import ReportCard from "@/components/ReportCard";
import { franchiseReports } from "@/constant/data";
import { useContextConsumer } from "@/context/Context";
import { useGetFranchiseStats } from "@/hooks/useDataFetch";
import { SkeletonCard } from "@/components/SkeletonLoader";

const Franchises = () => {
  const { token, setMode } = useContextConsumer();
  const [isAddFranchiseModalOpen, setAddFranchiseModalOpen] = useState(false);

  //stats data
  const { data: stats, isLoading: loading } = useGetFranchiseStats(token);

  const reportsWithStats = useMemo(() => {
    return franchiseReports.map((report) => ({
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
        <Card
          className="w-full relative py-6 lg:py-8 max-w-xl lg:mt-4 rounded-xl text-center bg-muted/50 cards cursor-pointer"
          onClick={() => {
            setAddFranchiseModalOpen((prev) => !prev);
            setMode("add");
          }}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <CirclePlus className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
              Add New Franchise
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Add the franchises, to list and sell product on the farmacie
        </p>
        <Link
          href="/franchises/manage-franchises"
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
                Manage Franchises
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </Link>
        <p className="text-sm !text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          View and manage all the listed franchises
        </p>
      </DashboardLayout>
      <AddFranchiseModal
        open={isAddFranchiseModalOpen}
        onOpenChange={setAddFranchiseModalOpen}
      />
    </>
  );
};

export default Franchises;
