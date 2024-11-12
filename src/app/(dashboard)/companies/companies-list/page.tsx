"use client";
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Trash } from "lucide-react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/Table/DataTable";
import { ManagersData } from "@/constant/data";
import { Button } from "@/components/ui/button";
import DashboardLayout from "../../dashboard-layout";
import AddCompanyModal from "@/components/forms-modals/companies/AddNewCompany";

const CompaniesList = () => {
  const [isAddCompanyModalOpen, setAddCompanyModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewIngredientModalOpen, setViewIngredientModalOpen] =
    useState<boolean>(false);
  const [selectedIngredientToView, setSelectedIngredientToView] = useState({});

  const handleView = (manager: any) => {
    setViewIngredientModalOpen(true);
    setSelectedIngredientToView(manager);
  };

  const handleDelete = (managerId: string) => {
    console.log("Delete seed with ID:", managerId);
    // deleteManager(managerId);
  };

  const ManagerColumns: {
    Header: string;
    accessor: ManagersColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Company Name", accessor: "full_name" },
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
            Edit
          </Button>
          <Button
            size="icon"
            onClick={() => handleDelete(row.original.id)}
            className="bg-red-400 hover:bg-red-500 text-black"
            // disabled={deletingManager}
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
        <Header title="Get Companies List" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Find or add the new companies in the company list
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent className="p-0 px-6">
            <div className="flex justify-between items-center gap-2">
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search company by name..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
              <Button
                className="text-farmacieWhite font-medium"
                type="button"
                onClick={() => setAddCompanyModalOpen((prev) => !prev)}
              >
                Add New Company
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 xl:gap-14">
          <div className="w-full lg:col-span-3">
            <DataTable
              columns={ManagerColumns}
              data={ManagersData as ManagersTableRow[]}
            />
          </div>
          <Card className="relative flex flex-col justify-center py-5 lg:col-span-1 rounded-xl text-center bg-primary/10 transition-all delay-75 group/number dark:shadow-2xl">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-6xl font-bold text-primary dark:text-green-500">
                25
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:text-farmacieGrey">
              <div className="text-sm font-medium lg:pt-4">
                Total companies in list
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </div>
      </DashboardLayout>
      <AddCompanyModal
        open={isAddCompanyModalOpen}
        onOpenChange={setAddCompanyModalOpen}
        mode="add"
      />
      <AddCompanyModal
        open={isViewIngredientModalOpen}
        onOpenChange={setViewIngredientModalOpen}
        mode="view"
        manager={selectedIngredientToView}
      />
    </>
  );
};

export default CompaniesList;
