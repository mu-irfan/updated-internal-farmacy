"use client";
import React, { useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, Search } from "lucide-react";
import Link from "next/link";
import AddManagerModal from "@/components/forms-modals/franchice/AddNewManager";
import { useContextConsumer } from "@/context/Context";
import { useGetManagerStats } from "@/hooks/useDataFetch";
import { SkeletonCard } from "@/components/SkeletonLoader";

const Managers = () => {
  const { token } = useContextConsumer();
  const [isAddManagerModalOpen, setAddManagerModalOpen] = useState(false);

  //manager stats
  const { data: stats, isLoading: loading } = useGetManagerStats(token);

  return (
    <>
      <DashboardLayout contentAtCenter>
        {loading ? (
          <SkeletonCard className="h-60 w-[30vw]" />
        ) : (
          <Card className="relative w-full py-6 lg:py-8 max-w-xl rounded-xl text-center bg-primary/10">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-6xl font-bold text-green-500">
                {stats?.data?.franchiseManagersCount < 10
                  ? `0${stats?.data?.franchiseManagersCount}`
                  : stats?.data?.franchiseManagersCount || "00"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-md font-medium lg:pt-4 dark:text-farmacieGrey">
                Total Managers
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        )}
        <Card
          className="w-full relative py-6 lg:py-8 max-w-xl lg:mt-4 rounded-xl text-center bg-muted/50 cards cursor-pointer"
          onClick={() => setAddManagerModalOpen((prev) => !prev)}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <CirclePlus className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
              Add New Manager
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Add managers who are responsible for managing assigned franchises
        </p>
        <Link
          href="/managers/manage-managers"
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
                Manage Managers
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </Link>
        <p className="text-sm !text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Search and update managers
        </p>
      </DashboardLayout>
      <AddManagerModal
        open={isAddManagerModalOpen}
        onOpenChange={setAddManagerModalOpen}
        mode="add"
      />
    </>
  );
};

export default Managers;
