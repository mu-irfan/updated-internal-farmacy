import { getAllSeedTrail, getSeedTrailStages } from "@/api/seedTrail";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllSeedTrails = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allSeedTrails", token],
    queryFn: () => getAllSeedTrail(token),
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

export const useGetAllSeedTrailsStages = (uuid: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allSeedTrailsStages", uuid, token],
    queryFn: () => getSeedTrailStages(uuid, token),
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
    enabled: !!uuid,
  } as UseQueryOptions);
};
