import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import ForgotPasswordForm from "@/components/forms/auth/ForgotPasswordForm";

const ForgotPasswordModal = ({ open, onOpenChange }: any) => {
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl font-bold">
              Forgot Password
            </DialogTitle>
            <DialogDescription className="!dark:text-farmacieLightGray">
              Enter Email to reset your password
            </DialogDescription>
          </DialogHeader>
          <ForgotPasswordForm onClose={onOpenChange} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ForgotPasswordModal;
