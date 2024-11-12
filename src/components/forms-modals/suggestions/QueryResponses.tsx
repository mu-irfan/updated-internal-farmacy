import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Link from "next/link";
import Responses from "@/components/forms/suggestions/Responses";

const QueryResponsesModal = ({ open, onOpenChange, currentQueryUuid }: any) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw] md:max-w-xl lg:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex justify-between items-center text-primary pt-6">
            <span className="text-xl font-bold">Response</span>
            <div>
              <strong className="text-sm dark:text-farmacieGrey font-normal">
                Our email:
              </strong>
              <Link
                href="mailto:info@agronomics.pk"
                className="text-sm text-green-500 font-normal pl-2"
              >
                help@agronomics.pk
              </Link>
            </div>
          </DialogTitle>
          <DialogDescription className="!dark:text-farmacieLightGray">
            Response of your query we expect this would be helpful
          </DialogDescription>
          <div className="flex justify-between my-8 text-sm dark:text-farmacieLightGray font-light mt-4">
            <h2>Response</h2>
            <h2>Query</h2>
          </div>
        </DialogHeader>
        <Responses currentQueryUuid={currentQueryUuid} />
      </DialogContent>
    </Dialog>
  );
};

export default QueryResponsesModal;
