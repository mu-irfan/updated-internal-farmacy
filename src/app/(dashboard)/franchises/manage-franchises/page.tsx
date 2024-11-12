"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Check, Filter, Search, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import FilterFranchiceModal from "@/components/forms-modals/franchice/FilterFranchice";
import ActivateFranchiseModal from "@/components/forms-modals/franchice/ActivateFranchise";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import { useDeleteFranchise, useGetAllFranchises } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { debounce } from "lodash";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";

const ManageFranchises = () => {
  const router = useRouter();
  const { token } = useContextConsumer();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isAddFranchiceModalOpen, setAddFranchiceModalOpen] = useState(false);
  const [isBulkActivateModalOpen, setBulkActivateModalOpen] = useState(false);
  const [filterCriteria, setFilterCriteria] = useState({
    province: "",
    district: "",
    tehsil: "",
  });

  // franchises
  const { data: franchises, isLoading: loading } = useGetAllFranchises(token);
  const { mutate: deleteManager, isPending: deletingManager } =
    useDeleteFranchise(token);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleFilterSubmit = (criteria: {
    province: string;
    district: string;
    tehsil: string;
  }) => {
    setFilterCriteria(criteria);
    setAddFranchiceModalOpen(false);
  };

  const filteredManagers = useMemo(() => {
    if (!franchises || !franchises.data) return [];
    return franchises.data
      .filter((franchise: any) =>
        franchise.franchise_manager?.full_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      )
      .filter((franchise: any) => {
        if (
          filterCriteria.province &&
          franchise.province !== filterCriteria.province
        )
          return false;
        if (
          filterCriteria.district &&
          franchise.district !== filterCriteria.district
        )
          return false;
        if (filterCriteria.tehsil && franchise.tehsil !== filterCriteria.tehsil)
          return false;
        return true;
      });
  }, [franchises, searchQuery, filterCriteria]);

  const handleView = (franchise: any) => {
    router.push(`/franchises/manage-franchises/franchise/${franchise.uuid}`);
  };

  const handleDelete = async (franchiseId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Franchise?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteManager(franchiseId);
    }
  };

  const franchiseColumns: {
    Header: string;
    accessor: keyof Franchise | "actions";
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Manager Name",
      accessor: "full_name",
      Cell: ({ row }: any) =>
        row.original.franchise_manager?.full_name || "N/A",
    },
    // { Header: "Franchise Name", accessor: "franchiseName" },
    {
      Header: "Contact",
      accessor: "contact",
      Cell: ({ row }: any) => row.original.franchise_manager?.contact || "N/A",
    },
    { Header: "Address", accessor: "address" },
    { Header: "Tehsil", accessor: "tehsil" },
    {
      Header: "Active",
      accessor: "active",
      Cell: ({ row }: any) =>
        row.original.active ? (
          <Check className="text-primary" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5" />
        ),
    },
    { Header: "Remaining Days", accessor: "remainingDays" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center justify-end gap-4">
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
            disabled={deletingManager}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <Header title=" Get Franchise List" />
        <p className="text-md lg:pl-2 font-normal text-left pb-3 dark:text-farmacieGrey">
          Find or update franchise in the franchise list
        </p>
        <Button
          className="font-medium bg-yellow-500 hover:bg-yellow-600 text-black w-40"
          onClick={() => setBulkActivateModalOpen((prev) => !prev)}
        >
          Bulk Activate
        </Button>
        <p className="text-md lg:pl-2 font-normal text-left pb-3 dark:text-farmacieGrey">
          Activate the franchises in bulk in a single click
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent className="p-0 px-6">
            <div className="flex justify-between items-center gap-2">
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search franchise by name..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
              <Button
                className="text-farmacieWhite font-medium"
                type="button"
                onClick={() => setAddFranchiceModalOpen((prev) => !prev)}
              >
                <Filter className="w-5 h-5 mr-1" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>
        {loading ? (
          <SkeletonCard className="w-full h-80" />
        ) : filteredManagers && filteredManagers.length > 0 ? (
          <DataTable
            columns={franchiseColumns}
            data={filteredManagers as FranchiseTableRow[]}
          />
        ) : (
          <NoData message="No Data Available" />
        )}
      </DashboardLayout>
      <FilterFranchiceModal
        open={isAddFranchiceModalOpen}
        onOpenChange={setAddFranchiceModalOpen}
        onSubmit={handleFilterSubmit}
      />
      <ActivateFranchiseModal
        open={isBulkActivateModalOpen}
        onOpenChange={setBulkActivateModalOpen}
      />
    </>
  );
};

export default ManageFranchises;
