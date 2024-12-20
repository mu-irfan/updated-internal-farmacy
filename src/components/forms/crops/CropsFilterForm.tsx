import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { debounce } from "lodash";
import { MoveLeft, Search, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import DataTable from "@/components/Table/DataTable";
import AddSeedToSimulatorModal from "@/components/forms-modals/seeds/AddSeedToSimulator";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";
import NoData from "@/components/alerts/NoData";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import AddNewStageModal from "@/components/forms-modals/crop/AddNewStage";
import {
  useDeleteCrop,
  useGetAllCrops,
  useGetCrop,
} from "@/hooks/apis/crop/useCrop";
import {
  useDeleteCropStage,
  useGetCropStage,
} from "@/hooks/apis/crop/useStagesVarities";
import { formatKey } from "@/lib/helper";

const CropsFilterForm = () => {
  const { token } = useContextConsumer();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCropToView, setSelectedCropToView] = useState({});
  const [selectedCropStageToView, setSelectedCropStageToView] = useState({});
  const [isViewCropsModalOpen, setViewCropsModalOpen] =
    useState<boolean>(false);
  const [viewStageAgainstCrop, setViewStageAgainstCrop] =
    useState<boolean>(false);
  const [currentCropName, setCurrentCropName] = useState<string | null>(null);
  const [isAddNewStageCropModalOpen, setAddNewStageCropModalOpen] =
    useState<boolean>(false);
  const [isViewStageCropModalOpen, setViewStageCropModalOpen] =
    useState<boolean>(false);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  // crop apis
  const { data: crops, isLoading: cropsLoading } = useGetAllCrops(token);

  const { data: cropDetails, isLoading: cropLoading } = useGetCrop(
    currentCropName!,
    token
  );

  const {
    data: cropStage,
    isLoading: cropStageLoading,
    refetch,
  } = useGetCropStage(currentCropName!, token);
  const { mutate: deleteCrop, isPending: deleting } = useDeleteCrop(token);
  const { mutate: deleteCropStage, isPending: deletingStage } =
    useDeleteCropStage(token);

  const filteredCrops = useMemo(() => {
    if (!crops || !crops.data) return [];
    return crops?.data?.filter((crop: any) =>
      crop.crop_name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [crops, searchQuery]);

  const filteredCropStages = useMemo(() => {
    if (!cropStage || !cropStage.data) return [];
    return cropStage?.data?.filter((crop: any) =>
      crop?.stage?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [cropStage, searchQuery]);

  const handleCropView = (crop: any) => {
    setViewCropsModalOpen(true);
    setCurrentCropName(crop.crop_name);
  };

  const handleStageView = (crop: any) => {
    setViewStageAgainstCrop(true);
    setCurrentCropName(crop.crop_name);
    refetch();
    setSearchQuery("");
  };

  const handleCropStageView = (stage: any) => {
    setSelectedCropStageToView({ ...stage, currentCropName });
    setViewStageCropModalOpen(true);
  };

  const handleDeleteCrop = async (name: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Crop?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteCrop(name);
    }
  };

  const handleDeleteCropStage = async (stageId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Crop Stage?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteCropStage(stageId);
    }
  };

  useEffect(() => {
    if (cropDetails?.success && cropDetails.data) {
      setSelectedCropToView(cropDetails.data);
    }
  }, [cropDetails]);

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
        <div className="flex justify-end gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleStageView(row.original)}
            className="border-yellow-600 bg-yellow-300/10 w-28 text-yellow-600 tracking-wider hover:text-yellow/80"
          >
            Crop Stage
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCropView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            View
          </Button>
          <Button
            size="icon"
            onClick={() => handleDeleteCrop(row.original.crop_name)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deleting}
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
    // { Header: "Crop Name", accessor: "crop_name" },
    {
      Header: "Stage",
      accessor: "stage",
      Cell: ({ row }: any) => row.original?.stage || "N/A",
    },
    {
      Header: "Principle Stage",
      accessor: "sub_stage",
      Cell: ({ row }: any) => (
        <span>{formatKey(row.original?.sub_stage) || "N/A"}</span>
      ),
    },
    { Header: "BBCH scale", accessor: "bbch_scale" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex justify-end gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleCropStageView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            View
          </Button>
          <Button
            size="icon"
            onClick={() => handleDeleteCropStage(row.original.uuid)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deletingStage}
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
            {!viewStageAgainstCrop ? (
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search crop by name ..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
            ) : (
              <>
                <Button
                  className="text-farmacieWhite font-medium text-base dark:text-farmacieGrey"
                  type="button"
                  variant="link"
                  onClick={() => setViewStageAgainstCrop(false)}
                >
                  <MoveLeft className="inline mr-1.5 mt-1 mb-1 w-6 h-6" />
                  Back to crops
                </Button>
                <Button
                  className="text-farmacieWhite font-medium"
                  type="button"
                  onClick={() => setAddNewStageCropModalOpen((prev) => !prev)}
                >
                  Add New Stage
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
      {!viewStageAgainstCrop &&
        (cropsLoading ? (
          <SkeletonCard className="w-full h-80" />
        ) : crops?.data && crops?.data?.length > 0 ? (
          <div className="mt-8">
            <DataTable
              columns={cropColoums}
              data={filteredCrops as CropTableRow[]}
              paginate={crops?.data?.length > 10}
            />
          </div>
        ) : (
          <NoData message="No Data Available" />
        ))}
      {viewStageAgainstCrop &&
        (cropStageLoading ? (
          <SkeletonCard className="w-full h-80" />
        ) : cropStage?.data && cropStage?.data?.length > 0 ? (
          <div className="mt-8">
            <DataTable
              columns={stageColumns}
              data={filteredCropStages as CropTrailsStages[]}
              paginate={cropStage?.data?.length > 10}
            />
          </div>
        ) : (
          <NoData message="No Data Available" />
        ))}
      <AddNewStageModal
        open={isAddNewStageCropModalOpen}
        onOpenChange={setAddNewStageCropModalOpen}
        selectedCrop={currentCropName}
        mode="add"
      />
      <AddNewStageModal
        open={isViewStageCropModalOpen}
        onOpenChange={setViewStageCropModalOpen}
        mode="view"
        stage={selectedCropStageToView}
        loading={cropLoading}
      />
      <AddSeedToSimulatorModal
        open={isViewCropsModalOpen}
        onOpenChange={setViewCropsModalOpen}
        selectedItem={selectedCropToView}
        loading={cropLoading}
        mode="view"
        viewCrop
      />
    </>
  );
};

export default CropsFilterForm;
