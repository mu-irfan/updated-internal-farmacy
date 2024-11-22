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
import { loginAccountFormSchema } from "@/schemas/validation/validationSchema";
import LabelInputContainer from "../LabelInputContainer";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";
import { MoveRight } from "lucide-react";
import { Toaster } from "react-hot-toast";
import ForgotPasswordModal from "@/components/forms-modals/auth/ForgotPassword";
import { useLoginCompany } from "@/hooks/apis/useUserAuth";

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isForgotPasswordModalOpen, setForgotPasswordModalOpen] =
    useState<boolean>(false);
  const { mutate: companyLogin, isPending: loading } = useLoginCompany();

  const form = useForm<z.infer<typeof loginAccountFormSchema>>({
    resolver: zodResolver(loginAccountFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof loginAccountFormSchema>) => {
    companyLogin(data);
  };

  return (
    <>
      <Toaster />
      <Form {...form}>
        <form className="py-6" onSubmit={form.handleSubmit(onSubmit)}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Email</Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Enter Email Address"
                      type="text"
                      id="email"
                      className="outline-none focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="relative">
                  <FormControl>
                    <Input
                      placeholder="••••••••"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="outline-none focus:border-primary"
                      {...field}
                    />
                  </FormControl>
                  {!showPassword ? (
                    <Icon
                      name="Eye"
                      size={18}
                      className={cn(
                        "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                        !!form.formState.errors.password
                          ? "top-[20%]"
                          : "top-[32%]"
                      )}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <Icon
                      name="EyeOff"
                      size={20}
                      className={cn(
                        "absolute right-3.5 -translate-y-1/2 cursor-pointer text-gray-400",
                        !!form.formState.errors.password
                          ? "top-[20%]"
                          : "top-[32%]"
                      )}
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          </LabelInputContainer>
          <p
            className="dark:text-farmacieGrayModalText text-sm max-w-sm py-4 cursor-pointer underline"
            onClick={() => setForgotPasswordModalOpen((prev) => !prev)}
          >
            Forget Password ?
          </p>
          <Button className="w-full text-white font-medium" type="submit">
            {loading ? (
              "Submitting..."
            ) : (
              <>
                Login <MoveRight className="w-5 h-5 ml-1" />
              </>
            )}{" "}
          </Button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
        </form>
      </Form>
      <ForgotPasswordModal
        open={isForgotPasswordModalOpen}
        onOpenChange={setForgotPasswordModalOpen}
      />
    </>
  );
};

export default LoginForm;
