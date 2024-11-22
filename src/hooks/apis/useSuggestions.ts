import {
  createFurtherQuery,
  createQuery,
  getAllQueries,
  getQueriesChats,
  getSuggestionsStats,
  queryResponseViewed,
} from "@/api/suggestions";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetSuggestionsStats = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["suggestionsStats", token],
    queryFn: () => getSuggestionsStats(token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useCreateTicket = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createQuery(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["alTickets", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetAllTickets = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["alTickets", token],
    queryFn: () => getAllQueries(token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useGetTicketsChats = (uuid: any, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["alTicketsChats", token],
    queryFn: () => getQueriesChats(uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
    staleTime: 0,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useQueryResponseViewed = (token: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => queryResponseViewed(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: any }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["alTickets", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useCreateFurtherQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createFurtherQuery(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "alTicketsChats",
          variables.token,
        ] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
