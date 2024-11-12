"use client";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import VerifyCompanyModal from "@/components/forms-modals/companies/VerifyCompany";
import Stats from "@/components/forms-modals/ingredeints/Stats";
import Header from "@/components/Header";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { companiesData, franchiseData } from "@/constant/data";
import { Ban, Check } from "lucide-react";
import React, { useState } from "react";

const RegisterCompanyDetails = ({ params }: { params: { id: string } }) => {
  const [isVerifyCompanyModalOpen, setVerifyCompanyModalOpen] =
    useState<boolean>(false);
  const [visibleTable, setVisibleTable] = useState<"seeds" | "products" | null>(
    null
  );

  const franchiseId = parseInt(params.id, 10);
  const selectedFranchise = companiesData.find(
    (franchise) => franchise.id === franchiseId
  );

  if (!selectedFranchise) {
    return <p>Franchise not found.</p>;
  }

  const franchiseColumns: {
    Header: string;
    accessor: FranchisesColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Address", accessor: "address" },
    { Header: "Contact", accessor: "contact" },
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
      <DashboardLayout>
        <Header title="Company Details" />
        <Stats stats={selectedFranchise} />
        <div className="flex items-center justify-end gap-3 mb-8">
          {selectedFranchise.verified && (
            <Button
              className="font-medium w-60"
              onClick={() => setVisibleTable("products")}
            >
              Verify Franchises
            </Button>
          )}
          {!selectedFranchise.verified && (
            <Button
              className="font-medium w-60"
              onClick={() => setVerifyCompanyModalOpen(true)}
            >
              Verify Company
            </Button>
          )}
        </div>
        {visibleTable === "products" && (
          <DataTable columns={franchiseColumns} data={franchiseData} paginate />
        )}
      </DashboardLayout>
      <VerifyCompanyModal
        open={isVerifyCompanyModalOpen}
        onOpenChange={setVerifyCompanyModalOpen}
      />
    </>
  );
};

export default RegisterCompanyDetails;
