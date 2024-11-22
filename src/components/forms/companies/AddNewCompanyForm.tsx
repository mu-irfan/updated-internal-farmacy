import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import { useContextConsumer } from "@/context/Context";
import { Plus, Trash } from "lucide-react";
import { addCompanyToGlobalListFormSchema } from "@/schemas/validation/validationSchema";
import { useCreateCompany, useUpdateCompany } from "@/hooks/apis/useCompany";

const AddCompanyForm = ({
  company,
  mode,
  onClose,
}: {
  company: any;
  mode: "add" | "view" | "edit";
  onClose: () => void;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();

  //
  const { mutate: addCompany, isPending: loading } = useCreateCompany();
  const { mutate: updateCompany, isPending: updating } =
    useUpdateCompany(token);

  const form = useForm({
    resolver: zodResolver(addCompanyToGlobalListFormSchema),
    // defaultValues: { companies: [""] },
    shouldUnregister: true,
  });

  const { reset } = form;

  const { fields, append, remove } = useFieldArray({
    name: "companies",
    control: form.control,
  });

  useEffect(() => {
    if (company) {
      reset({
        companies: [company.company],
      });
    }
  }, [company, reset]);

  useEffect(() => {
    if (mode === "add" && fields.length === 0) append("");
  }, [fields, append, mode]);

  const onSubmit = (data: any) => {
    if (mode === "add") {
      const companies = data.companies.filter(
        (name: any) => name.trim() !== ""
      );
      addCompany(
        { data: { companies }, token },
        {
          onSuccess: (log) => {
            if (log?.success) onClose();
          },
        }
      );
    } else if (mode === "edit") {
      const updatedData = {
        company: company.company,
        updatedCompany: data.companies[0],
      };
      updateCompany(
        { data: updatedData },
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
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col md:flex-row items-center gap-3 mb-4"
            >
              <LabelInputContainer>
                <Label
                  htmlFor={`company_${index}`}
                  className="dark:text-farmacieGrey"
                >
                  Company Name
                </Label>
                <FormField
                  control={form.control}
                  name={`companies.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter company name"
                          type="text"
                          {...field}
                          className="outline-none focus:border-primary"
                          disabled={isViewMode}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
              {mode === "add" && fields.length > 1 && (
                <Button
                  size="icon"
                  className="bg-red-500 hover:bg-red-600 text-black mt-5"
                  type="button"
                  onClick={() => remove(index)}
                  disabled={isViewMode}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}
              {index === fields.length - 1 && mode === "add" && (
                <Button
                  size="icon"
                  className="bg-primary text-farmacieWhite mt-5"
                  type="button"
                  onClick={() => append("")}
                  disabled={isViewMode}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            className="w-full text-white font-medium mt-4"
            type="submit"
            disabled={isViewMode || loading}
          >
            {mode === "add"
              ? "Submit"
              : loading
              ? "Creating..."
              : updating
              ? "Updating..."
              : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddCompanyForm;
