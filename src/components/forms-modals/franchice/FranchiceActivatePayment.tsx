import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardTitle } from "@/components/ui/card";
import CustomCheckbox from "@/components/ui/CustomCheckbox";
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
import LabelInputContainer from "@/components/forms/LabelInputContainer";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-dropdown-menu";
import { addPaymentFormSchema } from "@/schemas/validation/validationSchema";
import { useCreateBulkPayment } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";

const ActivateFranchisePaymentModal = ({
  open,
  onOpenChange,
  franchiseUUIDs,
  amount,
  onClose,
}: ActivateFranchisePaymentModalProps) => {
  const { token } = useContextConsumer();
  const [selectedPayment, setSelectedPayment] = useState<string | null>(null);
  const [isEnterPaymentDetailsModalOpen, setEnterPaymentDetailsModalOpen] =
    useState<boolean>(false);

  //
  const { mutate: addBulkPayment, isPending: paying } = useCreateBulkPayment();

  const handleCheckboxChange = (paymentMethod: string) => {
    setSelectedPayment((prev) =>
      prev === paymentMethod ? null : paymentMethod
    );
  };

  const form = useForm<z.infer<typeof addPaymentFormSchema>>({
    resolver: zodResolver(addPaymentFormSchema),
    defaultValues: {
      cnic_last6: "",
      phone: "",
    },
  });

  const onSubmit = (data: z.infer<typeof addPaymentFormSchema>) => {
    const payload = {
      phone: data.phone,
      cnic_last6: data.cnic_last6,
      franchise_uuid_list: franchiseUUIDs,
      amount_showed: amount,
    };

    addBulkPayment(
      { data: payload, token },
      {
        onSuccess: (log) => {
          if (log?.success) {
            onOpenChange(false);
            onClose((prev: any) => !prev);
          }
        },
      }
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        {!isEnterPaymentDetailsModalOpen ? (
          <div className="space-y-4">
            <DialogHeader className="py-8">
              <DialogTitle className="text-primary text-xl font-bold">
                Bulk Franchise Activate
              </DialogTitle>
              <DialogDescription className="md:flex items-center justify-between">
                Select the payment method
              </DialogDescription>
            </DialogHeader>
            <Card className="w-full py-8 rounded-xl text-center bg-primary/10">
              <div className="flex items-center justify-start pl-4 md:pl-10">
                <CustomCheckbox
                  id="payment-jazzcash"
                  checked={selectedPayment === "JazzCash"}
                  onChange={() => handleCheckboxChange("JazzCash")}
                />
                <CardTitle className="text-xl md:text-3xl pl-2 md:pl-8 font-bold text-primary">
                  Pay With JazzCash
                </CardTitle>
              </div>
            </Card>
            {/* <Card className="w-full py-8 rounded-xl text-center bg-primary/10">
              <div className="flex items-center justify-start pl-4 md:pl-10">
                <CustomCheckbox
                  id="payment-card"
                  checked={selectedPayment === "Card"}
                  onChange={() => handleCheckboxChange("Card")}
                />
                <CardTitle className="text-xl md:text-3xl pl-2 md:pl-8 font-bold text-primary">
                  Pay With Card
                </CardTitle>
              </div>
            </Card> */}
            <Button
              className="w-full text-white font-medium my-4"
              type="button"
              onClick={() => setEnterPaymentDetailsModalOpen((prev) => !prev)}
            >
              Continue to Payment
            </Button>
          </div>
        ) : (
          <Form {...form}>
            <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
              <h2 className="pb-6">Bulk Franchise Activate</h2>
              <div className="flex flex-col gap-3 mb-4">
                <LabelInputContainer>
                  <Label className="dark:text-farmacieGrey">
                    Enter CNIC last 6 digits
                  </Label>
                  <FormField
                    control={form.control}
                    name="cnic_last6"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter CNIC last 6 digits"
                            type="text"
                            id="cnic_last6"
                            className="outline-none focus:border-primary"
                            {...field}
                            disabled={paying}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>
                <LabelInputContainer>
                  <Label className="dark:text-farmacieGrey">Phone number</Label>
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Enter phone number"
                            type="number"
                            id="phone"
                            className="outline-none focus:border-primary"
                            {...field}
                            disabled={paying}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </LabelInputContainer>
              </div>
              <Button
                className="w-full text-white font-medium mt-4"
                type="submit"
              >
                {paying ? "Processing..." : "Pay Now"}
              </Button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
            </form>
          </Form>
        )}

        <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent h-[1px] w-full" />
      </DialogContent>
    </Dialog>
  );
};

export default ActivateFranchisePaymentModal;
