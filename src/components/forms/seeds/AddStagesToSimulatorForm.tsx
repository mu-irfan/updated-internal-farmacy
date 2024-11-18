import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { AddStageToSimulatorFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { bbchCategory, productCategory } from "@/constant/data";
import {
  useCreateVarietyStage,
  useUpdateVarietyStage,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";

const AddStagesToSimulatorForm = ({
  stage,
  mode,
  onClose,
  loading: stageLoading,
}: {
  stage?: any;
  mode?: "add" | "view" | "edit";
  onClose: () => void;
  loading?: boolean;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();

  //
  const { mutate: createVarietyStage, isPending: creating } =
    useCreateVarietyStage();
  const { mutate: updateVarietyStage, isPending: updating } =
    useUpdateVarietyStage(token);

  const form = useForm<z.infer<typeof AddStageToSimulatorFormSchema>>({
    resolver: zodResolver(AddStageToSimulatorFormSchema),
    defaultValues: {
      crop_variety_fk: "",
      stage: "",
      sub_stage: "",
      bbch_scale: "",
      kc: "",
      base_temp: "",
      min_temp: "",
      max_temp: "",
      start_gdd: "",
      end_gdd: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (stage) {
      reset({
        crop_variety_fk: stage.crop_variety_fk || "",
        stage: stage.stage || "",
        sub_stage: stage.sub_stage || "",
        bbch_scale: stage.bbch_scale || "",
        kc: stage.kc || "",
        base_temp: stage.base_temp || "",
        min_temp: stage.min_temp || "",
        max_temp: stage.max_temp || "",
        start_gdd: stage.start_gdd || "",
        end_gdd: stage.end_gdd || "",
      });
    }
  }, [stage, reset]);

  const onSubmit = (data: z.infer<typeof AddStageToSimulatorFormSchema>) => {
    if (mode === "add") {
      const updated = {
        ...data,
        bbch_scale: Number(data.bbch_scale),
        kc: Number(data.kc),
        min_temp: Number(data.min_temp),
        max_temp: Number(data.max_temp),
        start_gdd: Number(data.start_gdd),
        end_gdd: Number(data.end_gdd),
      };
      createVarietyStage(
        { data: updated, token },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    } else if (mode === "edit") {
      const updated = {
        ...data,
        bbch_scale: Number(data.bbch_scale),
        kc: Number(data.kc),
        min_temp: Number(data.min_temp),
        max_temp: Number(data.max_temp),
        start_gdd: Number(data.start_gdd),
        end_gdd: Number(data.end_gdd),
      };
      updateVarietyStage(
        { data: updated, uid: stage.uid },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="crop_variety_fk"
                className="dark:text-farmacieGrey"
              >
                Variety Name
              </Label>
              <FormField
                control={form.control}
                name="crop_variety_fk"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        disabled={isViewMode}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue
                            placeholder={
                              stage?.crop_variety_fk || "Select Variety"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Variety Name</SelectLabel>
                            {productCategory.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
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
            <LabelInputContainer>
              <Label htmlFor="stage" className="dark:text-farmacieGrey">
                Stage
              </Label>
              <FormField
                control={form.control}
                name="stage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        disabled={isViewMode}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue
                            placeholder={stage?.stage || "Select Stage"}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>stage</SelectLabel>
                            {productCategory.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
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
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="sub_stage" className="dark:text-farmacieGrey">
                Principle Stage
              </Label>
              <FormField
                control={form.control}
                name="sub_stage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        disabled={isViewMode}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue
                            placeholder={
                              stage?.sub_stage || "Select Principle Stage"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>principle stage</SelectLabel>
                            {productCategory.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
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
            <LabelInputContainer>
              <Label htmlFor="bbch_scale" className="dark:text-farmacieGrey">
                BBCH Scale
              </Label>
              <FormField
                control={form.control}
                name="bbch_scale"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                        disabled={isViewMode}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue
                            placeholder={
                              stage?.bbch_scale || "Select BBCH Scale"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>BBCH Scale</SelectLabel>
                            {bbchCategory.map((item) => (
                              <SelectItem key={item.value} value={item.value}>
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
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="kc" className="dark:text-farmacieGrey">
                Kc
              </Label>
              <FormField
                control={form.control}
                name="kc"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter kc"
                        type="number"
                        id="kc"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        disabled={isViewMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="base_temp" className="dark:text-farmacieGrey">
                Base temperature (C)
              </Label>
              <FormField
                control={form.control}
                name="base_temp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Base Temprature"
                        type="text"
                        id="base_temp"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        disabled={isViewMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="min_temp" className="dark:text-farmacieGrey">
                Min Temperature
              </Label>
              <FormField
                control={form.control}
                name="min_temp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter min Temperature"
                        type="text"
                        id="min_temp"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        disabled={isViewMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="max_temp" className="dark:text-farmacieGrey">
                Max temperature
              </Label>
              <FormField
                control={form.control}
                name="max_temp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Max Temperature"
                        type="text"
                        id="max_temp"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        disabled={isViewMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer className="mb-4">
              <Label htmlFor="start_gdd" className="dark:text-farmacieGrey">
                Start gdd
              </Label>
              <FormField
                control={form.control}
                name="start_gdd"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter start Gdd"
                        type="text"
                        id="start_gdd"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        disabled={isViewMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="end_gdd" className="dark:text-farmacieGrey">
                End gdd
              </Label>
              <FormField
                control={form.control}
                name="end_gdd"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter End Gdd"
                        type="text"
                        id="end_gdd"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        disabled={isViewMode}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <Button className="w-full text-white font-medium" type="submit">
            {creating
              ? "Creating..."
              : updating
              ? "Updating..."
              : mode === "edit" || mode === "view"
              ? "Update"
              : "Add Stage In Simulator"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddStagesToSimulatorForm;
