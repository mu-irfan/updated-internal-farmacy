"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, Trash } from "lucide-react";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import AddManagerModal from "@/components/forms-modals/franchice/AddNewManager";
import { useDeleteManager, useGetAllManagers } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { debounce } from "lodash";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";

const ManageManagers = () => {
  const { token } = useContextConsumer();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewManagerModalOpen, setViewManagerModalOpen] =
    useState<boolean>(false);
  const [selectedManagerToView, setSelectedManagerToView] = useState({});

  // managers
  const { data: managers, isLoading: loading } = useGetAllManagers(token);
  const { mutate: deleteManager, isPending: deletingManager } =
    useDeleteManager(token);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const filteredManagers = useMemo(() => {
    if (!managers || !managers.data) return [];
    return managers.data.filter((manager: any) =>
      manager.full_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [managers, searchQuery]);

  const handleView = (manager: any) => {
    setViewManagerModalOpen(true);
    setSelectedManagerToView(manager);
  };

  const handleDelete = async (managerId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Manager?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteManager(managerId);
    }
  };

  const ManagerColumns: {
    Header: string;
    accessor: ManagersColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Manager Name", accessor: "full_name" },
    { Header: "Phone Number", accessor: "contact" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
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
        <Header title="Managers" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Update the managers who are managing the franchises
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent className="p-0 px-6">
            <div className="flex justify-between items-center gap-2">
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search seed manger by name ..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        {loading ? (
          <SkeletonCard className="w-full h-80" />
        ) : filteredManagers && filteredManagers.length > 0 ? (
          <DataTable
            columns={ManagerColumns}
            data={filteredManagers as ManagersTableRow[]}
          />
        ) : (
          <NoData message="No Data Available" />
        )}
      </DashboardLayout>
      <AddManagerModal
        open={isViewManagerModalOpen}
        onOpenChange={setViewManagerModalOpen}
        mode="view"
        manager={selectedManagerToView}
      />
    </>
  );
};

export default ManageManagers;
