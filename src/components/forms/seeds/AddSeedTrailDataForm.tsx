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
import { addSeedTrailDataFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";

const AddSeedTrailDataForm = () => {
  const form = useForm<z.infer<typeof addSeedTrailDataFormSchema>>({
    resolver: zodResolver(addSeedTrailDataFormSchema),
    defaultValues: {
      sowingDate: "",
      city: "",
    },
  });

  const onSubmit = (data: z.infer<typeof addSeedTrailDataFormSchema>) => {
    console.log("Submitting form data:", data);
  };

  return (
    <>
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
            <LabelInputContainer>
              <Label htmlFor="sowingDate" className="dark:text-farmacieGrey">
                Sowing Date
              </Label>
              <FormField
                control={form.control}
                name="sowingDate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter date"
                        type="text"
                        id="sowingDate"
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
              <Label htmlFor="city" className="dark:text-farmacieGrey">
                City
              </Label>
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter city name"
                        type="text"
                        id="city"
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

          <LabelInputContainer className="mb-4">
            <Label htmlFor="sowingDate" className="dark:text-farmacieGrey">
              Sowing Date
            </Label>
            <FormField
              control={form.control}
              name="sowingDate"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter date"
                      type="text"
                      id="sowingDate"
                      className="outline-none focus:border-primary disabled:bg-primary/20"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>

          <Button className="w-full text-white font-medium" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddSeedTrailDataForm;
