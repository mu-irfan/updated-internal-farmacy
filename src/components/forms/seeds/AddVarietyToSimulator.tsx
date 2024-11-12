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
import { addSeedVarietyTrailDataFormSchema } from "@/schemas/validation/validationSchema";
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
import { productCategory } from "@/constant/data";

const AddVarietyToSimulatorForm = ({
  crop,
  mode,
}: {
  crop?: any;
  mode?: "add" | "view" | "edit";
}) => {
  console.log(mode, "modee");

  const isViewMode = mode === "view";
  const form = useForm<z.infer<typeof addSeedVarietyTrailDataFormSchema>>({
    resolver: zodResolver(addSeedVarietyTrailDataFormSchema),
    defaultValues: {
      variety_name: "",
      crop_category: "",
      source: "",
      seed_sowing_depth: "",
      root_depth: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (crop) {
      reset({
        variety_name: crop.variety_name || "",
        crop_category: crop.crop_category || "",
        source: crop.crop_name || "",
        seed_sowing_depth: crop.seed_sowing_depth || "",
        root_depth: crop.root_depth || "",
      });
    }
  }, [crop, reset]);

  const onSubmit = (
    data: z.infer<typeof addSeedVarietyTrailDataFormSchema>
  ) => {
    console.log("Submitting form data:", data);
  };

  return (
    <>
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="variety_name" className="dark:text-farmacieGrey">
              Variety Name
            </Label>
            <FormField
              control={form.control}
              name="variety_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter crop name"
                      type="text"
                      id="variety_name"
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
              <Label htmlFor="crop_category" className="dark:text-farmacieGrey">
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
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                          <SelectValue placeholder="Select Crop Category" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>crop category</SelectLabel>
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
              <Label htmlFor="source" className="dark:text-farmacieGrey">
                Source
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
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                          <SelectValue placeholder="Select Crop Source" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Source</SelectLabel>
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
            <LabelInputContainer className="mb-4">
              <Label
                htmlFor="seed_sowing_depth"
                className="dark:text-farmacieGrey"
              >
                Seed sowing depth (m)
              </Label>
              <FormField
                control={form.control}
                name="seed_sowing_depth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter seed sowing depth in meter"
                        type="text"
                        id="seed_sowing_depth"
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
              <Label htmlFor="root_depth" className="dark:text-farmacieGrey">
                Root depth max (m)
              </Label>
              <FormField
                control={form.control}
                name="root_depth"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter seed root depth in meter"
                        type="text"
                        id="root_depth"
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
            Add Crop For Simulator
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddVarietyToSimulatorForm;
