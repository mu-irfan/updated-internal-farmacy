"use client";
import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import DashboardLayout from "../dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { debounce } from "lodash";
import {
  useGetAllSeedTrails,
  useGetAllSeedTrailsStages,
} from "@/hooks/apis/useSeedTrails";

const ManageSeedTrailData = () => {
  const { token } = useContextConsumer();
  const [viewStageAgainstSeed, setViewStageAgainstSeed] =
    useState<boolean>(false);
  const [trailUuid, setTrailUuid] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // seed trails
  const { data: seedTrails, isLoading: loading } = useGetAllSeedTrails(token);
  const { data: trailStages, isLoading: stagesLoading } =
    useGetAllSeedTrailsStages(trailUuid, token);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const filteredSeedTrails = useMemo(() => {
    if (!seedTrails || !seedTrails.data) return [];
    return seedTrails.data.filter((trail: any) =>
      trail?.seed?.seed_variety_name
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [seedTrails, searchQuery]);

  const filteredSeedTrailsStages = useMemo(() => {
    if (!trailStages || !trailStages.data) return [];
    return trailStages.data.filter((trail: any) =>
      trail?.stage?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [trailStages, searchQuery]);

  const handleView = (uuid: any) => {
    setViewStageAgainstSeed(true);
    setTrailUuid(uuid);
  };

  const SeedTrailColoumn: {
    Header: string;
    accessor: keyof SeedTrails | "actions";
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Seed variety name",
      accessor: "seed_variety_name",
      Cell: ({ row }: any) => row.original?.seed?.seed_variety_name || "N/A",
    },
    {
      Header: "Sowing date",
      accessor: "sowing_date",
      Cell: ({ row }: any) =>
        row.original.sowing_date.toString().split("T")[0] || "N/A",
    },
    { Header: "Tehsil", accessor: "tehsil" },
    { Header: "City", accessor: "city" },
    { Header: "Min irrigation mm", accessor: "min_irrigation" },
    { Header: "Max irrigation mm", accessor: "max_irrigation" },
    { Header: "Est yield", accessor: "estimated_yield" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <Button
          size="sm"
          variant="outline"
          onClick={() => handleView(row.original.uuid)}
          className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
        >
          View
        </Button>
      ),
    },
  ];

  const stageColumns: {
    Header: string;
    accessor: keyof SeedTrailsStages;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Stage",
      accessor: "stage",
      Cell: ({ row }: any) => row.original?.stage || "N/A",
    },
    {
      Header: "Principle Stage",
      accessor: "sub_stage",
      Cell: ({ row }: any) => row.original?.sub_stage || "N/A",
    },
    { Header: "BBCH scale", accessor: "bbch_scale" },
    { Header: "Start day", accessor: "start_day" },
    { Header: "End day", accessor: "end_day" },
    { Header: "Kc", accessor: "kc" },
  ];

  return (
    <DashboardLayout>
      <Header title="Seed Trials" />
      <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
        <CardContent className="p-0 px-6">
          <div className="flex justify-between items-center gap-2">
            <div className="relative max-w-md lg:max-w-lg w-full">
              <Input
                placeholder="Search crop by name ..."
                type="text"
                className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
      {!viewStageAgainstSeed &&
        (loading ? (
          <SkeletonCard className="w-full h-80" />
        ) : seedTrails && seedTrails?.data?.length > 0 ? (
          <div className="mt-8">
            <DataTable
              columns={SeedTrailColoumn}
              data={filteredSeedTrails as SeedTrailTableRow[]}
              paginate
            />
          </div>
        ) : (
          <NoData message="No Data Available" />
        ))}
      {viewStageAgainstSeed &&
        (stagesLoading ? (
          <SkeletonCard className="w-full h-80" />
        ) : trailStages && trailStages?.data?.length > 0 ? (
          <div className="mt-8">
            <DataTable
              columns={stageColumns}
              data={filteredSeedTrailsStages as SeedTrailsStages[]}
              paginate
            />
          </div>
        ) : (
          <NoData message="No Data Available" />
        ))}
    </DashboardLayout>
  );
};

export default ManageSeedTrailData;
