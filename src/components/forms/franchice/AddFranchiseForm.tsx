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
import { addFranchiseFormSchema } from "@/schemas/validation/validationSchema";
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
} from "../../ui/select";
import { pakistanData } from "@/constant/data";
import { useContextConsumer } from "@/context/Context";
import {
  useCreateFranchise,
  useGetAllManagers,
  useUpdateFranchise,
} from "@/hooks/useDataFetch";
import { Toaster } from "react-hot-toast";

const AddFranchiceForm = ({ franchise, onClose }: any) => {
  const { mode, token } = useContextConsumer();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedManagerUuid, setSelectedManagerUuid] = useState("");
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [tehsilOptions, setTehsilOptions] = useState<Option[]>([]);

  //
  const { mutate: addFranchise, isPending: loading } = useCreateFranchise();
  const { data: managers, isLoading: loadingManagers } =
    useGetAllManagers(token);
  const { mutate: updateFranchise, isPending: updating } = useUpdateFranchise();

  const form = useForm<z.infer<typeof addFranchiseFormSchema>>({
    resolver: zodResolver(addFranchiseFormSchema),
    defaultValues: {
      full_name: "",
      franchise_name: "",
      contact: "",
      address: "",
      province: "",
      district: "",
      tehsil: "",
      managerUuid: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (franchise) {
      reset({
        full_name: franchise.franchise_manager.full_name || "",
        franchise_name: franchise.franchise_name || "",
        contact: franchise.franchise_manager.contact || "",
        address: franchise.address || "",
        province: franchise.province || "",
        district: franchise.district || "",
        tehsil: franchise.tehsil || "",
        managerUuid: franchise.managerUuid || "",
      });
    }
  }, [franchise, reset]);

  const onSubmit = (data: z.infer<typeof addFranchiseFormSchema>) => {
    if (mode === "add") {
      const submitData = {
        ...data,
        user_fk: selectedManagerUuid,
      };
      addFranchise(
        { data: submitData, token },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    } else if (mode === "edit") {
      const updatedData = {
        data: {
          ...data,
          user_fk: selectedManagerUuid,
          uuid: franchise?.uuid,
        },
        token,
      };
      updateFranchise(updatedData, {
        onSuccess: (log) => {
          if (log?.success) {
            onClose();
          }
        },
      });
    }
  };

  const handleProvinceChange = (value: string) => {
    const districts = pakistanData[`districts_${value}`] || [];
    setDistrictOptions(districts as any);
    setTehsilOptions([]);
  };

  const handleDistrictChange = (value: string) => {
    const tehsils = pakistanData[`tehsils_${value}`] || [];
    setTehsilOptions(tehsils as any);
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 mb-4">
            <LabelInputContainer>
              <Label htmlFor="full_name" className="dark:text-farmacieGrey">
                Select Manager
              </Label>
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setSelectedManagerUuid(value);
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue
                            placeholder={
                              franchise?.franchise_manager.full_name ||
                              "Select Franchise Manager"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select Manager Name</SelectLabel>
                            {!loadingManagers && managers?.data?.length > 0 ? (
                              managers.data.map((manager: any) => (
                                <SelectItem
                                  key={manager.uuid}
                                  value={manager.uuid}
                                >
                                  {manager.full_name}
                                </SelectItem>
                              ))
                            ) : (
                              <SelectItem
                                disabled
                                value="No managers available"
                              >
                                No managers available
                              </SelectItem>
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
            <ul className="list-disc text-xs pl-8 space-y-2 text-yellow-600">
              <li>
                Franchise manager is the person who can log in on farmacie and
                can manage franchise and catalog.
              </li>
              <li>
                Add new manager by creating profile to make it available in the
                drop down.
              </li>
            </ul>
            <LabelInputContainer className="mt-3">
              <Label
                htmlFor="franchise_name"
                className="dark:text-farmacieGrey"
              >
                Franchise Name
              </Label>
              <FormField
                control={form.control}
                name="franchise_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter franchise name"
                        type="text"
                        id="franchise_name"
                        className="outline-none focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="contact" className="dark:text-farmacieGrey">
                Franchise Contact (Optional)
              </Label>
              <FormField
                control={form.control}
                name="contact"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="0300 0000 000"
                        type="text"
                        id="contact"
                        className="outline-none focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="address" className="dark:text-farmacieGrey">
                Address
              </Label>
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter address"
                        type="text"
                        id="address"
                        className="outline-none focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="province" className="dark:text-farmacieGrey">
                Province
              </Label>
              <FormField
                control={form.control}
                name="province"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          handleProvinceChange(value);
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue
                            placeholder={
                              franchise?.province || "Select province"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select Province</SelectLabel>
                            {pakistanData.provinces.map((item) => (
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
              <Label htmlFor="district" className="dark:text-farmacieGrey">
                District
              </Label>
              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          handleDistrictChange(value);
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue
                            placeholder={
                              franchise?.district || "Select District"
                            }
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select District</SelectLabel>
                            {districtOptions.map((district) => (
                              <SelectItem
                                key={district.value}
                                value={district.value}
                              >
                                {district.label}
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
              <Label htmlFor="tehsil" className="dark:text-farmacieGrey">
                Tehsil
              </Label>
              <FormField
                control={form.control}
                name="tehsil"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          setSelectedCategory(value);
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue
                            placeholder={franchise?.tehsil || "Select Tehsil"}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Select Tehsil</SelectLabel>
                            {tehsilOptions.map((tehsil) => (
                              <SelectItem
                                key={tehsil.value}
                                value={tehsil.value}
                              >
                                {tehsil.label}
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
          <Button className="w-full text-white font-medium" type="submit">
            {mode === "edit" ? "Update" : "Submit Franchise"}
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      </Form>
    </>
  );
};

export default AddFranchiceForm;
