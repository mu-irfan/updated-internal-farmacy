import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilterSeedForm from "@/components/forms/seeds/FilterSeedForm";

const FilterSeedModal = ({ open, onOpenChange, onSubmit }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Filter Seed
          </DialogTitle>
        </DialogHeader>
        <FilterSeedForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default FilterSeedModal;
