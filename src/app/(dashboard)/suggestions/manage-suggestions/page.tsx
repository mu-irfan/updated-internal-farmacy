"use client";
import React, { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Button } from "@/components/ui/button";
import { Ban, Check } from "lucide-react";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import QueryResponsesModal from "@/components/forms-modals/suggestions/QueryResponses";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { Toaster } from "react-hot-toast";
import {
  useGetAllTickets,
  useQueryResponseViewed,
} from "@/hooks/apis/useSuggestions";

const ManageSuggestions = () => {
  const { token } = useContextConsumer();
  const [isQueryResponsesModalOpen, setQueryResponsesModalOpen] =
    useState(false);
  const [currentQueryUuid, setCurrentQueryUuid] = useState<string | null>(null);

  //
  const { data: queries, isLoading: loading } = useGetAllTickets(token);
  const { mutate: responseViewed } = useQueryResponseViewed(token);

  const handleView = (suggestion: any) => {
    setQueryResponsesModalOpen(true);
    setCurrentQueryUuid(suggestion.uuid);
    responseViewed(suggestion.uuid);
  };

  const suggestionsColumns: {
    Header: string;
    accessor: SuggestionsColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    {
      Header: "Date",
      accessor: "createdAt",
      Cell: ({ row }: any) =>
        row.original.createdAt.toString().split("T")[0] || "N/A",
    },
    {
      Header: "Query",
      accessor: "first_query",
      Cell: ({ row }: any) => (
        <div
          className="w-40 overflow-hidden text-ellipsis whitespace-nowrap"
          title={row.original.first_query}
        >
          {row.original.first_query}
        </div>
      ),
    },
    {
      Header: "Response",
      accessor: "responded",
      Cell: ({ row }: any) =>
        row.original.responded ? (
          <Check className="text-primary" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5" />
        ),
    },
    {
      Header: "Viewed",
      accessor: "query_viewed",
      Cell: ({ row }: any) =>
        row.original.query_viewed ? (
          <Check className="text-primary" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5" />
        ),
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex justify-end gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            View
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Toaster />
      <DashboardLayout>
        <Header title="Responses" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Responses of your suggestion and quries
        </p>
        {loading ? (
          <SkeletonCard className="w-full h-80" />
        ) : queries?.data && queries?.data?.length > 0 ? (
          <DataTable
            columns={suggestionsColumns}
            data={queries.data as SuggestionsTableActionRow[]}
            paginate={queries?.data?.length > 10}
            extendWidth
          />
        ) : (
          <NoData message="No Data Available" />
        )}
      </DashboardLayout>
      <QueryResponsesModal
        open={isQueryResponsesModalOpen}
        onOpenChange={setQueryResponsesModalOpen}
        currentQueryUuid={currentQueryUuid}
      />
    </>
  );
};

export default ManageSuggestions;
