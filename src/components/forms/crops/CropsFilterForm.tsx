import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { Search, Trash, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/Table/DataTable";
import { cropsData } from "@/constant/data";
import AddSeedToSimulatorModal from "@/components/forms-modals/seeds/AddSeedToSimulator";
import { useGetAllCrops, useGetAllSeeds } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";
import NoData from "@/components/alerts/NoData";

const CropsFilterForm = () => {
  const { token } = useContextConsumer();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCropToView, setSelectedCropToView] = useState({});
  const [isViewCropsModalOpen, setViewCropsModalOpen] =
    useState<boolean>(false);
  const [viewStageAgainstCrop, setViewStageAgainstCrop] =
    useState<boolean>(false);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const [currentSeedUuid, setCurrentSeedUuid] = useState<string | null>(null);

  // crop data, below code will be replaced by crop
  const { data: crops, isLoading: cropsLoading } = useGetAllCrops(token);

  console.log(crops, "cropsloadinggggggg");

  // const { data: seedDetails, isLoading: seedLoading } = useGetSeed(
  //   currentSeedUuid!,
  //   token
  // );
  // const { mutate: deleteSeed, isPending: deletingSeed } = useDeleteSeed(token);

  const filteredCrops = useMemo(() => {
    if (!crops || !crops.message) return [];
    return crops?.message?.filter((crop: any) =>
      crop.crop_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [crops, searchQuery]);

  const handleView = (crop: any) => {
    setSelectedCropToView(crop);
    setViewCropsModalOpen(true);
    // setCurrentSeedUuid(seed.uuid);
  };

  const handleDelete = (cropId: string) => {
    // deleteSeed(seedId);
  };

  // useEffect(() => {
  //   if (seedDetails?.success && seedDetails.data) {
  //     setSelectedCropToView(seedDetails.data);
  //   }
  // }, [seedDetails]);

  const cropColoums: {
    Header: string;
    accessor: CropColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Crop Name", accessor: "crop_name" },
    { Header: "Crop Category", accessor: "crop_category" },
    { Header: "Source", accessor: "source" },
    { Header: "Stages Count", accessor: "stage_count" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setViewStageAgainstCrop(true)}
            className="border-yellow-600 bg-yellow-300/10 w-28 text-yellow-600 tracking-wider hover:text-yellow/80"
          >
            Crop Stage
          </Button>
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

  const stageColumns: {
    Header: string;
    accessor: keyof CropTrailsStages;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Crop Name", accessor: "crop_name" },
    {
      Header: "Stage",
      accessor: "stage",
      Cell: ({ row }: any) => row.original?.stage || "N/A",
    },
    {
      Header: "Principle Stage",
      accessor: "sub_stage",
      Cell: ({ row }: any) => row.original?.sub_stage || "N/A",
    },
    { Header: "BBCH scale", accessor: "bbch_scale" },
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
                placeholder="Search crop by name ..."
                type="text"
                className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                onChange={(e) => handleSearchChange(e.target.value)}
              />
              <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </CardContent>
      </Card>
      {/* {!viewStageAgainstCrop &&
        (loading ? (
          <SkeletonCard className="w-full h-80" />
        ) : seedTrails.data && seedTrails.data.length > 0 ? (
          <div className="mt-8">
            <DataTable
              columns={SeedTrailColoumn}
              data={seedTrails.data as SeedTrailTableRow[]}
            />
          </div>
        ) : (
          <NoData message="No Data Available" />
        ))} */}
      {!viewStageAgainstCrop && (
        <DataTable
          columns={cropColoums}
          data={filteredCrops as CropTableRow[]}
        />
      )}
      {viewStageAgainstCrop && (
        <DataTable
          columns={stageColumns}
          data={cropsData as CropTrailsStages[]}
        />
      )}
      <AddSeedToSimulatorModal
        open={isViewCropsModalOpen}
        onOpenChange={setViewCropsModalOpen}
        selectedItem={selectedCropToView}
        mode="view"
        viewCrop
      />
    </>
  );
};

export default CropsFilterForm;
