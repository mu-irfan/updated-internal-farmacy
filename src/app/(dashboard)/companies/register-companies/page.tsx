"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Check, Search, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/Table/DataTable";
import { companiesData } from "@/constant/data";
import Header from "@/components/Header";
import { debounce } from "lodash";

const ManageRegisterCompanies = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  // const filterRegisterCompanies = useMemo(() => {
  //   if (!seeds || !seeds.data) return [];
  //   return seeds.data
  //     .filter((seed: any) =>
  //       seed.seed_variety_name.toLowerCase().includes(searchQuery.toLowerCase())
  //     )
  //     .filter((seed: any) => {
  //       if (
  //         filterCriteria.category &&
  //         seed.crop_category !== filterCriteria.category
  //       )
  //         return false;
  //       if (filterCriteria.crop && seed.crop !== filterCriteria.crop)
  //         return false;
  //       return true;
  //     });
  // }, [seeds, searchQuery, filterCriteria]);

  const handleView = (franchise: Companies) => {
    router.push(`/companies/register-companies/company/${franchise.id}`);
  };

  const handleDelete = (franchiseId: number) => {
    // Logic to delete the product
    console.log("Delete franchise with ID:", franchiseId);
    // Add your delete logic here
  };

  const companyColumns: {
    Header: string;
    accessor: CompaniesColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Company Name", accessor: "managerName" },
    { Header: "Email", accessor: "email" },
    { Header: "NTN", accessor: "ntn" },
    { Header: "Contact", accessor: "phoneNo" },
    {
      Header: "Verified",
      accessor: "verified",
      Cell: ({ row }: any) =>
        row.original.verified ? (
          <Check className="text-primary" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5" />
        ),
    },
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
            onClick={() => handleDelete(row.original.id)}
            className="bg-red-400 hover:bg-red-500 text-black"
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
        <Header title="Get Registered Companies" />
        <p className="text-md lg:pl-2 font-normal text-left pb-3 dark:text-farmacieGrey">
          Get all the companies that are in business with the agronomics
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent className="p-0 px-6">
            <div className="flex justify-between items-center gap-2">
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search company by name..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
            </div>
          </CardContent>
        </Card>
        <DataTable
          columns={companyColumns}
          data={companiesData as FranchiseTableRow[]}
        />
      </DashboardLayout>
    </>
  );
};

export default ManageRegisterCompanies;
