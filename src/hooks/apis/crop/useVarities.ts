import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

import {
  alreadyInSimulatorCropVariety,
  createCropVariety,
  getAllCropVarietyList,
  updateCropVariety,
} from "@/api/crop/cropVariety";

export const useCreateCropVariety = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createCropVariety(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allCropVarieties",
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

export const useGetAllCropsVarititesList = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allCropVarieties", token],
    queryFn: () => getAllCropVarietyList(token),
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

export const useUpdateCropVariety = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, variety_eng }: { data: any; variety_eng: any }) =>
      updateCropVariety(data, variety_eng, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allCropVarieties", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useCropVarietyInSimulator = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, variety_eng }: { data: any; variety_eng: any }) =>
      alreadyInSimulatorCropVariety(data, variety_eng, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allCropVarieties", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
