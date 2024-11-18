import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import VerifyCompanyForm from "@/components/forms/companies/VerifyCompanyForm";

const VerifyCompanyModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Verify Company
          </DialogTitle>
          <DialogDescription className="dark:text-farmacieGrey">
            Verify Company
          </DialogDescription>
        </DialogHeader>
        <VerifyCompanyForm onClose={onOpenChange} />
      </DialogContent>
    </Dialog>
  );
};

export default VerifyCompanyModal;
