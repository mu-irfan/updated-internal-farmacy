"use client";

import DashboardLayout from "../../dashboard-layout";
import Header from "@/components/Header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CropsFilterForm from "@/components/forms/crops/CropsFilterForm";
import VarietyFilterForm from "@/components/forms/crops/VarietyFilterForm";
import StagesFilterForm from "@/components/forms/crops/StagesFilterForm";

const ManageCrops = () => {
  return (
    <DashboardLayout>
      <Header title="Manage Crops" />
      <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
        Filter search and update the crops of global list
      </p>
      <Tabs defaultValue="Crop">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="Crop">Crop</TabsTrigger>
          <TabsTrigger value="Variety">Variety</TabsTrigger>
          <TabsTrigger value="Stages">Stages</TabsTrigger>
        </TabsList>
        <TabsContent value="Crop">
          <div className="py-3">
            <CropsFilterForm />
          </div>
        </TabsContent>
        <TabsContent value="Variety">
          <div className="py-3">
            <VarietyFilterForm />
          </div>
        </TabsContent>
        <TabsContent value="Stages">
          <div className="py-3">
            <StagesFilterForm />
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
};

export default ManageCrops;
