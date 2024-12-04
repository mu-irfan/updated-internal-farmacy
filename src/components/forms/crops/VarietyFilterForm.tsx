import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Check, Filter, Search, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/Table/DataTable";
import AddSeedToSimulatorModal from "@/components/forms-modals/seeds/AddSeedToSimulator";
import { useContextConsumer } from "@/context/Context";
import FilterVarityModal from "@/components/forms-modals/crop/VarietyFilter";
import { SkeletonCard } from "@/components/SkeletonLoader";
import NoData from "@/components/alerts/NoData";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import {
  useDeleteCropVariety,
  useGetAllCropsVaritites,
  useGetCropVariety,
} from "@/hooks/apis/crop/useCropVarities";

const VarietyFilterForm = () => {
  const { token } = useContextConsumer();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isCropVarieyFilterModalOpen, setCropVarieyFilterModalOpen] =
    useState<boolean>(false);
  const [isViewVarietyModalOpen, setViewVarietyModalOpen] =
    useState<boolean>(false);
  const [selectedVarietyToView, setSelectedVarietyToView] = useState({});
  const [currentCropVarietyName, setCurrentCropVarietyName] = useState<
    string | null
  >(null);
  const [filterCriteria, setFilterCriteria] = useState({
    crop_fk: "",
    in_farmacie: false,
  });

  //
  const { data: cropVarities, isLoading: varitiesLoading } =
    useGetAllCropsVaritites(token);
  const { data: cropVariety, isLoading: cropVarietyLoading } =
    useGetCropVariety(currentCropVarietyName!, token);
  const { mutate: deleteCropVariety, isPending: deleting } =
    useDeleteCropVariety(token);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const handleFilterSubmit = (criteria: {
    crop_fk: string;
    in_farmacie: boolean;
  }) => {
    setFilterCriteria(criteria);
    setCropVarieyFilterModalOpen(false);
  };

  const filteredVarieties = useMemo(() => {
    if (!cropVarities || !cropVarities.data) return [];
    return cropVarities.data
      .filter((variety: any) =>
        variety.variety_eng.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .filter((variety: any) => {
        if (
          filterCriteria.crop_fk &&
          variety.crop_fk !== filterCriteria.crop_fk
        )
          return false;
        if (
          filterCriteria.in_farmacie &&
          variety.in_farmacie !== filterCriteria.in_farmacie
        )
          return false;
        return true;
      });
  }, [cropVarities, searchQuery, filterCriteria]);

  const handleView = (variety: any) => {
    setCurrentCropVarietyName(variety.variety_eng);
    setViewVarietyModalOpen(true);
  };

  const handleDelete = async (name: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Crop Variety?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteCropVariety(name);
    }
  };

  useEffect(() => {
    if (cropVariety?.success && cropVariety.data) {
      setSelectedVarietyToView(cropVariety.data);
    }
  }, [cropVariety]);

  const varietyColoums: {
    Header: string;
    accessor: VarietyColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Variety Name", accessor: "variety_eng" },
    { Header: "Variety Urdu", accessor: "variety_urdu" },
    { Header: "Crop", accessor: "crop_fk" },
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
            onClick={() => handleDelete(row.original.variety_eng)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deleting}
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
      {varitiesLoading ? (
        <SkeletonCard className="w-full h-80" />
      ) : filteredVarieties && filteredVarieties.length > 0 ? (
        <DataTable
          columns={varietyColoums}
          data={filteredVarieties as VarietyTableRow[]}
          paginate
        />
      ) : (
        <NoData message="No Data Available" />
      )}
      <AddSeedToSimulatorModal
        open={isViewVarietyModalOpen}
        onOpenChange={setViewVarietyModalOpen}
        selectedItem={selectedVarietyToView}
        mode="view"
        viewVariety
        loading={cropVarietyLoading}
      />
      <FilterVarityModal
        open={isCropVarieyFilterModalOpen}
        onOpenChange={setCropVarieyFilterModalOpen}
        onSubmit={handleFilterSubmit}
      />
    </>
  );
};

export default VarietyFilterForm;
