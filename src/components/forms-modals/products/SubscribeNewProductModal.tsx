import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import FilterSubscribedProductsForm from "@/components/forms/products/FilterSubscribedProductsForm";

const FilterProductSubscribeModal = ({ open, onOpenChange, onSubmit }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl font-bold">
            Filter
          </DialogTitle>
        </DialogHeader>
        <FilterSubscribedProductsForm onSubmit={onSubmit} />
      </DialogContent>
    </Dialog>
  );
};

export default FilterProductSubscribeModal;
