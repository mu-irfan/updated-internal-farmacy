import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddFranchiceForm from "../../forms/franchice/AddFranchiseForm";
import { Button } from "@/components/ui/button";
import AddManagerModal from "./AddNewManager";
import { useContextConsumer } from "@/context/Context";

const AddFranchiseModal = ({ open, onOpenChange, franchise }: any) => {
  const [isAddNewManagerModalOpen, setAddNewManagerModalOpen] = useState(false);

  const { mode, setMode } = useContextConsumer();

  useEffect(() => {
    if (open && mode !== "add") {
      setMode("edit");
    }
  }, [open, mode]);
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
          <DialogHeader className="mt-8 mb-4 md:flex-row items-center justify-between">
            <div>
              <DialogTitle className="text-primary text-xl font-bold">
                {mode !== "add" ? "Update Franchise" : "Add New Franchise"}
              </DialogTitle>
              <DialogDescription className="!dark:text-farmacieLightGray">
                {mode === "add"
                  ? "Add the franchise to expand the distribution network on the farmacie"
                  : "Update franchise details and handling manager"}
              </DialogDescription>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="dark:border-yellow-400 dark:text-yellow-500 mt-2 md:mt-0 focus:outline-none focus:border-yellow-400"
              type="button"
              onClick={() => setAddNewManagerModalOpen((prev) => !prev)}
            >
              Add New Manger
            </Button>
          </DialogHeader>
          <AddFranchiceForm franchise={franchise} onClose={onOpenChange} />
        </DialogContent>
      </Dialog>
      <AddManagerModal
        open={isAddNewManagerModalOpen}
        onOpenChange={setAddNewManagerModalOpen}
        showInsList
        mode="add"
      />
    </>
  );
};

export default AddFranchiseModal;
