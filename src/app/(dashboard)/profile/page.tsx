"use client";
import DashboardLayout from "../dashboard-layout";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { profileFormSchema } from "@/schemas/validation/validationSchema";
import LabelInputContainer from "@/components/forms/LabelInputContainer";
import { Label } from "@/components/ui/label";
import {
  useGetCompanyProfile,
  useUpdateCompanyProfile,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

type ProfileFormValues = z.infer<typeof profileFormSchema>;

export default function ProfileForm() {
  const { token } = useContextConsumer();
  const [isEditable, setIsEditable] = useState<boolean>(false);

  //stats data
  const { data: data, isLoading: loading } = useGetCompanyProfile(token);
  const { mutate: updateCompany, isPending: updating } =
    useUpdateCompanyProfile();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (data?.success) {
      form.reset({
        name: data.data.name,
        email: data.data.email,
      });
    }
  }, [data, form]);

  function onSubmit(data: ProfileFormValues) {
    updateCompany(
      { data, token },
      {
        onSuccess: () => {
          setIsEditable(false);
        },
      }
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col justify-center items-center mt-20">
        <h2
          className="font-semibold text-2xl md:text-4
        xl mt-4 text-neutral-800 dark:text-green-500"
        >
          Profile Details
        </h2>
        <p className="text-neutral-600 text-sm max-w-md text-center dark:text-neutral-300 mt-4 mb-8">
          Update your profile information here to ensure your details are
          current and accurate.
        </p>
        <div className="flex justify-end gap-1 w-full max-w-xl mb-4">
          <Button
            variant="outline"
            size="sm"
            disabled
            type="button"
            className={cn(
              "py-2 px-4 cursor-not-allowed hover:bg-current",
              data?.data?.verified
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            )}
          >
            {data?.data?.verified ? "Verified" : "Not Verified"}
          </Button>
          <Button
            size="sm"
            type="button"
            onClick={() => setIsEditable(!isEditable)}
            className="py-2 px-4"
          >
            {isEditable ? "Cancel" : "Edit"}
            {!isEditable && <Pencil className="w-3.5 h-3.5 ml-2" />}
          </Button>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="px-6 space-y-4 flex flex-col items-stretch w-full max-w-xl border-2 border-primary p-20 rounded-lg"
          >
            <LabelInputContainer>
              <Label htmlFor="name" className="dark:text-farmacieGrey">
                Company Name
              </Label>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Agronomics"
                        type="text"
                        id="name"
                        className="outline-none focus:border-primary py-5"
                        {...field}
                        disabled={!isEditable}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="email" className="dark:text-farmacieGrey">
                Company Email
              </Label>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="agronomics@gmail.com"
                        type="text"
                        id="email"
                        className="outline-none focus:border-primary py-5"
                        {...field}
                        disabled
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            <Button type="submit" className="my-4" disabled={!isEditable}>
              {updating ? "Updating" : "Update Profile"}
            </Button>
          </form>
        </Form>
      </div>
    </DashboardLayout>
  );
}
