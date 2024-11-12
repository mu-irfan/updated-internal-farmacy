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
import LabelInputContainer from "../LabelInputContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import {
  useForgotPassword,
  useForgotPasswordOtpVerify,
  useForgotPasswordResetPassword,
} from "@/hooks/useDataFetch";
import {
  emailSchema,
  otpSchema,
  resetPasswordSchema,
} from "@/schemas/validation/validationSchema";

const ForgotPasswordForm = ({ onClose }: any) => {
  const [stage, setStage] = useState<"email" | "otp" | "reset">("email");
  const { mutate: forgotPassword, isPending: loading } = useForgotPassword();
  const { mutate: verifyOtp, isPending: verifyingOtp } =
    useForgotPasswordOtpVerify();
  const { mutate: resetPassword, isPending: resettingPassword } =
    useForgotPasswordResetPassword();

  // get dynamic schema
  const forgotPasswordFormSchema =
    stage === "email"
      ? emailSchema
      : stage === "otp"
      ? otpSchema
      : resetPasswordSchema;

  //get dynamic field
  const defaultValues =
    stage === "email"
      ? { email: "" }
      : stage === "otp"
      ? { email: "", otp: "" }
      : { email: "", newPassword: "", confirmPassword: "" };

  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordFormSchema),
    defaultValues,
  });

  const onSubmit = (data: z.infer<typeof forgotPasswordFormSchema>) => {
    if (stage === "email") {
      forgotPassword(data, {
        onSuccess: (log) => {
          if (log?.success) {
            setStage("otp");
          }
        },
      });
    } else if (stage === "otp") {
      verifyOtp(data, {
        onSuccess: (log) => {
          if (log?.success) {
            setStage("reset");
          }
        },
      });
    } else if (stage === "reset") {
      resetPassword(data, {
        onSuccess: (log) => {
          if (log?.success) {
            onClose((prev: any) => !prev);
          }
        },
      });
    }
  };

  return (
    <>
      <Form {...form}>
        <form className="py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email"> Email</Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Email to reset password"
                      type="email"
                      id="email"
                      className="outline-none focus:border-primary"
                      {...field}
                      disabled={stage !== "email"}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          {stage === "otp" && (
            <LabelInputContainer className="mb-4">
              <Label htmlFor="otp">OTP</Label>
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter OTP"
                        type="text"
                        id="otp"
                        className="outline-none focus:border-primary"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </LabelInputContainer>
          )}

          {stage === "reset" && (
            <>
              <LabelInputContainer className="mb-4">
                <Label htmlFor="newPassword">New Password</Label>
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter New Password"
                          type="password"
                          id="newPassword"
                          className="outline-none focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>

              <LabelInputContainer className="mb-4">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Confirm New Password"
                          type="password"
                          id="confirmPassword"
                          className="outline-none focus:border-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
            </>
          )}

          <Button className="w-full text-white font-medium" type="submit">
            {loading || verifyingOtp || resettingPassword ? (
              "Submitting..."
            ) : (
              <>
                Submit <MoveRight className="w-5 h-5 ml-1" />
              </>
            )}{" "}
          </Button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
