import {
  createCompany,
  deleteCompany,
  getAllCompaniesList,
  getCompaniesStats,
  updateCompany,
} from "@/api/company/companies";
import { getAllCompaniesUserList } from "@/api/company/companiesUser";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useGetAllCompanies = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allCompaniesList", token],
    queryFn: () => getAllCompaniesList(token),
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

export const useGetCompaniesStats = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["companiesStats", token],
    queryFn: () => getCompaniesStats(token),
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

export const useGetAllCompaniesUsers = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allCompaniesUserList", token],
    queryFn: () => getAllCompaniesUserList(token),
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

export const useCreateCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createCompany(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allCompaniesUserList",
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

export const useUpdateCompany = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => updateCompany(data, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allCompaniesList", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteCompany = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: any) => deleteCompany(name, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allCompaniesUserList",
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
