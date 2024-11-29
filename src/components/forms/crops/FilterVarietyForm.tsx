import React from "react";
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
import { filterVarietyFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { inSimulatorFilteringValues } from "@/constant/data";
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
import { useContextConsumer } from "@/context/Context";
import { useGetAllCropsList } from "@/hooks/apis/crop/useCrop";

const FilterVarietyForm = ({
  onSubmit,
}: {
  onSubmit: (data: { crop_fk: string; in_farmacie: boolean }) => void;
}) => {
  const { token } = useContextConsumer();

  //
  const { data: cropsList, isLoading: cropsLoading } =
    useGetAllCropsList(token);

  const form = useForm<z.infer<typeof filterVarietyFormSchema>>({
    resolver: zodResolver(filterVarietyFormSchema),
    defaultValues: {
      crop_fk: "",
      in_farmacie: false,
    },
  });

  const handleSubmit = (data: z.infer<typeof filterVarietyFormSchema>) => {
    onSubmit(data as any);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="flex flex-col space-y-2 gap-3 mb-4">
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
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select Crop" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Crop</SelectLabel>
                          {!cropsLoading &&
                            cropsList?.data?.map((crop: any, index: number) => (
                              <SelectItem key={index} value={crop?.crop_name}>
                                {crop.crop_name}
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
            <Label htmlFor="in_farmacie" className="dark:text-farmacieGrey">
              In Farmacie
            </Label>
            <FormField
              control={form.control}
              name="in_farmacie"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(
                          value === "true"
                            ? true
                            : value === "false"
                            ? false
                            : value
                        );
                      }}
                    >
                      <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                        <SelectValue placeholder="Select In Farmacie" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>In Farmacie</SelectLabel>
                          {inSimulatorFilteringValues.map((item) => (
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
        <Button className="w-full text-white font-medium" type="submit">
          Submit Filter
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default FilterVarietyForm;
