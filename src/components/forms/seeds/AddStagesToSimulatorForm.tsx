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
import { addStagesToSimulatorFormSchema } from "@/schemas/validation/validationSchema";
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

const AddStagesToSimulatorForm = ({ stage }: any) => {
  const form = useForm<z.infer<typeof addStagesToSimulatorFormSchema>>({
    resolver: zodResolver(addStagesToSimulatorFormSchema),
    defaultValues: {
      varietyName: "",
      stage: "",
      source: "",
      principleStage: "",
      BBCH_scale: "",
      kc: "",
      baseTemp: "",
      minTemperature: "",
      maxTemperature: "",
      start_gdd: "",
      end_gdd: "",
    },
  });

  const { reset } = form;

  useEffect(() => {
    if (stage) {
      reset({
        stage: stage.stage || "",
        // sub_stage: stage.sub_stage || "",
        BBCH_scale: stage.BBCH_scale || "",
        start_gdd: stage.start_gdd || "",
        end_gdd: stage.end_gdd || "",
      });
    }
  }, [stage, reset]);

  const onSubmit = (data: z.infer<typeof addStagesToSimulatorFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <>
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="varietyName" className="dark:text-farmacieGrey">
                Variety Name
              </Label>
              <FormField
                control={form.control}
                name="varietyName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder="Select Variety" />
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
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder="Select Stage" />
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
              <Label
                htmlFor="principleStage"
                className="dark:text-farmacieGrey"
              >
                Principle Stage
              </Label>
              <FormField
                control={form.control}
                name="principleStage"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder="Select Principle Stage" />
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
              <Label htmlFor="BBCH_scale" className="dark:text-farmacieGrey">
                BBCH Scale
              </Label>
              <FormField
                control={form.control}
                name="BBCH_scale"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder="Select BBCH Scale" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>BBCH Scale</SelectLabel>
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
                        type="text"
                        id="kc"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="baseTemp" className="dark:text-farmacieGrey">
                Base temperature (C)
              </Label>
              <FormField
                control={form.control}
                name="baseTemp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter Base Temprature"
                        type="text"
                        id="baseTemp"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
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
                htmlFor="minTemperature"
                className="dark:text-farmacieGrey"
              >
                Min Temperature
              </Label>
              <FormField
                control={form.control}
                name="minTemperature"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter min Temperature"
                        type="text"
                        id="minTemperature"
                        className="outline-none focus:border-primary disabled:bg-primary/20"
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
                htmlFor="maxTemperature"
                className="dark:text-farmacieGrey"
              >
                Max temperature
              </Label>
              <FormField
                control={form.control}
                name="maxTemperature"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                        }}
                      >
                        <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                          <SelectValue placeholder="Select Max Temperature" />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectGroup>
                            <SelectLabel>Max Temp</SelectLabel>
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
            Add Stage In Simulator
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddStagesToSimulatorForm;
