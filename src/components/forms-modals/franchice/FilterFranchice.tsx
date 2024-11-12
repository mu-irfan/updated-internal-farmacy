import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilterFranchiceForm from "@/components/forms/franchice/FilterFranchiceForm";

const FilterFranchiceModal = ({ open, onOpenChange, onSubmit }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Filter Franchice
          </DialogTitle>
        </DialogHeader>
        <FilterFranchiceForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default FilterFranchiceModal;
