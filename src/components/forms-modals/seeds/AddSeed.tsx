import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddSeedForm from "@/components/forms/seeds/AddSeedForm";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

const AddSeedModal = ({
  open,
  onOpenChange,
  mode,
  seedData,
  subscribe = false,
  currentFranchiseUuid,
  loading,
}: any) => {
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
            {currentMode === "add" ? "Add New Seed" : "Seed Details"}
          </DialogTitle>
          {currentMode === "view" && !subscribe && (
            <Button size="sm" onClick={() => setCurrentMode("edit")}>
              Edit <Pencil className="w-3.5 h-3.5 ml-2" />
            </Button>
          )}
          {currentMode === "add" && (
            <DialogDescription className="!dark:text-farmacieLightGray">
              This seed is added in the seed global list (a list containing all
              unique seeds, can be sold on farmacie)
            </DialogDescription>
          )}
        </DialogHeader>
        <AddSeedForm
          mode={currentMode}
          seed={seedData}
          subscribe={subscribe}
          currentFranchiseUuid={currentFranchiseUuid}
          onClose={onOpenChange}
          loading={loading}
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddSeedModal;
