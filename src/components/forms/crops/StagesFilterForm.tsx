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
import { productCategory } from "@/constant/data";
import { Button } from "@/components/ui/button";
import { filterCropVarietyFormSchema } from "@/schemas/validation/validationSchema";
import DataTable from "@/components/Table/DataTable";
import { Trash } from "lucide-react";
import AddSeedToSimulatorModal from "@/components/forms-modals/seeds/AddSeedToSimulator";
import {
  useDeleteVarietyStage,
  useGetCropAllStages,
  useGetVarietyStage,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { SweetAlert } from "@/components/alerts/SweetAlert";

const StagesFilterForm = () => {
  const { token } = useContextConsumer();
  const [isCropStagesFilterModalOpen, setCropStagesFilterModalOpen] =
    useState<boolean>(false);
  const [selectedStageToView, setSelectedStageToView] = useState({});
  const [isViewStageModalOpen, setViewStageModalOpen] =
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

  const handleView = (stage: any) => {
    setViewStageModalOpen(true);
    setCurrentVarietyUuid(stage.uuid);
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
    if (varietyStage?.success && varietyStage.message) {
      setSelectedStageToView(varietyStage.message);
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
                            <SelectTrigger className="p-3 py-5 rounded-md dark:text-farmacieGrey border-[0.5px] border-farmacieGrey focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                              <SelectValue placeholder="Select Crop" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectGroup>
                                <SelectLabel>Crop</SelectLabel>
                                {productCategory.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
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
                            <SelectTrigger className="p-3 py-5 rounded-md dark:text-farmacieGrey border-[0.5px] border-farmacieGrey focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                              <SelectValue placeholder="Select Variety" />
                            </SelectTrigger>
                            <SelectContent className="rounded-xl">
                              <SelectGroup>
                                <SelectLabel>Variety</SelectLabel>
                                {productCategory.map((item) => (
                                  <SelectItem
                                    key={item.value}
                                    value={item.value}
                                  >
                                    {item.label}
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
                <div className="lg:col-span-2 flex justify-end gap-3">
                  <Button
                    className="text-farmacieWhite font-medium"
                    type="submit"
                  >
                    Get Stages
                  </Button>
                  {/* <Button
                    variant="outline"
                    className="dark:text-farmacieWhite font-medium border border-primary"
                    type="button"
                    onClick={() =>
                      setCropStagesFilterModalOpen((prev) => !prev)
                    }
                  >
                    Add New Stage
                  </Button> */}
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
          paginate
          extendWidth
        />
      ) : (
        <NoData message="No Data Available, Please Select Category, sub category to view products" />
      )}
      <AddSeedToSimulatorModal
        open={isViewStageModalOpen}
        onOpenChange={setViewStageModalOpen}
        selectedItem={selectedStageToView}
        loading={varietyStageLoading}
        viewStage
      />
    </>
  );
};

export default StagesFilterForm;
