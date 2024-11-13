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
import { addProductFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CirclePlus, CircleX, Plus, Trash } from "lucide-react";

import {
  packagingType,
  productCategory,
  productsList,
  productType,
  units,
  weightUnitType,
} from "@/constant/data";
import LabelInputContainer from "../LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useDynamicFields from "@/hooks/useDynamicFields";
import {
  useCreateProduct,
  useDeleteProductImage,
  useGetAllActiveIngredients,
  useGetAllCompaniesUsers,
  useGetCompanyProfile,
  useSubscribeProduct,
  useUpdateProduct,
  useVerifyProduct,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import { baseUrl } from "@/lib/utils";
import Image from "next/image";
import { SkeletonCard } from "@/components/SkeletonLoader";
import toast from "react-hot-toast";
import { formatPackageType } from "@/lib/helper";

type ProductCategory = keyof typeof productsList;

const AddProductForm = ({
  mode,
  productData,
  subscribe,
  currentFranchiseUuid,
  onClose,
  loading: productDataLoading,
}: {
  mode: "add" | "view" | "edit";
  productData?: any;
  subscribe?: boolean;
  currentFranchiseUuid?: string;
  onClose: any;
  loading?: boolean;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();
  const [selectedCategory, setSelectedCategory] = useState<
    ProductCategory | ""
  >(productData?.category || "");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const initialInputData =
    mode === "view" || productData
      ? productData.active_ingredient
      : [{ ingredient: "", concentration: "", unit: "" }];
  const { inputFields, handleAddField, handleDeleteField, setInputFields } =
    useDynamicFields(initialInputData);

  //
  const { mutate: subscribeProduct, isPending: subscribing } =
    useSubscribeProduct();
  const { mutate: addProduct, isPending: loading } = useCreateProduct();
  const { mutate: updateProduct, isPending: updating } =
    useUpdateProduct(token);
  const { mutate: verifyProduct, isPending: verifying } =
    useVerifyProduct(token);
  const { mutate: deleteProductImage, isPending: deletingImage } =
    useDeleteProductImage(token);
  const { data: activeIngredientsList, isLoading: loadingActiveIngredients } =
    useGetAllActiveIngredients(token);
  const { data: companyProfile, isLoading: profileDataLoading } =
    useGetCompanyProfile(token);
  const { data: companiesUsersList, isLoading: companiesListLoading } =
    useGetAllCompaniesUsers(token);

  const form = useForm<z.infer<typeof addProductFormSchema>>({
    resolver: zodResolver(addProductFormSchema),
    defaultValues: {
      name: "",
      company_fk: "",
      category: "",
      sub_category: "",
      package_weight: "",
      weight_unit: "",
      package_type: "",
      area_covered: "",
      type: "",
      price: "",
      disease_purpose: "",
      description: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (productData) {
      reset({
        name: productData.name || "",
        company_fk: productData.company_fk || "",
        category: productData.category || "",
        sub_category: productData.sub_category || "",
        package_weight: productData.package_weight || "",
        weight_unit: productData.weight_unit || "",
        package_type: productData.package_type || "",
        area_covered: productData.area_covered || "",
        type: productData.type || "",
        disease_purpose: productData.disease_purpose || "",
        price: productData.price || "",
        description: productData.description || "",
      });

      if (productData.active_ingredient) {
        const updatedFields = productData.active_ingredient.map(
          (item: any) => ({
            ingredient: item.ingredient ? item.ingredient : item.ingredient_fk,
            concentration: item.concentration,
            unit: item.unit,
          })
        );

        setInputFields(updatedFields);
      }
    }
  }, [productData, reset, setInputFields]);

  const transformedActiveIngredients =
    activeIngredientsList?.data?.ingredients.map((ingredient: any) => ({
      value: ingredient.ingredient_name,
      label:
        ingredient?.ingredient_name?.charAt(0).toUpperCase() +
        ingredient?.ingredient_name?.slice(1),
    })) || [];

  const onSubmit = (data: z.infer<typeof addProductFormSchema>) => {
    const activeIngredientsArray = inputFields.map((field) => ({
      ingredient_name: field.ingredient,
      concentration: field.concentration,
      unit: field.unit,
    }));

    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("company_fk", data.company_fk);
    formData.append("category", data.category);
    formData.append("sub_category", data.sub_category);
    formData.append("description", data.description);
    formData.append("price", data.price);
    formData.append("area_covered", data.area_covered);
    formData.append("disease_purpose", data.disease_purpose);
    formData.append("type", data.type);
    formData.append("package_type", data.package_type);
    formData.append("package_weight", data.package_weight);
    formData.append("weight_unit", data.weight_unit);

    formData.append(
      "active_ingredients",
      JSON.stringify(activeIngredientsArray)
    );

    selectedImages.forEach((image, index) => {
      formData.append(`images`, image);
    });

    if (mode === "add" && selectedImages.length < 1) {
      toast.error("Please upload at least 1 image.");
      return;
    }

    if (mode === "add") {
      addProduct(
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
      // verifyProduct(productData.uuid, {
      //   onError: (log) => {
      //     console.log(log, "loglogloglog");
      //   },
      // });
      updateProduct(
        { data: formData, uuid: productData.uuid },
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

  const verifyToSubscribeProduct = async () => {
    onClose();
    const isConfirmed = await SweetAlert(
      "Subscribe Product?",
      "",
      "question",
      "Yes, subscribe it!",
      "#15803D"
    );
    if (isConfirmed) {
      subscribeProduct(
        {
          data: {
            franchise_fk: currentFranchiseUuid,
            product_fk: productData?.uuid,
          },
          token,
        },
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
      {productDataLoading ? (
        <SkeletonCard className="h-[80vh] w-full" />
      ) : (
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="name" className="dark:text-farmacieGrey">
                Product Name
              </Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Product name"
                        type="text"
                        id="name"
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
                              productData?.company_fk || "Select Brand Company"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Brand Name</SelectLabel>
                            {!companiesListLoading &&
                              companiesUsersList?.data?.map((company: any) => (
                                <SelectItem
                                  key={company.uuid}
                                  value={company.company_fk}
                                >
                                  {company.company_fk}
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
              <Label htmlFor="category" className="dark:text-farmacieGrey">
                Category
              </Label>
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setSelectedCategory(value as any);
                          form.setValue("sub_category", "");
                          field.onChange(value);
                        }}
                        disabled={isViewMode}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                          <SelectValue
                            placeholder={
                              productData?.category || "Select Category"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Category</SelectLabel>
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
              <Label htmlFor="sub_category" className="dark:text-farmacieGrey">
                Sub category
              </Label>
              <FormField
                control={form.control}
                name="sub_category"
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
                              productData?.sub_category || "Select Sub Category"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Sub-Category</SelectLabel>
                            {selectedCategory &&
                              productsList[selectedCategory]?.map(
                                (subCategory: any, ind: number) => (
                                  <SelectItem key={ind} value={subCategory}>
                                    {subCategory}
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
          {inputFields?.map((field, index) => (
            <div
              key={index}
              className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"
            >
              <LabelInputContainer>
                <Label
                  htmlFor={`active_ingredients-${index}`}
                  className="dark:text-farmacieGrey"
                >
                  Active Ingredient
                </Label>
                <FormControl>
                  <Select
                    defaultValue={field.ingredient}
                    name="ingredient"
                    onValueChange={(value) => {
                      const updatedFields = [...inputFields];
                      updatedFields[index].ingredient = value;
                      setInputFields(updatedFields);
                    }}
                    disabled={isViewMode || loadingActiveIngredients}
                  >
                    <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                      <SelectValue
                        placeholder={
                          field.ingredient || "Select Active Ingredient"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        <SelectLabel>Active Ingredients</SelectLabel>
                        {transformedActiveIngredients.map((item: any) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label
                  htmlFor={`concentration-${index}`}
                  className="dark:text-farmacieGrey"
                >
                  Concentration
                </Label>
                <FormControl>
                  <Input
                    defaultValue={field.concentration}
                    type="text"
                    placeholder="Enter concentration"
                    className="outline-none focus:border-primary disabled:bg-primary/20"
                    onChange={(e) => {
                      const updatedFields = [...inputFields];
                      updatedFields[index].concentration = e.target.value;
                      setInputFields(updatedFields);
                    }}
                    disabled={isViewMode}
                  />
                </FormControl>
              </LabelInputContainer>

              <LabelInputContainer>
                <Label
                  htmlFor={`units-${index}`}
                  className="dark:text-farmacieGrey"
                >
                  Units
                </Label>
                <FormControl>
                  <Select
                    value={field.unit}
                    onValueChange={(value) => {
                      const updatedFields = [...inputFields];
                      updatedFields[index].unit = value;
                      setInputFields(updatedFields);
                    }}
                    disabled={isViewMode}
                  >
                    <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                      <SelectValue placeholder={field?.unit || "Select unit"} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        <SelectLabel>Select unit</SelectLabel>
                        {units.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
              </LabelInputContainer>

              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  className="bg-primary text-farmacieWhite mt-5"
                  type="button"
                  onClick={handleAddField}
                  disabled={isViewMode}
                >
                  <Plus className="w-4 h-4" />
                </Button>
                {index > 0 && (
                  <Button
                    size="icon"
                    className="bg-red-500 text-farmacieWhite mt-5"
                    type="button"
                    onClick={() => handleDeleteField(index)}
                    disabled={isViewMode}
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          ))}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label
                htmlFor="package_weight"
                className="dark:text-farmacieGrey"
              >
                Package Weight
              </Label>
              <FormField
                control={form.control}
                name="package_weight"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Package Weight"
                        type="number"
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
            <LabelInputContainer>
              <Label htmlFor="weight_unit" className="dark:text-farmacieGrey">
                Weight Unit
              </Label>
              <FormField
                control={form.control}
                name="weight_unit"
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
                              productData?.weight_unit || "Select Weight Unit"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Weight-Unit</SelectLabel>
                            {weightUnitType.map((item) => (
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
              <Label htmlFor="package_type" className="dark:text-farmacieGrey">
                Packaging type
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
                              formatPackageType(productData?.package_type) ||
                              "Select Packaging type"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Packaging-Type</SelectLabel>
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
            <LabelInputContainer>
              <Label htmlFor="area_covered" className="dark:text-farmacieGrey">
                Area covered (acre)
              </Label>
              <FormField
                control={form.control}
                name="area_covered"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Area covered"
                        type="number"
                        id="area_covered"
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
              <Label htmlFor="type" className="dark:text-farmacieGrey">
                Bio/Chemical
              </Label>
              <FormField
                control={form.control}
                name="type"
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
                            placeholder={productData?.type || "Select Type"}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            {productType.map((item) => (
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
                        type="number"
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
                htmlFor="disease_purpose"
                className="dark:text-farmacieGrey"
              >
                Disease/Purpose
              </Label>
              <FormField
                control={form.control}
                name="disease_purpose"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter purpose or Disease keywords seperated by comma"
                        type="text"
                        id="disease_purpose"
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
            (subscribe || productData?.product_image?.length > 0) && (
              <div className="flex flex-wrap mb-4">
                {productData.product_image?.map((image: any, index: number) => (
                  <div key={index} className="relative h-32 w-32 m-1">
                    <Image
                      src={`${baseUrl.replace("/api", "")}${image.image_url}`}
                      alt={`Product image ${index + 1}`}
                      className="h-32 w-32 object-cover m-1 rounded-md"
                      width={80}
                      height={80}
                    />
                    {mode === "edit" && (
                      <button
                        onClick={() => deleteProductImage(image.uuid)}
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
          <Button
            className="w-full text-white font-medium"
            type={subscribe ? "button" : "submit"}
            disabled={isViewMode && !subscribe}
            onClick={subscribe ? verifyToSubscribeProduct : undefined}
          >
            {mode === "edit"
              ? "Update Product"
              : subscribe
              ? "Subscribe"
              : "Submit"}
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      )}
    </Form>
  );
};

export default AddProductForm;
