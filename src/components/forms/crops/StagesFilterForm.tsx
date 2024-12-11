import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent } from "@/components/ui/card";
import LabelInputContainer from "../LabelInputContainer";
import { Button } from "@/components/ui/button";
import { filterCropVarietyFormSchema } from "@/schemas/validation/validationSchema";
import DataTable from "@/components/Table/DataTable";
import { Trash } from "lucide-react";
import AddSeedToSimulatorModal from "@/components/forms-modals/seeds/AddSeedToSimulator";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import {
  useDeleteVarietyStage,
  useGetCropAllStages,
} from "@/hooks/apis/crop/useStagesVarities";
import {
  useGetAllCropsVaritites,
  useGetVarietyStage,
} from "@/hooks/apis/crop/useCropVarities";
import { cn } from "@/lib/utils";

const StagesFilterForm = () => {
  const { token } = useContextConsumer();
  const [selectedStageToView, setSelectedStageToView] = useState({});
  const [isViewStageModalOpen, setViewStageModalOpen] =
    useState<boolean>(false);
  const [addNewStageModalOpen, setAddNewStageModalOpen] =
    useState<boolean>(false);
  const [currentVarietyUuid, setCurrentVarietyUuid] = useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof filterCropVarietyFormSchema>>({
    resolver: zodResolver(filterCropVarietyFormSchema),
    defaultValues: {
      crop: "",
      variety_eng: "",
    },
  });

  const selectedCrop = form.watch("crop");

  const [filterCriteria, setFilterCriteria] = useState({
    crop: "",
    variety_eng: "",
  });

  const {
    data: cropStages,
    isLoading: loading,
    refetch,
  } = useGetCropAllStages(token, filterCriteria);
  const { data: varietyStage, isLoading: varietyStageLoading } =
    useGetVarietyStage(currentVarietyUuid!, token);
  const { mutate: deleteVarietyStage, isPending: deleting } =
    useDeleteVarietyStage(token);
  const { data: cropVarities, isLoading: varitiesLoading } =
    useGetAllCropsVaritites(token);

  const handleFilterSubmit = (criteria: {
    crop?: string;
    variety_eng?: string;
  }) => {
    setFilterCriteria({
      crop: criteria.crop || "",
      variety_eng: criteria.variety_eng || "",
    });
    refetch();
  };

  const filteredVarieties =
    cropVarities?.data?.filter(
      (variety: any) => variety.crop_fk === selectedCrop
    ) || [];

  const handleView = (stage: any) => {
    setViewStageModalOpen(true);
    setCurrentVarietyUuid(stage.uid);
  };

  const handleDelete = async (stageId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Crop Variety?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteVarietyStage(stageId);
    }
  };

  useEffect(() => {
    if (varietyStage?.success && varietyStage?.data) {
      setSelectedStageToView(varietyStage?.data);
    }
  }, [varietyStage]);

  const stagesColoums: {
    Header: string;
    accessor: StagesColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Stage", accessor: "stage" },
    { Header: "Sub Stage", accessor: "sub_stage" },
    { Header: "BBCH scale", accessor: "bbch_scale" },
    { Header: "Start GDD", accessor: "start_gdd" },
    { Header: "End GDD", accessor: "end_gdd" },
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
            onClick={() => handleDelete(row.original.uid)}
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
      <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-6">
        <CardContent className="p-0 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFilterSubmit)}>
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 items-center">
                <LabelInputContainer className="lg:col-span-1">
                  <FormField
                    control={form.control}
                    name="crop"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                                !field.value
                                  ? "dark:text-farmaciePlaceholderMuted"
                                  : "dark:text-farmacieWhite"
                              )}
                            >
                              <SelectValue placeholder="Select Crop" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectGroup>
                                <SelectLabel>Crop</SelectLabel>
                                {!varitiesLoading &&
                                  Array.from(
                                    new Set(
                                      cropVarities?.data?.map(
                                        (variety: any) => variety.crop_fk
                                      )
                                    )
                                  ).map((uniqueCrop: any, index: number) => (
                                    <SelectItem key={index} value={uniqueCrop}>
                                      {uniqueCrop}
                                    </SelectItem>
                                  ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>
                <LabelInputContainer className="lg:col-span-1">
                  <FormField
                    control={form.control}
                    name="variety_eng"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            onValueChange={(value) => field.onChange(value)}
                          >
                            <SelectTrigger
                              className={cn(
                                "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                                !field.value
                                  ? "dark:text-farmaciePlaceholderMuted"
                                  : "dark:text-farmacieWhite"
                              )}
                            >
                              <SelectValue placeholder="Select Variety" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectGroup>
                                <SelectLabel>Variety</SelectLabel>
                                {!varitiesLoading &&
                                  filteredVarieties.map(
                                    (variety: any, index: number) => (
                                      <SelectItem
                                        key={index}
                                        value={variety.variety_eng}
                                      >
                                        {variety.variety_eng}
                                      </SelectItem>
                                    )
                                  )}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>
                <div className="lg:col-span-2 flex justify-end gap-3">
                  <Button
                    className="text-farmacieWhite font-medium"
                    type="submit"
                  >
                    Get Stages
                  </Button>
                  <Button
                    className="dark:text-farmacieWhite font-medium border border-primary"
                    type="button"
                    onClick={() => setAddNewStageModalOpen((prev) => !prev)}
                  >
                    Add New Stage
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      {loading ? (
        <SkeletonCard className="w-full h-80" />
      ) : cropStages.data && cropStages?.data?.length > 0 ? (
        <DataTable
          columns={stagesColoums}
          data={cropStages.data as StagesTableRow[]}
          paginate={cropStages?.data?.length > 10}
          extendWidth
        />
      ) : (
        <NoData message="No Data Available, Please Select Crop and variety  to view stages" />
      )}
      <AddSeedToSimulatorModal
        open={isViewStageModalOpen}
        onOpenChange={setViewStageModalOpen}
        selectedItem={selectedStageToView}
        loading={varietyStageLoading}
        mode="view"
        viewStage
      />
      <AddSeedToSimulatorModal
        open={addNewStageModalOpen}
        onOpenChange={setAddNewStageModalOpen}
        mode="add"
        viewStage
      />
    </>
  );
};

export default StagesFilterForm;
