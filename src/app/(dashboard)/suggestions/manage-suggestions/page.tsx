"use client";
import React, { useState } from "react";
import DashboardLayout from "../../dashboard-layout";
import { Button } from "@/components/ui/button";
import { Ban, Check, Trash } from "lucide-react";
import DataTable from "@/components/Table/DataTable";
import Header from "@/components/Header";
import QueryResponsesModal from "@/components/forms-modals/suggestions/QueryResponses";
import {
  useDeleteQuery,
  useGetAllTickets,
  useQueryResponseViewed,
} from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import NoData from "@/components/alerts/NoData";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import { SkeletonCard } from "@/components/SkeletonLoader";
import { Toaster } from "react-hot-toast";
import { suggestionsData } from "@/constant/data";

const ManageSuggestions = () => {
  const { token } = useContextConsumer();
  const [isQueryResponsesModalOpen, setQueryResponsesModalOpen] =
    useState(false);
  const [currentQueryUuid, setCurrentQueryUuid] = useState<string | null>(null);

  //
  const { data: queries, isLoading: loading } = useGetAllTickets(token);
  const { mutate: deleteQuery, isPending: deletingQuery } =
    useDeleteQuery(token);
  const { mutate: responseViewed, isPending: viewing } =
    useQueryResponseViewed(token);

  const handleView = (suggestion: any) => {
    setQueryResponsesModalOpen(true);
    setCurrentQueryUuid(suggestion.uuid);
    responseViewed(suggestion.uuid);
  };

  const handleDelete = async (suggestionId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Query?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteQuery(suggestionId);
    }
  };

  const suggestionsColumns: {
    Header: string;
    accessor: SuggestionsColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Date", accessor: "date" },
    {
      Header: "Query",
      accessor: "query",
      Cell: ({ row }: any) => (
        <div
          className="w-40 overflow-hidden text-ellipsis whitespace-nowrap"
          title={row.original.query}
        >
          {row.original.query}
        </div>
      ),
    },
    {
      Header: "Response",
      accessor: "response",
      Cell: ({ row }: any) =>
        row.original.response ? (
          <Check className="text-primary" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5" />
        ),
    },
    {
      Header: "Viewed",
      accessor: "viewed",
      Cell: ({ row }: any) =>
        row.original.viewed ? (
          <Check className="text-primary" />
        ) : (
          <Ban className="text-yellow-500 w-5 h-5" />
        ),
    },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
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
        {/* {loading ? (
          <SkeletonCard className="w-full h-80" />
        ) : queries?.data && queries?.data?.length > 0 ? (
          <DataTable
            columns={suggestionsColumns}
            // data={queries.data as SuggestionsTableActionRow[]}
            data={suggestionsData as SuggestionsTableActionRow[]}
            extendWidth
          />
        ) : (
          <NoData message="No Data Available" />
        )} */}
        <DataTable
          columns={suggestionsColumns}
          // data={queries.data as SuggestionsTableActionRow[]}
          data={suggestionsData as SuggestionsTableActionRow[]}
          extendWidth
        />
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
