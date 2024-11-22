"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Ban, Check, Search, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import { debounce } from "lodash";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import { Toaster } from "react-hot-toast";
import {
  useDeleteRegisterCompany,
  useRegisterCompaniesUsers,
} from "@/hooks/apis/useRegisteredCompanies";

const ManageRegisterCompanies = () => {
  const { token } = useContextConsumer();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const {
    data: registeredCompaniesList,
    isLoading: registeredCompaniesListLoading,
  } = useRegisterCompaniesUsers(token);
  const { mutate: deleteCompany, isPending: deletingCompany } =
    useDeleteRegisterCompany(token);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const filterRegisterCompaniesData = useMemo(() => {
    if (!registeredCompaniesList || !registeredCompaniesList?.data) return [];
    return registeredCompaniesList?.data?.filter((company: any) =>
      company.company_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [registeredCompaniesList, searchQuery]);

  const handleView = (franchise: Companies) => {
    router.push(`/companies/register-companies/company/${franchise.uuid}`);
  };

  const handleDelete = async (company: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Company?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteCompany(company.uuid);
    }
  };

  const companyColumns: {
    Header: string;
    accessor: CompaniesColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Company Name", accessor: "company_name" },
    { Header: "Email", accessor: "email" },
    { Header: "NTN", accessor: "ntn" },
    { Header: "Contact", accessor: "contact" },
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
            onClick={() => handleDelete(row.original)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deletingCompany}
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
        <div className="w-full lg:col-span-3">
          {registeredCompaniesListLoading ? (
            <SkeletonCard className="w-full h-80" />
          ) : registeredCompaniesList?.data &&
            registeredCompaniesList?.data?.length > 0 ? (
            <DataTable
              columns={companyColumns}
              data={filterRegisterCompaniesData as FranchiseTableRow[]}
              extendWidth
              paginate
            />
          ) : (
            <NoData message="No Data Available" />
          )}
        </div>
      </DashboardLayout>
    </>
  );
};

export default ManageRegisterCompanies;
