import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { nutrientData } from "@/constant/data";

const NutrientContentModal = ({ open, onOpenChange }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl h-[90vh] lg:h-[95vh] overflow-y-auto scrollbar-custom">
        <DialogHeader className="pt-8">
          <DialogTitle className="text-primary text-xl font-bold">
            Nutrient Content Instruction
          </DialogTitle>
          <DialogDescription className="!dark:text-farmacieLightGray py-4">
            <div className="space-y-6 mt-6">
              {nutrientData.map((cropData, index) => (
                <div key={index} className="space-y-3">
                  <h3 className="text-lg font-semibold text-primary">
                    {cropData.crop}
                  </h3>
                  <div className="bg-neutral-100 dark:bg-neutral-800 rounded-lg p-4 shadow-md">
                    <table className="w-full text-left">
                      <thead>
                        <tr>
                          <th className="pb-2 font-medium text-sm">Property</th>
                          <th className="pb-2 font-medium text-sm">Value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cropData.contents.map((content, idx) => (
                          <tr
                            key={idx}
                            className="border-t border-neutral-300 dark:border-neutral-700"
                          >
                            <td className="py-2">{content.label}</td>
                            <td className="py-2">{content.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NutrientContentModal;
