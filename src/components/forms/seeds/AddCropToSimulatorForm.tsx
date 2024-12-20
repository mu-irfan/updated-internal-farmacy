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
import { AddCropToSimulatorFormSchema } from "@/schemas/validation/validationSchema";
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
import { cropCategories, cropSources } from "@/constant/data";
import { useContextConsumer } from "@/context/Context";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { useCreateCrop, useUpdateCrop } from "@/hooks/apis/crop/useCrop";
import { cn } from "@/lib/utils";

const AddCropToSimulatorForm = ({
  crop,
  mode,
  onClose,
  loading: cropLoading,
}: {
  crop?: any;
  mode?: "add" | "view" | "edit";
  onClose: () => void;
  loading?: boolean;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();

  //
  const { mutate: createCrop, isPending: creating } = useCreateCrop();
  const { mutate: updateCrop, isPending: updating } = useUpdateCrop(token);

  const form = useForm<z.infer<typeof AddCropToSimulatorFormSchema>>({
    resolver: zodResolver(AddCropToSimulatorFormSchema),
    defaultValues: {
      crop_name: "",
      crop_category: "",
      source: "",
      root_depth_max_m: "",
      seed_sowing_depth_m: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (crop) {
      reset({
        crop_name: crop.crop_name || "",
        crop_category: crop.crop_category || "",
        source: crop.crop_name || "",
        seed_sowing_depth_m: crop.seed_sowing_depth_m || "",
        root_depth_max_m: crop.root_depth_max_m || "",
      });
    }
  }, [crop, reset]);

  const onSubmit = (data: z.infer<typeof AddCropToSimulatorFormSchema>) => {
    if (mode === "add") {
      createCrop(
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
      updateCrop(
        { data: data, crop_name: crop.crop_name },
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
        {cropLoading ? (
          <SkeletonCard className="h-[80vh] w-full" />
        ) : (
          <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="crop_name" className="dark:text-farmacieGrey">
                Crop Name
              </Label>
              <FormField
                control={form.control}
                name="crop_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter crop name"
                        type="text"
                        id="crop_name"
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
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label
                  htmlFor="crop_category"
                  className="dark:text-farmacieGrey"
                >
                  Crop Category
                </Label>
                <FormField
                  control={form.control}
                  name="crop_category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          disabled={isViewMode}
                        >
                          <SelectTrigger
                            className={cn(
                              "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                              !field.value
                                ? "dark:text-farmaciePlaceholderMuted"
                                : "dark:text-farmacieWhite"
                            )}
                          >
                            <SelectValue
                              placeholder={
                                crop?.crop_category || "Select Crop Category"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>Category</SelectLabel>
                              {cropCategories.map((item) => (
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
                <Label htmlFor="source" className="dark:text-farmacieGrey">
                  Sowing Mode
                </Label>
                <FormField
                  control={form.control}
                  name="source"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          disabled={isViewMode}
                        >
                          <SelectTrigger
                            className={cn(
                              "p-3 py-5 rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20",
                              !field.value
                                ? "dark:text-farmaciePlaceholderMuted"
                                : "dark:text-farmacieWhite"
                            )}
                          >
                            <SelectValue
                              placeholder={crop?.source || "Select Crop Source"}
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>Source</SelectLabel>
                              {cropSources.map((item) => (
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
                <Label
                  htmlFor="seed_sowing_depth_m"
                  className="dark:text-farmacieGrey"
                >
                  Seed sowing depth (m)
                </Label>
                <FormField
                  control={form.control}
                  name="seed_sowing_depth_m"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter seed sowing depth in meter"
                          type="text"
                          id="seed_sowing_depth_m"
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
                <Label
                  htmlFor="root_depth_max_m"
                  className="dark:text-farmacieGrey"
                >
                  Root depth max (m)
                </Label>
                <FormField
                  control={form.control}
                  name="root_depth_max_m"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter seed root depth in meter"
                          type="text"
                          id="root_depth_max_m"
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
            <Button
              className="w-full text-white font-medium"
              disabled={isViewMode}
              type="submit"
            >
              {creating
                ? "Creating..."
                : updating
                ? "Updating..."
                : mode === "edit"
                ? "Update"
                : " Add Crop For Simulator"}
            </Button>
          </form>
        )}
      </Form>
    </>
  );
};

export default AddCropToSimulatorForm;
