import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import AddSeedTrialDataModal from "./AddSeedTrailData";

const listItems = [
  "If you are the seed producer, kindly provide the seed trial data.",
  "Trial data is needed to check the seed suitability and GDD calculation.",
  "These seeds will be recommended to farmers on the basis of their suitability.",
  "These seeds will become part of the suitable crop list in the agronomics app.",
  <>
    It is recommended to add{" "}
    <strong className="dark:text-farmacieGrey">2 to 3</strong> trials of
    different locations.
  </>,
];

const AddSeedTrialDataInstructionModal = ({ open, onOpenChange }: any) => {
  const [isAddSeedTrailDataModalOpen, setAddSeedTrailDataModalOpen] =
    useState(false);
  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
          <DialogHeader className="pt-8">
            <DialogTitle className="text-primary text-xl font-bold">
              Add Seed Trial Data
            </DialogTitle>
            <DialogDescription className="!dark:text-farmacieLightGray py-4">
              Add seed trial data so that it can also be the part recomended
              crop list to the farmer
              <ul className="list-disc text-xs pl-10 space-y-3 py-8 text-yellow-600">
                {listItems.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <Button
                className="w-full text-white font-medium my-2"
                onClick={() => setAddSeedTrailDataModalOpen(true)}
                type="button"
              >
                Add Trial Data
              </Button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <AddSeedTrialDataModal
        open={isAddSeedTrailDataModalOpen}
        onOpenChange={setAddSeedTrailDataModalOpen}
      />
    </>
  );
};

export default AddSeedTrialDataInstructionModal;
