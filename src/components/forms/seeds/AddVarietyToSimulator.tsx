import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { addSeedVarietyDataFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import { Checkbox } from "@/components/ui/checkbox";
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
  const form = useForm<z.infer<typeof addSeedVarietyDataFormSchema>>({
    resolver: zodResolver(addSeedVarietyDataFormSchema),
    defaultValues: {
      variety_eng: "",
      variety_urdu: "",
      variety_type: "",
      brand: "",
      crop_fk: "",
      crop_season: "",
      season: "",
      seed_weight_mg: "",
      irrigation_source: "",
      germination_percentage: "",
      maturity_percentage: "",
      min_harvesting_days: "",
      max_harvesting_days: "",
      suitable_region: "",
      mad_percentage: "",
      crop_min_water_requirement: "",
      crop_max_water_requirement: "",
      height_class: "",
      nutrient_content: "",
      common_disease_tolerance: "",
      env_resilience_fators: "",
      unique_features: "",

      sand: false,
      loamy_sand: false,
      sandy_loam: false,
      loam: false,
      sandy_clay_loam: false,
      clay_loam: false,
      silt_loam: false,
      silt: false,
      silty_clay_loam: false,
      silty_clay: false,
      clay: false,
      sandy_clay: false,
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (crop) {
      reset({
        variety_eng: crop.variety_name || "",
        variety_urdu: crop.variety_urdu || "",
        variety_type: crop.variety_type || "",
        brand: crop.brand || "",
        crop_fk: crop.crop_fk || "",
        crop_season: crop.crop_season || "",
        season: crop.season || "",
        seed_weight_mg: crop.seed_weight_mg || "",
        irrigation_source: crop.irrigation_source || "",
        germination_percentage: crop.germination_percentage || "",
        maturity_percentage: crop.maturity_percentage || "",
        min_harvesting_days: crop.min_harvesting_days || "",
        max_harvesting_days: crop.max_harvesting_days || "",
        suitable_region: crop.suitable_region || "",
        mad_percentage: crop.mad_percentage || "",
        crop_min_water_requirement: crop.crop_min_water_requirement || "",
        crop_max_water_requirement: crop.crop_max_water_requirement || "",
        height_class: crop.height_class || "",
        nutrient_content: crop.nutrient_content || "",
        common_disease_tolerance: crop.common_disease_tolerance || "",
        env_resilience_fators: crop.env_resilience_fators || "",
        unique_features: crop.unique_features || "",

        sand: crop.sand || false,
        loamy_sand: crop.loamy_sand || false,
        sandy_loam: crop.sandy_loam || false,
        loam: crop.loam || false,
        sandy_clay_loam: crop.sandy_clay_loam || false,
        clay_loam: crop.clay_loam || false,
        silt_loam: crop.silt_loam || false,
        silt: crop.silt || false,
        silty_clay_loam: crop.silty_clay_loam || false,
        silty_clay: crop.silty_clay || false,
        clay: crop.clay || false,
        sandy_clay: crop.sandy_clay || false,
      });
    }
  }, [crop, reset]);

  const onSubmit = (data: z.infer<typeof addSeedVarietyDataFormSchema>) => {
    console.log("Submitting", data);
  };

  const checkboxData: {
    id: keyof z.infer<typeof addSeedVarietyDataFormSchema>;
    label: string;
  }[] = [
    { id: "sand", label: "Sand" },
    { id: "loamy_sand", label: "Loamy Sand" },
    { id: "sandy_loam", label: "Sandy Loam" },
    { id: "loam", label: "Loam" },
    { id: "sandy_clay_loam", label: "Sandy Clay Loam" },
    { id: "clay_loam", label: "Clay Loam" },
    { id: "silt_loam", label: "Silt Loam" },
    { id: "silt", label: "Silt" },
    { id: "silty_clay_loam", label: "Silty Clay Loam" },
    { id: "silty_clay", label: "Silty Clay" },
    { id: "clay", label: "Clay" },
    { id: "sandy_clay", label: "Sandy Clay" },
  ];

  return (
    <>
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="variety_eng" className="dark:text-farmacieGrey">
              Variety Name
            </Label>
            <FormField
              control={form.control}
              name="variety_eng"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter variety name"
                      type="text"
                      id="variety_eng"
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
            <LabelInputContainer className="mb-4">
              <Label htmlFor="variety_urdu" className="dark:text-farmacieGrey">
                Variety Name urdu
              </Label>
              <FormField
                control={form.control}
                name="variety_urdu"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter variety name urdu"
                        type="text"
                        id="variety_urdu"
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
            <LabelInputContainer>
              <Label htmlFor="brand" className="dark:text-farmacieGrey">
                Brand
              </Label>
              <FormField
                control={form.control}
                name="brand"
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
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>brand</SelectLabel>
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
              <Label htmlFor="variety_type" className="dark:text-farmacieGrey">
                Variety type
              </Label>
              <FormField
                control={form.control}
                name="variety_type"
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
                          <SelectValue placeholder="Select variety type" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Variety type</SelectLabel>
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
              <Label htmlFor="crop_fk" className="dark:text-farmacieGrey">
                Crop
              </Label>
              <FormField
                control={form.control}
                name="crop_fk"
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
                          <SelectValue placeholder="Select crop" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Crop</SelectLabel>
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
              <Label htmlFor="crop_season" className="dark:text-farmacieGrey">
                Crop season
              </Label>
              <FormField
                control={form.control}
                name="crop_season"
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
                          <SelectValue placeholder="Select crop season" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>crop season</SelectLabel>
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
              <Label htmlFor="season" className="dark:text-farmacieGrey">
                Season
              </Label>
              <FormField
                control={form.control}
                name="season"
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
                          <SelectValue placeholder="Select season" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>season</SelectLabel>
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
                htmlFor="seed_weight_mg"
                className="dark:text-farmacieGrey"
              >
                Seed weight (mg)
              </Label>
              <FormField
                control={form.control}
                name="seed_weight_mg"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="5"
                        type="text"
                        id="seed_weight_mg"
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

            <LabelInputContainer>
              <Label
                htmlFor="irrigation_source"
                className="dark:text-farmacieGrey"
              >
                Irrigation source
              </Label>
              <FormField
                control={form.control}
                name="irrigation_source"
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
                          <SelectValue placeholder="Select irrigation source" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>irrigation_source</SelectLabel>
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
                htmlFor="germination_percentage"
                className="dark:text-farmacieGrey"
              >
                Germination percentage
              </Label>
              <FormField
                control={form.control}
                name="germination_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="90"
                        type="text"
                        id="germination_percentage"
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
                htmlFor="maturity_percentage"
                className="dark:text-farmacieGrey"
              >
                Maturity percentage
              </Label>
              <FormField
                control={form.control}
                name="maturity_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="80"
                        type="text"
                        id="maturity_percentage"
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
              <Label
                htmlFor="min_harvesting_days"
                className="dark:text-farmacieGrey"
              >
                Min harvesting days
              </Label>
              <FormField
                control={form.control}
                name="min_harvesting_days"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="145"
                        type="text"
                        id="min_harvesting_days"
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
                htmlFor="max_harvesting_days"
                className="dark:text-farmacieGrey"
              >
                Max harvesting days
              </Label>
              <FormField
                control={form.control}
                name="max_harvesting_days"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="156"
                        type="text"
                        id="max_harvesting_days"
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
            <LabelInputContainer>
              <Label
                htmlFor="suitable_region"
                className="dark:text-farmacieGrey"
              >
                Suitable region
              </Label>
              <FormField
                control={form.control}
                name="suitable_region"
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
                          <SelectValue placeholder="Irrigated" />
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

            <LabelInputContainer className="mb-4">
              <Label
                htmlFor="mad_percentage"
                className="dark:text-farmacieGrey"
              >
                Mad percentage
              </Label>
              <FormField
                control={form.control}
                name="mad_percentage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="67"
                        type="text"
                        id="mad_percentage"
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
              <Label
                htmlFor="crop_min_water_requirement"
                className="dark:text-farmacieGrey"
              >
                Crop min water requirement (mm)
              </Label>
              <FormField
                control={form.control}
                name="crop_min_water_requirement"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="12"
                        type="text"
                        id="crop_min_water_requirement"
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
                htmlFor="crop_max_water_requirement"
                className="dark:text-farmacieGrey"
              >
                Crop max water requirement (mm)
              </Label>
              <FormField
                control={form.control}
                name="crop_max_water_requirement"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="12"
                        type="text"
                        id="crop_max_water_requirement"
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
            <LabelInputContainer>
              <Label htmlFor="height_class" className="dark:text-farmacieGrey">
                Height class
              </Label>
              <FormField
                control={form.control}
                name="height_class"
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
                          <SelectValue placeholder="Select height class" />
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

            <LabelInputContainer className="mb-4">
              <Label
                htmlFor="nutrient_content"
                className="dark:text-farmacieGrey"
              >
                Nutrient content (optional)
              </Label>
              <FormField
                control={form.control}
                name="nutrient_content"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter any nutrient content"
                        type="text"
                        id="nutrient_content"
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
              <Label
                htmlFor="common_disease_tolerance"
                className="dark:text-farmacieGrey"
              >
                Common disease tolerance (optional)
              </Label>
              <FormField
                control={form.control}
                name="common_disease_tolerance"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter any disease tolerance"
                        type="text"
                        id="common_disease_tolerance"
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
                htmlFor="env_resilience_fators"
                className="dark:text-farmacieGrey"
              >
                Environmental Resilience Factors (optional)
              </Label>
              <FormField
                control={form.control}
                name="env_resilience_fators"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter any resilience to environment"
                        type="text"
                        id="env_resilience_fators"
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
            <LabelInputContainer className="flex-1 mb-4">
              <Label
                htmlFor="unique_features"
                className="dark:text-farmacieGrey"
              >
                Unique features (optional)
              </Label>
              <FormField
                control={form.control}
                name="unique_features"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter unique features"
                        type="text"
                        id="unique_features"
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
            <div className="flex-1"></div>
          </div>
          {/* checkbox section */}
          <div className="grid grid-cols-4 gap-4 p-4 rounded">
          {checkboxData.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 rounded"
              style={{ backgroundColor: "#27272A" }}
            >
              <label
                htmlFor={item.id}
                className="text-sm font-medium leading-none text-white peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {item.label}
              </label>
              <Controller
  name={item.id}
  control={form.control}
  render={({ field }) => {
    const { value, ...restField } = field; // Destructure to exclude `value`
    return (
      <Checkbox
        {...restField} // Pass all other field props
        onCheckedChange={(checked) => field.onChange(checked)} // Ensure the change handler receives the correct value
        checked={!!value} // Explicitly cast `value` to boolean
        id={item.id}
        className="border-gray-700"
        style={{
          borderColor: "#707070",
          backgroundColor: "transparent",
        }}
      />
    );
  }}
/>




            </div>
          ))}
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
