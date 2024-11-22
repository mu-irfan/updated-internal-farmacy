"use client";

import React, { useMemo, useState } from "react";
import { CirclePlus, Search } from "lucide-react";
import ReportCard from "@/components/ReportCard";
import { productsReportsTitles } from "@/constant/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import DashboardLayout from "../dashboard-layout";
import Link from "next/link";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { Toaster } from "react-hot-toast";
import { useGetProductStats } from "@/hooks/apis/useProduct";

export default function Dashboard() {
  const { token } = useContextConsumer();
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);

  //stats data
  const { data: stats, isLoading: loading } = useGetProductStats(token);

  const reportsWithStats = useMemo(() => {
    return productsReportsTitles.map((report) => ({
      title: report.title,
      value:
        stats?.data?.[report.key] < 10
          ? `0${stats.data[report.key]}`
          : stats?.data?.[report.key] || "00",
    }));
  }, [stats]);

  return (
    <>
      <Toaster />
      <DashboardLayout contentAtCenter>
        <div className="w-full grid gap-4 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 max-w-4xl mx-auto">
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
          className="w-full relative py-6 lg:py-8 max-w-xl lg:mt-4 rounded-xl text-center bg-muted/50 hover:bg-background cards cursor-pointer"
          onClick={() => setAddProductModalOpen((prev) => !prev)}
        >
          <CardHeader className="space-y-0 pb-2">
            <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
              <CirclePlus className="h-8 w-8 mx-auto text-farmacieWhite" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl lg:text-4xl font-bold text-farmacieWhite">
              Add New Product
            </div>
          </CardContent>
        </Card>
        <p className="text-sm text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Add product to global list
        </p>
        <Link href="/products/all-products" className="w-full mx-auto max-w-xl">
          <Card className="w-full py-6 lg:py-8 rounded-xl text-center bg-primary/10 border-2 border-primary">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-4xl font-medium lg:py-4">
                <Search className="h-8 w-8 mx-auto dark:text-green-500" />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl lg:text-4xl font-bold text-primary dark:text-green-500">
                Get Products
              </div>
            </CardContent>
          </Card>
        </Link>
        <p className="text-sm text-left lg:pl-2 font-medium pb-4 w-full max-w-xl dark:text-farmacieGrey">
          Search, filter or update product from the global list
        </p>
      </DashboardLayout>
      <AddProductModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
        mode="add"
      />
    </>
  );
}
