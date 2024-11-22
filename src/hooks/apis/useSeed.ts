import {
  alreadyInSimulatorSeed,
  createSeed,
  deleteSeed,
  deleteSeedImage,
  getAllSeeds,
  getSeed,
  getSeedsStats,
  updateSeed,
} from "@/api/seeds";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetSeedsStats = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["seedsStats", token],
    queryFn: () => getSeedsStats(token),
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

export const useCreateSeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createSeed(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allSeeds", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetAllSeeds = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allSeeds", token],
    queryFn: () => getAllSeeds(token),
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

export const useGetSeed = (uuid: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["seed", uuid, token],
    queryFn: () => getSeed(uuid, token),
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
    enabled: !!uuid,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useUpdateSeed = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, uuid }: { data: any; uuid: any }) =>
      updateSeed(data, uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allSeeds", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useInSimulator = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, uuid }: { data: any; uuid: any }) =>
      alreadyInSimulatorSeed(data, uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allSeeds", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteSeedImage = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteSeedImage(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["seed", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useDeleteSeed = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteSeed(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allSeeds", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};
