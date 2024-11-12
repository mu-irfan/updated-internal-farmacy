import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { crops } from "@/constant/data";
import LabelInputContainer from "@/components/forms/LabelInputContainer";
import { Label } from "@/components/ui/label";
import { addCropSelectionFormSchema } from "@/schemas/validation/validationSchema";
import AddSeedTrailDataModal from "./AddSeedTrailData";

const AddCropSelectionSeedTrailDataModal: React.FC<any> = ({
  open,
  onOpenChange,
}) => {
  const [isAddSeedTrailDataModalOpen, setAddSeedTrailDataModalOpen] =
    useState(false);
  const [selectedCrop, setselectedCrop] = useState("");

  const form = useForm<z.infer<typeof addCropSelectionFormSchema>>({
    resolver: zodResolver(addCropSelectionFormSchema),
    defaultValues: {
      crop: "",
    },
  });

  const onSubmit = (data: z.infer<typeof addCropSelectionFormSchema>) => {
    setAddSeedTrailDataModalOpen((prev: any) => !prev);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-[80vw] md:max-w-xl h-[50vh] lg:h-[55vh] overflow-y-auto scrollbar-custom">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl font-bold pt-8">
              Add Seed Trial Data
            </DialogTitle>

            <DialogDescription className="!dark:text-farmacieLightGray">
              Add seed trial data so that it can also be the part recomended
              crop list to the farmer
            </DialogDescription>
          </DialogHeader>
          <ul className="list-disc text-xs pl-8 space-y-2 text-yellow-600">
            <li>
              If you are the seed producer, Kindly provide the seed trial data.
            </li>
            <li>
              Trial data in needed to check the seed suitability and gdd
              calculation.
            </li>
            <li>
              These seed will be recommended to farmers on the basis of their
              suitability.
            </li>
            <li>
              These seeds will become the part of suitable crop list in
              agronomics app.
            </li>
            <li>
              It is recommended to add{" "}
              <strong className="text-white font-normal">
                {" "}
                2 to 3 trials{" "}
              </strong>{" "}
              of different location.
            </li>
          </ul>
          <Form {...form}>
            <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
              <LabelInputContainer>
                <Label htmlFor="crop" className="dark:text-farmacieGrey">
                  Crop
                </Label>
                <FormField
                  control={form.control}
                  name="crop"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Select
                          onValueChange={(value) => {
                            setselectedCrop(value);
                            field.onChange(value);
                          }}
                        >
                          <SelectTrigger className="p-3 py-5 dark:text-farmaciePlaceholderMuted rounded-md border border-estateLightGray focus:outline-none focus:ring-1 focus:ring-primary disabled:bg-primary/20">
                            <SelectValue placeholder="Select crop" />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl">
                            <SelectGroup>
                              <SelectLabel>crop</SelectLabel>
                              {crops.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
              <Button
                className="w-full text-white font-medium mt-4"
                type="submit"
              >
                Add Trial Data
              </Button>
              <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      <AddSeedTrailDataModal
        open={isAddSeedTrailDataModalOpen}
        onOpenChange={setAddSeedTrailDataModalOpen}
        mode="add"
        cropName={selectedCrop}
      />
    </>
  );
};

export default AddCropSelectionSeedTrailDataModal;
