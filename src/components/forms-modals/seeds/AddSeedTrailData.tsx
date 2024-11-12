import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddSeedTrailDataForm from "@/components/forms/seeds/AddSeedTrailDataForm";

const listItems = [
  "This is the general form to cover all the crops.",
  "Fill all the required fields that are relevant to your crop seeds and covers the complete crop trials.",
  "Leave irrelevant fields empty.",
];

const AddSeedTrialDataModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
        <DialogHeader className="pt-8">
          <DialogTitle className="text-primary text-xl font-bold">
            Add Seed Trial Data
          </DialogTitle>
          <DialogDescription className="!dark:text-farmacieLightGray py-4">
            Add seed trial data so that it can also be the part recomended crop
            list to the farmer
            <ul className="list-disc text-xs pl-10 space-y-3 pt-8 text-yellow-600">
              {listItems.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </DialogDescription>
        </DialogHeader>
        <AddSeedTrailDataForm />
      </DialogContent>
    </Dialog>
  );
};

export default AddSeedTrialDataModal;
