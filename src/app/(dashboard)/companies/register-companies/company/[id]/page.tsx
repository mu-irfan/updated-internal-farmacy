"use client";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import NoData from "@/components/alerts/NoData";
import VerifyCompanyModal from "@/components/forms-modals/companies/VerifyCompany";
import Stats from "@/components/forms-modals/ingredeints/Stats";
import Header from "@/components/Header";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { useContextConsumer } from "@/context/Context";
import {
  useGetAllCompanyFranchises,
  useRegisterCompaniesUsers,
} from "@/hooks/apis/useRegisteredCompanies";
import { Ban, Check } from "lucide-react";
import React, { useState } from "react";
import { Toaster } from "react-hot-toast";

const RegisterCompanyDetails = ({ params }: { params: { id: string } }) => {
  const { token } = useContextConsumer();
  const [isVerifyCompanyModalOpen, setVerifyCompanyModalOpen] =
    useState<boolean>(false);
  const [visibleTable, setVisibleTable] = useState<
    "franchise" | "companies" | null
  >(null);

  //
  const { data: registeredCompaniesList } = useRegisterCompaniesUsers(token);

  const selectedCompany = registeredCompaniesList?.data?.find(
    (franchise: any) => franchise.uuid === params.id
  );

  const { data: CompanyFranchises, refetch } = useGetAllCompanyFranchises(
    selectedCompany?.company_fk,
    token
  );

  if (!selectedCompany) {
    return <p>Register Company Not Found.</p>;
  }

  const franchiseColumns: {
    Header: string;
    accessor: FranchisesColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Address", accessor: "address" },
    {
      Header: "Contact",
      accessor: "contact",
      Cell: ({ row }: any) => row.original.franchise_manager?.contact || "N/A",
    },
    { Header: "Tehsil", accessor: "tehsil" },
    { Header: "District", accessor: "district" },
    { Header: "Province", accessor: "province" },
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
  ];

  return (
    <>
      <Toaster />
      <DashboardLayout>
        <Header title="Company Details" />
        <Stats stats={selectedCompany} />
        <div className="flex items-center justify-end gap-3 mb-8">
          {selectedCompany.verified && (
            <Button
              className="font-medium w-60"
              onClick={() => {
                refetch();
                setVisibleTable("franchise");
              }}
            >
              Verify Franchises
            </Button>
          )}
          {!selectedCompany.verified && (
            <Button
              className="font-medium w-60"
              onClick={() => {
                setVisibleTable("companies");
                setVerifyCompanyModalOpen(true);
              }}
            >
              Verify Company
            </Button>
          )}
        </div>
        {visibleTable === "franchise" &&
        CompanyFranchises &&
        CompanyFranchises?.data?.length > 0 ? (
          <DataTable
            columns={franchiseColumns}
            data={CompanyFranchises?.data as FranchiseTableRow[]}
            paginate={CompanyFranchises?.data?.length > 10}
          />
        ) : (
          visibleTable === "franchise" && (
            <NoData message="No Franchise Available..." />
          )
        )}
      </DashboardLayout>
      {visibleTable === "companies" && (
        <VerifyCompanyModal
          open={isVerifyCompanyModalOpen}
          onOpenChange={setVerifyCompanyModalOpen}
          uid={params.id}
        />
      )}
    </>
  );
};

export default RegisterCompanyDetails;
