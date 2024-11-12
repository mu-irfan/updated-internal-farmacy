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
import { addQueryFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import LabelInputContainer from "../LabelInputContainer";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTicket } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { Toaster } from "react-hot-toast";
import { productCategory } from "@/constant/data";

const AddQueryForm = ({ onClose }: any) => {
  const { mutate: addQuery, isPending: loading } = useCreateTicket();
  const { token } = useContextConsumer();

  const form = useForm<z.infer<typeof addQueryFormSchema>>({
    resolver: zodResolver(addQueryFormSchema),
    defaultValues: {
      company: "",
      query: "",
    },
  });

  const onSubmit = (data: z.infer<typeof addQueryFormSchema>) => {
    addQuery(
      { data, token },
      {
        onSuccess: (log) => {
          if (log?.success) {
            onClose();
          }
        },
      }
    );
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="name" className="dark:text-farmacieGrey">
              Company
            </Label>
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select onValueChange={(value) => field.onChange(value)}>
                      <SelectTrigger className="p-3 py-5 rounded-md dark:text-farmacieGrey border-[0.5px] border-farmacieGrey focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary">
                        <SelectValue placeholder="Select Company" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl">
                        <SelectGroup>
                          <SelectLabel>Company</SelectLabel>
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
            <Label htmlFor="query" className="dark:text-farmacieGrey">
              Query
            </Label>
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea
                      placeholder="Enter your query ..."
                      rows={8}
                      id="query"
                      className="outline-none focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <Button
            className="w-full text-white font-medium"
            type="submit"
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit Query"}
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      </Form>
    </>
  );
};

export default AddQueryForm;
