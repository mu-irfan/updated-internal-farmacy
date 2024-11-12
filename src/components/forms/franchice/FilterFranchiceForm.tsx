import React, { useState } from "react";
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
import { filterFranchiceFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { pakistanData } from "@/constant/data";
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

const FilterFranchiceForm = ({
  onSubmit,
}: {
  onSubmit: (data: {
    province: string;
    district: string;
    tehsil: string;
  }) => void;
}) => {
  const [districtOptions, setDistrictOptions] = useState<Option[]>([]);
  const [tehsilOptions, setTehsilOptions] = useState<Option[]>([]);

  const form = useForm<z.infer<typeof filterFranchiceFormSchema>>({
    resolver: zodResolver(filterFranchiceFormSchema),
    defaultValues: {
      province: "",
      district: "",
      tehsil: "",
    },
  });

  const handleProvinceChange = (value: string) => {
    const districts = pakistanData[`districts_${value}`] || [];
    setDistrictOptions(districts as any);
    setTehsilOptions([]);
  };

  const handleDistrictChange = (value: string) => {
    const tehsils = pakistanData[`tehsils_${value}`] || [];
    setTehsilOptions(tehsils as any);
  };

  const handleSubmit = (data: z.infer<typeof filterFranchiceFormSchema>) => {
    onSubmit(data as any);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col space-y-2 gap-3 mb-4">
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
                        <SelectValue placeholder="All Pakistan" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Province</SelectLabel>
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
                        <SelectValue placeholder="All districts" />
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
                        field.onChange(value);
                      }}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="All tehsils" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        {tehsilOptions.map((tehsil) => (
                          <SelectItem key={tehsil.value} value={tehsil.value}>
                            {tehsil.label}
                          </SelectItem>
                        ))}
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
          Submit Filter
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default FilterFranchiceForm;
