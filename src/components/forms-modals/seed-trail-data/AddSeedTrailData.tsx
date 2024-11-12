import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import AddTrailDataForm from "@/components/forms/seed-trail-data/AddTrailDataForm";
import UpdateTrailDataForm from "@/components/forms/seed-trail-data/UpdateTrailDataForm";

const AddSeedTrailDataModal: React.FC<any> = ({
  open,
  onOpenChange,
  mode,
  selectedTrailStages,
  cropName,
  trailUuid,
}) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    if (open && mode !== "add") {
      setCurrentMode("view");
    }
  }, [open, mode]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-3xl h-[60vh] lg:h-[65vh] overflow-y-auto scrollbar-custom">
        <DialogHeader
          className={cn(
            currentMode === "view"
              ? "flex flex-row items-center justify-between mt-8"
              : ""
          )}
        >
          <DialogTitle className="text-primary text-xl font-bold pt-8">
            {currentMode === "add"
              ? "Add Seed Trial Data"
              : "Update Seed Trial Data"}
          </DialogTitle>
          {currentMode === "add" && (
            <DialogDescription className="!dark:text-farmacieLightGray">
              Add seed trial data so that it can also be the part recomended
              crop list to the farmer
            </DialogDescription>
          )}
        </DialogHeader>
        {mode === "add" ? (
          <AddTrailDataForm
            mode={currentMode}
            onClose={onOpenChange}
            cropName={cropName}
          />
        ) : (
          <UpdateTrailDataForm
            selectedTrailStages={selectedTrailStages}
            onClose={onOpenChange}
            trailUuid={trailUuid}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddSeedTrailDataModal;
