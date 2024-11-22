import { deleteCropVariety, getAllCropVarieties } from "@/api/crop/cropVariety";
import { getCropVariety, getVarietyStage } from "@/api/crop/varietyStages";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllCropsVaritites = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allCropVaraities", token],
    queryFn: () => getAllCropVarieties(token),
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

export const useDeleteCropVariety = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteCropVariety(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allCropVaraities",
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

export const useGetCropVariety = (variety_eng: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["variety", variety_eng, token],
    queryFn: () => getCropVariety(variety_eng, token),
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
    enabled: !!variety_eng,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useGetVarietyStage = (uuid: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["varietyStage", uuid, token],
    queryFn: () => getVarietyStage(uuid, token),
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
