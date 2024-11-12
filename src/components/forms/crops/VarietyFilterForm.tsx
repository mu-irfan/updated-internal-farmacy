import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Check, Filter, Search, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSeedModal from "@/components/forms-modals/seeds/FilterSeeds";
import DataTable from "@/components/Table/DataTable";
import { varietyData } from "@/constant/data";
import AddSeedToSimulatorModal from "@/components/forms-modals/seeds/AddSeedToSimulator";

const VarietyFilterForm = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCropVarieyFilterModalOpen, setCropVarieyFilterModalOpen] =
    useState<boolean>(false);
  const [isViewVarietyModalOpen, setViewVarietyModalOpen] =
    useState<boolean>(false);
  const [selectedVarietyToView, setSelectedVarietyToView] = useState({});

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleView = (crop: any) => {
    setSelectedVarietyToView(crop);
    setViewVarietyModalOpen(true);
    // setCurrentSeedUuid(seed.uuid);
  };

  const handleDelete = (varietyId: string) => {
    // deleteSeed(seedId);
  };

  const varietyColoums: {
    Header: string;
    accessor: VarietyColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Variety Name", accessor: "variety_name" },
    { Header: "Variety Urdu", accessor: "variety_urdu" },
    { Header: "Crop", accessor: "crop" },
    {
      Header: "In Farmacie",
      accessor: "in_farmacie",
      Cell: ({ row }: any) =>
        row.original.in_farmacie ? (
          <Check className="text-primary" />
        ) : (
          <X className="text-yellow-500 w-5 h-5" />
        ),
    },
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
            // disabled={deletingSeed}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
        <CardContent className="p-0 px-6">
          <div className="flex justify-between items-center gap-2">
            <div className="relative max-w-md lg:max-w-lg w-full">
              <Input
                placeholder="Search variety by name ..."
                type="text"
                className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
            </div>
            <Button
              className="text-farmacieWhite font-medium"
              type="button"
              onClick={() => setCropVarieyFilterModalOpen((prev) => !prev)}
            >
              <Filter className="w-5 h-5 mr-1" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>
      <DataTable
        columns={varietyColoums}
        data={varietyData as VarietyTableRow[]}
      />
      <AddSeedToSimulatorModal
        open={isViewVarietyModalOpen}
        onOpenChange={setViewVarietyModalOpen}
        selectedItem={selectedVarietyToView}
        viewVariety
      />
      <FilterSeedModal
        open={isCropVarieyFilterModalOpen}
        onOpenChange={setCropVarieyFilterModalOpen}
      />
    </>
  );
};

export default VarietyFilterForm;
