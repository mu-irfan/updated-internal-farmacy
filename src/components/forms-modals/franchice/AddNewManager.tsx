import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddManagerForm from "@/components/forms/franchice/AddNewManagerForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";

const AddManagerModal = ({
  open,
  onOpenChange,
  mode,
  manager,
  showInsList,
}: any) => {
  const [currentMode, setCurrentMode] = useState(mode);

  useEffect(() => {
    if (open && mode !== "add") {
      setCurrentMode("view");
    }
  }, [open, mode]);
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
          <DialogHeader
            className={cn(
              currentMode === "view"
                ? "flex flex-row items-center justify-between mt-8"
                : ""
            )}
          >
            <DialogTitle className="text-primary text-xl font-bold">
              {currentMode === "add" ? " Add New Manager" : "Manager Details"}
            </DialogTitle>
            {currentMode === "view" && (
              <Button size="sm" onClick={() => setCurrentMode("edit")}>
                Edit <Pencil className="w-3.5 h-3.5 ml-2" />
              </Button>
            )}
            {currentMode === "add" && (
              <DialogDescription className="!dark:text-farmacieLightGray">
                This manager has the access to franchise you assign on farmacie
              </DialogDescription>
            )}
          </DialogHeader>
          <AddManagerForm
            mode={currentMode}
            manager={manager}
            showInsList={showInsList}
            onClose={onOpenChange}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddManagerModal;
