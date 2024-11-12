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
import AddCompanyForm from "@/components/forms/companies/AddNewCompanyForm";

const AddCompanyModal = ({ open, onOpenChange, mode, manager }: any) => {
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
                {currentMode === "add" ? "Add Company" : "Update company"}
              </DialogTitle>
              {currentMode === "view" && (
                <Button size="sm" onClick={() => setCurrentMode("edit")}>
                  Edit <Pencil className="w-3.5 h-3.5 ml-2" />
                </Button>
              )}
            </div>
            <DialogDescription className="!dark:text-farmacieLightGray">
              {currentMode === "add"
                ? "Add company to the list of companies"
                : "Update the company name in the list"}
            </DialogDescription>
          </DialogHeader>
          <AddCompanyForm mode={currentMode} manager={manager} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddCompanyModal;
