import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AddCropToSimulatorForm from "@/components/forms/seeds/AddCropToSimulatorForm";
import AddStagesToSimulatorForm from "@/components/forms/seeds/AddStagesToSimulatorForm";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import AddVarietyToSimulatorForm from "@/components/forms/seeds/AddVarietyToSimulatorForm";

const AddSeedToSimulatorModal = ({
  open,
  onOpenChange,
  viewCrop,
  viewVariety,
  viewStage,
  selectedItem,
  loading,
  mode,
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
        <DialogContent
          className={cn(
            "max-w-[80vw] md:max-w-xl lg:max-w-2xl h-[90vh] lg:h-[95vh] overflow-y-auto scrollbar-custom",
            viewCrop && "h-[50vh] !lg:h-fit"
          )}
        >
          <DialogHeader className="pt-8">
            <div
              className={cn(
                viewCrop || viewStage || viewVariety
                  ? "flex flex-row items-center justify-between"
                  : ""
              )}
            >
              <DialogTitle className="text-primary text-xl font-bold !py-0">
                {viewCrop
                  ? "Add Crop in Simulator"
                  : viewVariety
                  ? "Add Crop in Simulator"
                  : viewStage
                  ? "Add Stage in Simulator"
                  : "Add To Simulator"}
              </DialogTitle>
              {mode === "view" && (
                <Button size="sm" onClick={() => setCurrentMode("edit")}>
                  Edit <Pencil className="w-3.5 h-3.5 ml-2" />
                </Button>
              )}
            </div>

            <DialogDescription
              className={cn(
                "!dark:text-farmacieLightGray !py-0",
                viewCrop && "!py-4"
              )}
            >
              {viewCrop && (
                <AddCropToSimulatorForm
                  crop={selectedItem}
                  mode={currentMode}
                  onClose={onOpenChange}
                  loading={loading}
                />
              )}
              {viewVariety && (
                <AddVarietyToSimulatorForm
                  variety={selectedItem}
                  mode={currentMode}
                  onClose={onOpenChange}
                  loading={loading}
                />
              )}
              {viewStage && (
                <AddStagesToSimulatorForm
                  mode={currentMode}
                  stage={selectedItem}
                  onClose={onOpenChange}
                  loading={loading}
                />
              )}
            </DialogDescription>
            {!viewCrop && !viewVariety && !viewStage && (
              <DialogDescription className="!dark:text-farmacieLightGray py-4">
                <Tabs defaultValue="Crop">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="Crop">Crop</TabsTrigger>
                    <TabsTrigger value="Variety">Variety</TabsTrigger>
                    <TabsTrigger value="Stages">Stages</TabsTrigger>
                  </TabsList>
                  <TabsContent value="Crop">
                    <div className="py-3">
                      <h3 className="text-primary text-base font-bold py-4">
                        Add crop details
                      </h3>
                      <AddCropToSimulatorForm
                        mode={currentMode}
                        onClose={onOpenChange}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="Variety">
                    <div className="py-3">
                      <h3 className="text-primary text-base font-bold py-4">
                        Add variety details
                      </h3>
                      <AddVarietyToSimulatorForm
                        mode={currentMode}
                        onClose={onOpenChange}
                      />
                    </div>
                  </TabsContent>
                  <TabsContent value="Stages">
                    <div className="py-3">
                      <h3 className="text-primary text-base font-bold py-4">
                        Add stages details
                      </h3>
                      <AddStagesToSimulatorForm
                        mode={currentMode}
                        onClose={onOpenChange}
                      />
                    </div>
                  </TabsContent>
                </Tabs>
                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
              </DialogDescription>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddSeedToSimulatorModal;
