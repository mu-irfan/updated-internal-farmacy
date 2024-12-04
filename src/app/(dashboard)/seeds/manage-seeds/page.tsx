"use client";
import React, { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Filter, Search, Trash, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import FilterSeedModal from "@/components/forms-modals/seeds/FilterSeeds";
import DataTable from "@/components/Table/DataTable";
import AddSeedModal from "@/components/forms-modals/seeds/AddSeed";
import Header from "@/components/Header";

import { useContextConsumer } from "@/context/Context";
import { debounce } from "lodash";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import { Toaster } from "react-hot-toast";
import {
  useDeleteSeed,
  useGetAllSeeds,
  useGetSeed,
} from "@/hooks/apis/useSeed";

const ManageSeeds = () => {
  const { token } = useContextConsumer();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddProductModalOpen, setAddProductModalOpen] =
    useState<boolean>(false);
  const [isViewSeedsModalOpen, setViewSeedsModalOpen] =
    useState<boolean>(false);
  const [selectedSeedToView, setSelectedSeedToView] = useState({});
  const [currentSeedUuid, setCurrentSeedUuid] = useState<string | null>(null);
  const [filterCriteria, setFilterCriteria] = useState({
    crop_category: "",
    crop: "",
    in_simulator: false,
    have_trail_data: false,
  });

  // seeds data
  const { data: seeds, isLoading: loading } = useGetAllSeeds(token);
  const { data: seedDetails, isLoading: seedLoading } = useGetSeed(
    currentSeedUuid!,
    token
  );
  const { mutate: deleteSeed, isPending: deletingSeed } = useDeleteSeed(token);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleFilterSubmit = (criteria: {
    crop_category: string;
    crop: string;
    in_simulator: boolean;
    have_trail_data: boolean;
  }) => {
    setFilterCriteria(criteria);
    setAddProductModalOpen(false);
  };

  const filteredSeeds = useMemo(() => {
    if (!seeds || !seeds.data) return [];
    return seeds.data
      .filter((seed: any) =>
        seed.seed_variety_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((seed: any) => {
        if (
          filterCriteria.crop_category &&
          seed.crop_category !== filterCriteria.crop_category
        )
          return false;
        if (filterCriteria.crop && seed.crop !== filterCriteria.crop)
          return false;
        if (
          filterCriteria.in_simulator &&
          seed.in_simulator !== filterCriteria.in_simulator
        )
          return false;
        if (
          filterCriteria.have_trail_data &&
          seed.have_trail_data !== filterCriteria.have_trail_data
        )
          return false;
        return true;
      });
  }, [seeds, searchQuery, filterCriteria]);

  const handleView = (seed: any) => {
    setViewSeedsModalOpen(true);
    setCurrentSeedUuid(seed.uuid);
  };

  const handleDelete = async (seedId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Seed?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteSeed(seedId);
    }
  };

  useEffect(() => {
    if (seedDetails?.success && seedDetails.data) {
      setSelectedSeedToView(seedDetails.data);
    }
  }, [seedDetails]);

  const seedColumns: {
    Header: string;
    accessor: SeedColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Seed Variety Name", accessor: "seed_variety_name" },
    { Header: "Brand Name", accessor: "company_fk" },
    { Header: "Crop Category", accessor: "crop_category" },
    { Header: "Crop", accessor: "crop" },
    { Header: "Trial Data", accessor: "trial_count" },
    {
      Header: "In Simulator",
      accessor: "in_simulator",
      Cell: ({ row }: any) =>
        row.original.in_simulator ? (
          <Check className="text-primary" />
        ) : (
          <X className="text-yellow-500 w-5 h-5" />
        ),
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex justify-end gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            View
          </Button>
          <Button
            size="icon"
            onClick={() => handleDelete(row.original.uuid)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deletingSeed}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Toaster />
      <DashboardLayout>
        <Header title="Manage Seed Varieties" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Filter search and update the seed varieties of global list
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent className="p-0 px-6">
            <div className="flex justify-between items-center gap-2">
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search seed variety by name ..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
              <Button
                className="text-farmacieWhite font-medium"
                type="button"
                onClick={() => setAddProductModalOpen((prev) => !prev)}
              >
                <Filter className="w-5 h-5 mr-1" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
        {loading ? (
          <SkeletonCard className="w-full h-80" />
        ) : filteredSeeds && filteredSeeds.length > 0 ? (
          <DataTable
            columns={seedColumns}
            data={filteredSeeds as SeedTableRow[]}
            paginate
            extendWidth
          />
        ) : (
          <NoData message="No Data Available" />
        )}
      </DashboardLayout>
      <FilterSeedModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
        onSubmit={handleFilterSubmit}
      />
      <AddSeedModal
        open={isViewSeedsModalOpen}
        onOpenChange={setViewSeedsModalOpen}
        mode="view"
        seedData={selectedSeedToView}
        loading={seedLoading}
      />
    </>
  );
};

export default ManageSeeds;
