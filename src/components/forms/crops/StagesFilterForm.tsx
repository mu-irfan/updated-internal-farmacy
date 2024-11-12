import React, { useState } from "react";
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
import { productCategory, stagesData } from "@/constant/data";
import { Button } from "@/components/ui/button";
import { filterCropVarietyFormSchema } from "@/schemas/validation/validationSchema";
import DataTable from "@/components/Table/DataTable";
import { Check, Trash, X } from "lucide-react";
import AddSeedToSimulatorModal from "@/components/forms-modals/seeds/AddSeedToSimulator";

const StagesFilterForm = () => {
  const [isCropStagesFilterModalOpen, setCropStagesFilterModalOpen] =
    useState<boolean>(false); // will be repaced with add new staged modal
  const [selectedStageToView, setSelectedStageToView] = useState({});
  const [isViewStageModalOpen, setViewStageModalOpen] =
    useState<boolean>(false);

  const form = useForm<z.infer<typeof filterCropVarietyFormSchema>>({
    resolver: zodResolver(filterCropVarietyFormSchema),
    defaultValues: {
      crop: "",
      variety: "",
    },
  });

  const onSubmit = (data: z.infer<typeof filterCropVarietyFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  const handleView = (crop: any) => {
    setSelectedStageToView(crop);
    setViewStageModalOpen(true);
    // setCurrentSeedUuid(seed.uuid);
  };

  const handleDelete = (stagesId: string) => {
    // deleteSeed(seedId);
  };

  const stagesColoums: {
    Header: string;
    accessor: StagesColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Stage", accessor: "stage" },
    { Header: "Sub Stage", accessor: "sub_stage" },
    { Header: "BBCH scale", accessor: "BBCH_scale" },
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
      <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-6">
        <CardContent className="p-0 px-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    name="variety"
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
                  <Button
                    variant="outline"
                    className="dark:text-farmacieWhite font-medium border border-primary"
                    type="button"
                    onClick={() =>
                      setCropStagesFilterModalOpen((prev) => !prev)
                    }
                  >
                    Add New Stage
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <DataTable
        columns={stagesColoums}
        data={stagesData as StagesTableRow[]}
      />
      <AddSeedToSimulatorModal
        open={isViewStageModalOpen}
        onOpenChange={setViewStageModalOpen}
        selectedItem={selectedStageToView}
        viewStage
      />
    </>
  );
};

export default StagesFilterForm;
