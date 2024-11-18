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
import { verifyCompanyFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
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
import {
  useGetAllCompaniesUsers,
  useVerifyCompany,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";

const VerifyCompanyForm = ({ onClose }: { onClose: () => void }) => {
  const { token } = useContextConsumer();
  const form = useForm<z.infer<typeof verifyCompanyFormSchema>>({
    resolver: zodResolver(verifyCompanyFormSchema),
    defaultValues: {
      name: "",
    },
  });

  const { data: companiesUsersList, isLoading: companiesListLoading } =
    useGetAllCompaniesUsers(token);
  const { mutate: verifyCompany, isPending: verifying } = useVerifyCompany();

  const onSubmit = (data: z.infer<typeof verifyCompanyFormSchema>) => {
    const selectedCompany = companiesUsersList?.data?.find(
      (company: any) => company.company_fk === data.name
    );
    if (!selectedCompany) {
      console.error("Company not found.");
      return;
    }
    const payload = {
      company: selectedCompany.company_fk,
      uuid: selectedCompany.uuid,
    };

    verifyCompany(
      { data: payload, token },
      {
        onSuccess: (log) => {
          if (log?.success) onClose();
        },
      }
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name" className="dark:text-farmacieGrey">
            Company Name
          </Label>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                  >
                    <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary">
                      <SelectValue placeholder="Select Company" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl">
                      <SelectGroup>
                        <SelectLabel>Company</SelectLabel>
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
        <p className="text-yellow-400 text-xs pb-6">
          If company is not in the drop down first add the company in the
          company list.
        </p>
        <Button className="w-full text-white font-medium" type="submit">
          {verifying ? "Verifying..." : "Verify"}
        </Button>
        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
      </form>
    </Form>
  );
};

export default VerifyCompanyForm;
