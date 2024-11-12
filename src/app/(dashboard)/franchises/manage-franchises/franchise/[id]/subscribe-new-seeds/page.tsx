"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Check, Filter, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import Header from "@/components/Header";
import DataTable from "@/components/Table/DataTable";
import AddSeedModal from "@/components/forms-modals/seeds/AddSeed";
import FilterProductSubscribeModal from "@/components/forms-modals/products/SubscribeNewProductModal";
import { useContextConsumer } from "@/context/Context";
import { useGetSeed, useGetUnSubscribedSeed } from "@/hooks/useDataFetch";
import { debounce } from "lodash";
import NoData from "@/components/alerts/NoData";
import { Toaster } from "react-hot-toast";

const SubscribeNewSeeds = ({ params }: any) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { token } = useContextConsumer();
  const [isAddProductModalOpen, setAddProductModalOpen] = useState(false);
  const [isViewSeedsModalOpen, setViewSeedsModalOpen] = useState(false);
  const [selectedSeedToView, setSelectedSeedToView] = useState({});
  const [currentSeedUuid, setCurrentSeedUuid] = useState<string | null>(null);
  const [filterCriteria, setFilterCriteria] = useState({
    category: "",
    crop: "",
    subscribed: "",
  });

  //
  const { data: unSubSeeds, isLoading: loading } = useGetUnSubscribedSeed(
    token,
    params.id
  );

  const { data: seedDetails, isLoading: seedLoading } = useGetSeed(
    currentSeedUuid!,
    token
  );

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleFilterSubmit = (criteria: {
    category: string;
    crop: string;
    subscribed: string;
  }) => {
    setFilterCriteria(criteria);
    setAddProductModalOpen(false);
  };

  const filteredUnsubSeeds = useMemo(() => {
    if (!unSubSeeds || !unSubSeeds.data) return [];
    return unSubSeeds.data
      .filter((unsubSeed: any) =>
        unsubSeed.seed_variety_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      .filter((unsubSeed: any) => {
        if (
          filterCriteria.category &&
          unsubSeed.category !== filterCriteria.category
        )
          return false;
        if (filterCriteria.crop && unsubSeed.crop !== filterCriteria.crop)
          return false;
        if (
          filterCriteria.subscribed &&
          String(unsubSeed.subscribed) !== filterCriteria.subscribed
        )
          return false;
        return true;
      });
  }, [unSubSeeds, searchQuery, filterCriteria]);

  const handleView = (seed: any) => {
    setViewSeedsModalOpen(true);
    setCurrentSeedUuid(seed.uuid);
  };

  useEffect(() => {
    if (seedDetails?.success && seedDetails.data) {
      setSelectedSeedToView(seedDetails.data);
    }
  }, [seedDetails]);

  const seedColumns: {
    Header: string;
    accessor: SeedColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element | null;
  }[] = [
    { Header: "Seed Variety Name", accessor: "seed_variety_name" },
    { Header: "Brand Name", accessor: "company_fk" },
    { Header: "Crop Category", accessor: "crop_category" },
    { Header: "Crop", accessor: "crop" },
    {
      Header: "Subscribed",
      accessor: "subscribed",
      Cell: ({ row }: any) =>
        row.original.subscribed ? (
          <Check className="text-primary ml-4" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5 ml-4" />
        ),
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) =>
        !row.original.subscribed ? (
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original)}
            className="border-primary bg-primary/10 text-primary tracking-wider hover:text-primary/80"
          >
            View & Subscribe
          </Button>
        ) : null,
    },
  ];

  return (
    <>
      <Toaster />
      <DashboardLayout>
        <Header title="Subscribe New Seed" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Search, find and subscribe seed from global list.
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
        {filteredUnsubSeeds && filteredUnsubSeeds.length > 0 ? (
          <DataTable
            columns={seedColumns}
            data={filteredUnsubSeeds as SeedTableRow[]}
          />
        ) : (
          <NoData message="No Data Available" />
        )}
      </DashboardLayout>
      <FilterProductSubscribeModal
        open={isAddProductModalOpen}
        onOpenChange={setAddProductModalOpen}
        onSubmit={handleFilterSubmit}
      />
      <AddSeedModal
        open={isViewSeedsModalOpen}
        onOpenChange={setViewSeedsModalOpen}
        mode="view"
        subscribe
        seedData={selectedSeedToView}
        currentFranchiseUuid={params.id}
      />
    </>
  );
};

export default SubscribeNewSeeds;
