import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddProductForm from "@/components/forms/products/AddProductForm";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Pencil } from "lucide-react";

const AddProductModal: React.FC<AddProductModalProps> = ({
  open,
  onOpenChange,
  mode,
  productData,
  subscribe = false,
  currentFranchiseUuid,
  loading,
}) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    if (open && mode !== "add") {
      setCurrentMode("view");
    }
  }, [open, mode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl h-[90vh] lg:h-[95vh] overflow-y-auto scrollbar-custom">
        <DialogHeader
          className={cn(
            currentMode === "view"
              ? "flex flex-row items-center justify-between mt-8"
              : ""
          )}
        >
          <DialogTitle className="text-primary text-xl font-bold">
            {currentMode === "add" ? "Add New Product" : "Product Details"}
          </DialogTitle>
          {currentMode === "view" && !subscribe && (
            <Button size="sm" onClick={() => setCurrentMode("edit")}>
              Edit <Pencil className="w-3.5 h-3.5 ml-2" />
            </Button>
          )}
          {currentMode === "add" && (
            <DialogDescription className="!dark:text-farmacieLightGray">
              These products are added to the global list (a list containing all
              unique products that can be sold on farmacie).
            </DialogDescription>
          )}
        </DialogHeader>
        <AddProductForm
          mode={currentMode}
          productData={productData}
          subscribe={subscribe}
          currentFranchiseUuid={currentFranchiseUuid}
          onClose={onOpenChange}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
