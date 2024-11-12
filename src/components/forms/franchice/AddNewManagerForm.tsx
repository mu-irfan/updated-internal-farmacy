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
import { addManagerFormSchema } from "@/schemas/validation/validationSchema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import { useCreateManager, useUpdateManager } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { Toaster } from "react-hot-toast";

const AddManagerForm = ({
  showInsList,
  manager,
  mode,
  onClose,
}: {
  showInsList?: boolean;
  manager: any;
  mode: "add" | "view" | "edit";
  onClose: () => void;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();
  const { mutate: addManager, isPending: loading } = useCreateManager();
  const { mutate: updateManager, isPending: updating } = useUpdateManager();

  const form = useForm<z.infer<typeof addManagerFormSchema>>({
    resolver: zodResolver(addManagerFormSchema),
    defaultValues: {
      full_name: "",
      contact: "",
    },
  });

  const { reset } = form;
  useEffect(() => {
    if (manager) {
      reset({
        full_name: manager.full_name || "",
        contact: manager.contact || "",
      });
    }
  }, [manager, reset]);

  const onSubmit = (data: z.infer<typeof addManagerFormSchema>) => {
    if (mode === "add") {
      addManager(
        { data, token },
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
        data: { full_name: data.full_name, uuid: manager?.uuid },
        token,
      };
      updateManager(updatedData, {
        onSuccess: (log) => {
          if (log?.success) {
            onClose();
          }
        },
      });
    }
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-3 mb-4">
            <LabelInputContainer>
              <Label htmlFor="full_name" className="dark:text-farmacieGrey">
                Manager Full Name
              </Label>
              <FormField
                control={form.control}
                name="full_name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter manager name"
                        type="text"
                        id="full_name"
                        className="outline-none focus:border-primary"
                        {...field}
                        disabled={isViewMode}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
            {mode === "add" && (
              <LabelInputContainer>
                <Label htmlFor="contact" className="dark:text-farmacieGrey">
                  Phone number
                </Label>
                <FormField
                  control={form.control}
                  name="contact"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Manager phone number"
                          type="number"
                          id="contact"
                          className="outline-none focus:border-primary"
                          {...field}
                          disabled={isViewMode}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
            )}

            {showInsList && (
              <ul className="list-disc text-xs pl-8 space-y-2 text-yellow-600">
                <li>The number should belongs to the franchise manager</li>
                <li>
                  The manager can login in by simply entering the number and
                  verify the OTP
                </li>
              </ul>
            )}
          </div>
          <Button
            className="w-full text-white font-medium mt-4"
            type="submit"
            disabled={isViewMode || loading || updating}
          >
            {mode === "add" ? "Create" : "Update"}
          </Button>
          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      </Form>
    </>
  );
};

export default AddManagerForm;
