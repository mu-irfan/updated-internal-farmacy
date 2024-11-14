import React, { useEffect, useState } from "react";
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
import { addSeedFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, CircleX, Info } from "lucide-react";
import { Textarea } from "../../ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import {
  cropCategories,
  cropCategoriesOptions,
  diseaseResistanceTraits,
  heightClass,
  nutrientsContent,
  packagingType,
  resistanceTraits,
  suitahleRegion,
  uniqueFeatures,
} from "@/constant/data";
import AddSeedTrialDataInstructionModal from "@/components/forms-modals/seeds/AddSeedTrialDataInstr";
import {
  useCreateSeed,
  useDeleteSeedImage,
  useGetAllCompaniesUsers,
  useGetCompanyProfile,
  useInSimulator,
  useSubscribeSeed,
  useUpdateSeed,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import { baseUrl } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { SkeletonCard } from "@/components/SkeletonLoader";
import toast from "react-hot-toast";

import NutrientContentModal from "@/components/forms-modals/seeds/NutrientContent";
import {
  MultiSelector,
  MultiSelectorContent,
  MultiSelectorInput,
  MultiSelectorItem,
  MultiSelectorList,
  MultiSelectorTrigger,
} from "@/components/ui/multi-select";
import { formatPackageType } from "@/lib/helper";
import AddSeedToSimulatorModal from "@/components/forms-modals/seeds/AddSeedToSimulator";

type SeedCategory = keyof typeof cropCategoriesOptions;

const AddSeedForm = ({
  mode,
  seed,
  subscribe,
  currentFranchiseUuid,
  onClose,
  loading: seedLoading,
}: {
  mode: "add" | "view" | "edit";
  seed?: any;
  subscribe?: boolean;
  currentFranchiseUuid?: string;
  onClose: () => void;
  loading?: boolean;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<SeedCategory | "">(
    seed?.category || ""
  );
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [
    isAddSeedTrailDataInstructionModalOpen,
    setAddSeedTrailDataInstructionModalOpen,
  ] = useState<boolean>(false);
  const [isAddSeedToSimulatorModalOpen, setAddSeedToSimulatorModalOpen] =
    useState<boolean>(false);

  //
  const { mutate: subscribeSeed, isPending: subscribing } = useSubscribeSeed();
  const { mutate: addSeed, isPending: loading } = useCreateSeed();
  const { mutate: deleteSeedImage, isPending: deletingImage } =
    useDeleteSeedImage(token);
  const { mutate: updateSeed, isPending: updating } = useUpdateSeed(token);
  const { mutate: inSimulator, isPending: simulating } = useInSimulator(token);
  const { data: companiesUsersList, isLoading: companiesListLoading } =
    useGetAllCompaniesUsers(token);

  const form = useForm<z.infer<typeof addSeedFormSchema>>({
    resolver: zodResolver(addSeedFormSchema),
    defaultValues: {
      seed_variety_name: "",
      company_fk: "",
      crop_category: "",
      crop: "",
      seed_weight: "",
      package_weight: "",
      germination_percentage: "",
      maturity_percentage: "",
      min_harvesting_days: "",
      max_harvesting_days: "",
      suitable_region: "",
      package_type: "",
      height_class: "",
      nutrient_content: [],
      common_disease_tolerance: [],
      env_resilience_fators: [],
      price: "",
      unique_features: [],
      description: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (seed) {
      reset({
        seed_variety_name: seed.seed_variety_name || "",
        company_fk: seed.company_fk || "",
        crop_category: seed.crop_category || "",
        crop: seed.crop || "",
        seed_weight: seed.seed_weight || "",
        package_weight: seed.package_weight || "",
        germination_percentage: seed.germination_percentage || "",
        maturity_percentage: seed.maturity_percentage || "",
        min_harvesting_days: seed.min_harvesting_days || "",
        max_harvesting_days: seed.max_harvesting_days || "",
        suitable_region: seed.suitable_region || "",
        package_type: seed.package_type || "",
        height_class: seed.height_class || "",
        nutrient_content:
          typeof seed.nutrient_content === "string"
            ? seed.nutrient_content.split(",")
            : seed.nutrient_content || [],
        common_disease_tolerance:
          typeof seed.common_disease_tolerance === "string"
            ? seed.common_disease_tolerance.split(",")
            : seed.common_disease_tolerance || [],
        env_resilience_fators:
          typeof seed.env_resilience_fators === "string"
            ? seed.env_resilience_fators.split(",")
            : seed.env_resilience_fators || [],
        price: seed.price || "",
        unique_features:
          typeof seed.unique_features === "string"
            ? seed.unique_features.split(",")
            : seed.unique_features || [],
        description: seed.description || "",
      });
    }
  }, [seed, reset]);

  const onSubmit = (data: z.infer<typeof addSeedFormSchema>) => {
    setAddSeedTrailDataInstructionModalOpen(true);
    const formData = new FormData();
    formData.append("seed_variety_name", data.seed_variety_name);
    formData.append("company_fk", data.company_fk);
    formData.append("crop_category", data.crop_category);
    formData.append("crop", data.crop);
    formData.append("seed_weight", data.seed_weight);
    formData.append("package_weight", data.package_weight);
    formData.append("germination_percentage", data.germination_percentage);
    formData.append("maturity_percentage", data.maturity_percentage);
    formData.append("min_harvesting_days", data.min_harvesting_days);
    formData.append("max_harvesting_days", data.max_harvesting_days);
    formData.append("suitable_region", data.suitable_region);
    formData.append("package_type", data.package_type);
    formData.append("height_class", data.height_class);
    formData.append("price", data.price);
    formData.append("description", data.description);

    if (data.unique_features) {
      formData.append("unique_features", data.unique_features.join(","));
    }
    if (data.nutrient_content) {
      formData.append("nutrient_content", data.nutrient_content.join(","));
    }
    if (data.common_disease_tolerance) {
      formData.append(
        "common_disease_tolerance",
        data.common_disease_tolerance.join(",")
      );
    }
    if (data.env_resilience_fators) {
      formData.append(
        "env_resilience_fators",
        data.env_resilience_fators.join(",")
      );
    }

    if (mode === "add" && selectedImages.length < 1) {
      toast.error("Please upload at least 1 image.");
      return;
    }
    selectedImages.forEach((image) => {
      formData.append(`images`, image);
    });
    if (mode === "add") {
      addSeed(
        { data: formData, token },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    }
    if (mode === "edit") {
      updateSeed(
        { data: formData, uuid: seed.uuid },
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      if (selectedImages.length + files.length <= 10) {
        // Allow a maximum of 10 images
        setSelectedImages((prev) => [...prev, ...files]);
      } else {
        alert("You can upload a maximum of 10 images.");
      }
    }
  };

  const handleCardClick = () => {
    if (mode === "add" || mode === "edit")
      document.getElementById("fileInput")?.click();
  };

  const handleInSimulator = () => {
    onClose();
    if (mode === "view") {
      inSimulator(
        { data: seed, uuid: seed.uuid },
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
        {seedLoading ? (
          <SkeletonCard className="h-[80vh] w-full" />
        ) : (
          <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label
                  htmlFor="seed_variety_name"
                  className="dark:text-farmacieGrey"
                >
                  Seed Variety Name
                </Label>
                <FormField
                  control={form.control}
                  name="seed_variety_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter variety name"
                          type="text"
                          id="seed_variety_name"
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
                <Label htmlFor="company_fk" className="dark:text-farmacieGrey">
                  Brand Name
                </Label>
                <FormField
                  control={form.control}
                  name="company_fk"
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
                            <SelectValue
                              placeholder={
                                seed?.company_fk || "Select Brand Company"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>Brand Name</SelectLabel>
                              {!companiesListLoading &&
                                companiesUsersList?.data?.map(
                                  (company: any) => (
                                    <SelectItem
                                      key={company.uuid}
                                      value={company.company_fk}
                                    >
                                      {company.company_fk}
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
            </div>
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
                            setSelectedCategory(value as any);
                            field.onChange(value);
                          }}
                          disabled={isViewMode}
                        >
                          <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                            <SelectValue
                              placeholder={
                                seed?.crop_category || "Select Crop Category"
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
                <Label htmlFor="crop" className="dark:text-farmacieGrey">
                  Crop
                </Label>
                <FormField
                  control={form.control}
                  name="crop"
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
                            <SelectValue
                              placeholder={seed?.crop || "Select Crop"}
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>Crop</SelectLabel>
                              {selectedCategory &&
                                cropCategoriesOptions[selectedCategory]?.map(
                                  (crop: any, ind: number) => (
                                    <SelectItem key={ind} value={crop}>
                                      {crop}
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
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label htmlFor="seed_weight" className="dark:text-farmacieGrey">
                  Seed weight (mg)
                </Label>
                <FormField
                  control={form.control}
                  name="seed_weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter seed in milligram"
                          type="text"
                          id="seed_weight"
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
                <Label
                  htmlFor="package_weight"
                  className="dark:text-farmacieGrey"
                >
                  Package weight (kg)
                </Label>
                <FormField
                  control={form.control}
                  name="package_weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter package weight in kg"
                          type="text"
                          id="package_weight"
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
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label
                  htmlFor="germination_percentage"
                  className="dark:text-farmacieGrey"
                >
                  Germination Percentage
                </Label>
                <FormField
                  control={form.control}
                  name="germination_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Germination Percentage"
                          type="text"
                          id="germination_percentage"
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
                <Label
                  htmlFor="maturity_percentage"
                  className="dark:text-farmacieGrey"
                >
                  Maturity Percentage
                </Label>
                <FormField
                  control={form.control}
                  name="maturity_percentage"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter maturity percentage"
                          type="text"
                          id="maturity_percentage"
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
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
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
                          placeholder="Enter min days to reach harvesting"
                          type="text"
                          id="min_harvesting_days"
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
                <Label
                  htmlFor="max_harvesting_days"
                  className="dark:text-farmacieGrey"
                >
                  Max havesting days
                </Label>
                <FormField
                  control={form.control}
                  name="max_harvesting_days"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter max days to reach harvesting"
                          type="text"
                          id="max_harvesting_days"
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
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer>
                <Label
                  htmlFor="suitable_region"
                  className="dark:text-farmacieGrey"
                >
                  Suitable Region
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
                            <SelectValue
                              placeholder={
                                seed?.suitable_region ||
                                "Select Suitable region"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>Suitable Region</SelectLabel>
                              {suitahleRegion.map((item) => (
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
                <Label
                  htmlFor="package_type"
                  className="dark:text-farmacieGrey"
                >
                  Package Type
                </Label>
                <FormField
                  control={form.control}
                  name="package_type"
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
                            <SelectValue
                              placeholder={
                                formatPackageType(seed?.package_type) ||
                                "Select package type"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>Package Type</SelectLabel>
                              {packagingType.map((item) => (
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
                <Label
                  htmlFor="height_class"
                  className="dark:text-farmacieGrey"
                >
                  Height Class
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
                            <SelectValue
                              placeholder={
                                seed?.height_class || "Select Height Class"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>Height Class</SelectLabel>
                              {heightClass.map((item) => (
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
                <Label
                  htmlFor="nutrient_content"
                  className="dark:text-farmacieGrey"
                >
                  Nutrient Content (Optional)
                </Label>
                <FormField
                  control={form.control}
                  name="nutrient_content"
                  disabled={isViewMode}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelector
                          onValuesChange={field.onChange}
                          values={field.value || []}
                          disabled={mode === "view"}
                        >
                          <MultiSelectorTrigger disabled={isViewMode}>
                            <MultiSelectorInput
                              placeholder={
                                !isViewMode ? "Select nutrient content" : ""
                              }
                              className="text-sm"
                              disabled={isViewMode}
                            />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {nutrientsContent.length > 0 &&
                                nutrientsContent.map((trait) => (
                                  <MultiSelectorItem
                                    key={trait.value}
                                    value={trait.value}
                                  >
                                    <span>{trait.label}</span>
                                  </MultiSelectorItem>
                                ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
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
                  htmlFor="common_disease_tolerance"
                  className="dark:text-farmacieGrey"
                >
                  Common Disease Tolerance (Optional)
                </Label>
                <FormField
                  control={form.control}
                  name="common_disease_tolerance"
                  disabled={isViewMode}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelector
                          onValuesChange={field.onChange}
                          values={field.value || []}
                          disabled={mode === "view"}
                        >
                          <MultiSelectorTrigger disabled={isViewMode}>
                            <MultiSelectorInput
                              placeholder={
                                !isViewMode ? "Select Disease Tolerance" : ""
                              }
                              className="text-sm"
                              disabled={isViewMode}
                            />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {diseaseResistanceTraits.length > 0 &&
                                diseaseResistanceTraits.map((trait) => (
                                  <MultiSelectorItem
                                    key={trait.value}
                                    value={trait.value}
                                  >
                                    <span>{trait.label}</span>
                                  </MultiSelectorItem>
                                ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>

              <LabelInputContainer>
                <Label
                  htmlFor="env_resilience_fators"
                  className="dark:text-farmacieGrey"
                >
                  Environmental Resilience Factors (optional)
                </Label>
                <FormField
                  control={form.control}
                  name="env_resilience_fators"
                  disabled={isViewMode}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelector
                          onValuesChange={field.onChange}
                          values={field.value || []}
                          disabled={mode === "view"}
                        >
                          <MultiSelectorTrigger disabled={isViewMode}>
                            <MultiSelectorInput
                              placeholder={
                                !isViewMode
                                  ? "Select Environmental Resilience Factors"
                                  : ""
                              }
                              className="text-sm"
                              disabled={isViewMode}
                            />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {resistanceTraits.length > 0 &&
                                resistanceTraits.map((trait) => (
                                  <MultiSelectorItem
                                    key={trait.value}
                                    value={trait.value}
                                  >
                                    <span>{trait.label}</span>
                                  </MultiSelectorItem>
                                ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
              <LabelInputContainer className="mb-4">
                <Label htmlFor="price" className="dark:text-farmacieGrey">
                  Price
                </Label>
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter Price"
                          type="text"
                          id="price"
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
                <Label
                  htmlFor="unique_features"
                  className="dark:text-farmacieGrey"
                >
                  Unique Features (Optional)
                </Label>
                <FormField
                  control={form.control}
                  name="unique_features"
                  disabled={isViewMode}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelector
                          onValuesChange={field.onChange}
                          values={field.value || []}
                          disabled={mode === "view"}
                        >
                          <MultiSelectorTrigger disabled={isViewMode}>
                            <MultiSelectorInput
                              placeholder={
                                !isViewMode ? "Select Unique Features" : ""
                              }
                              className="text-sm"
                              disabled={isViewMode}
                            />
                          </MultiSelectorTrigger>
                          <MultiSelectorContent>
                            <MultiSelectorList>
                              {uniqueFeatures.length > 0 &&
                                uniqueFeatures.map((trait) => (
                                  <MultiSelectorItem
                                    key={trait.value}
                                    value={trait.value}
                                  >
                                    <span>{trait.label}</span>
                                  </MultiSelectorItem>
                                ))}
                            </MultiSelectorList>
                          </MultiSelectorContent>
                        </MultiSelector>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
            </div>
            <LabelInputContainer className="mb-2.5">
              <Label htmlFor="description" className="dark:text-farmacieGrey">
                Description
              </Label>
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        placeholder="Enter product description ..."
                        id="description"
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
            {!isViewMode && (
              <Card
                className="w-full mb-3 rounded-xl text-center bg-primary/10 border border-primary cursor-pointer aria-disabled:cursor-not-allowed"
                aria-disabled={isViewMode}
                onClick={handleCardClick}
              >
                <CardHeader className="space-y-0 pb-2">
                  <CardTitle className="text-3xl lg:text-4xl font-medium">
                    {selectedImages.length > 0 ? (
                      <div className="flex flex-wrap justify-center">
                        {selectedImages.map((image, index) => (
                          <img
                            key={index}
                            src={URL.createObjectURL(image)}
                            alt={`Selected image ${index + 1}`}
                            className="h-20 w-20 object-cover m-1 rounded-md"
                          />
                        ))}
                      </div>
                    ) : (
                      <CirclePlus className="h-5 w-5 mx-auto dark:text-green-500" />
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm dark:text-green-500">
                    {selectedImages.length > 0
                      ? `${selectedImages.length} Images Selected`
                      : "Add Images"}
                  </div>
                </CardContent>
              </Card>
            )}
            {(isViewMode || mode === "edit") &&
              (subscribe || seed?.seed_image?.length > 0) && (
                <div className="flex flex-wrap mb-4">
                  {seed.seed_image?.map((image: any, index: number) => (
                    <div key={index} className="relative h-32 w-32 m-1">
                      <Image
                        src={`${baseUrl.replace("/api", "")}${image.image_url}`}
                        alt={`Seed image ${index + 1}`}
                        className="h-32 w-32 object-cover m-1 rounded-md"
                        width={80}
                        height={80}
                      />
                      {mode === "edit" && (
                        <button
                          onClick={() => deleteSeedImage(image.uuid)}
                          type="button"
                          className="absolute top-0 right-0 p-1.5 bg-white rounded-full shadow-lg"
                        >
                          <CircleX className="h-4 w-4 text-red-600" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            <Input
              id="fileInput"
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={handleImageChange}
            />
            {mode === "view" && !seed.in_simulator && (
              <Button
                className="w-full text-white font-medium mt-6 mb-4 border border-primary bg-primary/20"
                variant="outline"
                type="button"
                onClick={handleInSimulator}
                disabled={isViewMode && seed.in_simulator}
              >
                Already in simulator
              </Button>
            )}
            <Button
              className="w-full text-white font-medium"
              type={subscribe ? "button" : "submit"}
              disabled={isViewMode && seed.in_simulator}
              onClick={
                mode === "view" && !seed.in_simulator
                  ? () => {
                      setAddSeedToSimulatorModalOpen(true);
                    }
                  : undefined
              }
            >
              {mode === "edit"
                ? "Update Seed"
                : mode === "view" && !seed.in_simulator
                ? "Add in simulator"
                : subscribe
                ? "Subscribe"
                : "Submit"}
            </Button>
          </form>
        )}
      </Form>
      <AddSeedToSimulatorModal
        open={isAddSeedToSimulatorModalOpen}
        onOpenChange={setAddSeedToSimulatorModalOpen}
      />
    </>
  );
};

export default AddSeedForm;
