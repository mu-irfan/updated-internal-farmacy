import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilterVarietyForm from "@/components/forms/crops/FilterVarietyForm";

const FilterVarityModal = ({ open, onOpenChange, onSubmit }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Filter Variety
          </DialogTitle>
        </DialogHeader>
        <FilterVarietyForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default FilterVarityModal;
