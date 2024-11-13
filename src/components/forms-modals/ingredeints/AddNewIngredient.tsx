import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import AddIngredientForm from "@/components/forms/ingredients/AddNewIngredientForm";

const AddIngredientModal = ({ open, onOpenChange, mode, manager }: any) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    if (open && mode !== "add") {
      setCurrentMode("view");
    }
  }, [open, mode]);

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-md lg:max-w-lg">
          <DialogHeader>
            <div
              className={cn(
                currentMode === "view"
                  ? "flex flex-row items-center justify-between mt-8"
                  : ""
              )}
            >
              <DialogTitle className="text-primary text-xl font-bold">
                {currentMode === "add"
                  ? "Add active ingredient"
                  : "Update Active Ingredient"}
              </DialogTitle>
              {currentMode === "view" && (
                <Button size="sm" onClick={() => setCurrentMode("edit")}>
                  Edit <Pencil className="w-3.5 h-3.5 ml-2" />
                </Button>
              )}
            </div>
            <DialogDescription className="!dark:text-farmacieLightGray">
              {currentMode === "add"
                ? "Add active ingredient to the list of ingredients"
                : "Update the active ingredient name in the list"}
            </DialogDescription>
          </DialogHeader>
          <AddIngredientForm
            mode={currentMode}
            company={manager}
            onClose={onOpenChange}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddIngredientModal;
