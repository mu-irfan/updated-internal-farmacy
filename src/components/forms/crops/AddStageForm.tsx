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
import { addCropStageFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { productCategory } from "@/constant/data";
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
import { useCreateCropStage, useUpdateCropStage } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";

const AddStageForm = ({
  mode,
  stage,
  onClose,
  loading: stageLoading,
}: {
  mode: "add" | "view" | "edit";
  stage?: any;
  subscribe?: boolean;
  currentFranchiseUuid?: string;
  onClose: any;
  loading?: boolean;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();

  //
  const { mutate: addCropStatge, isPending: loading } = useCreateCropStage();
  const { mutate: updateCropStage, isPending: updating } =
    useUpdateCropStage(token);

  const form = useForm<z.infer<typeof addCropStageFormSchema>>({
    resolver: zodResolver(addCropStageFormSchema),
    defaultValues: {
      crop_fk: "",
      stage: "",
      sub_stage: "",
      bbch_scale: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (stage) {
      reset({
        crop_fk: stage.crop_fk || "",
        stage: stage.stage || "",
        sub_stage: stage.sub_stage || "",
        bbch_scale: stage.bbch_scale || "",
      });
    }
  }, [stage, reset]);

  const onSubmit = (data: z.infer<typeof addCropStageFormSchema>) => {
    if (mode === "add") {
      addCropStatge(
        { data: data, token },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    } else if (mode === "edit") {
      updateCropStage(
        { data: data, uuid: stage.uuid },
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
    <Form {...form}>
      {stageLoading ? (
        <SkeletonCard className="h-[80vh] w-full" />
      ) : (
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="crop_fk" className="dark:text-farmacieGrey">
                Crop Name
              </Label>
              <FormField
                control={form.control}
                name="crop_fk"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Crop name"
                        type="text"
                        id="crop_fk"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        {...field}
                        disabled={isViewMode}
                      />
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
                      <Input
                        placeholder="Enter Crop name"
                        type="text"
                        id="sub_stage"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        {...field}
                        disabled={isViewMode}
                      />
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
                      <Input
                        placeholder="Enter Crop name"
                        type="text"
                        id="bbch_scale"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        {...field}
                        disabled={isViewMode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          </div>
          <Button
            className="w-full text-white font-medium"
            type="submit"
            disabled={isViewMode}
          >
            {mode === "edit"
              ? "Update Crop Stage"
              : updating
              ? "Updating..."
              : loading
              ? "Submitting..."
              : "Submit"}
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      )}
    </Form>
  );
};

export default AddStageForm;
