import {
  deleteRegisterCompany,
  getRegisterCompaniesList,
  verifyCompany,
} from "@/api/company/companiesUser";
import {
  getCompaniesFranchiseStats,
  getCompanyFranchises,
} from "@/api/company/franchises";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

export const useRegisterCompaniesUsers = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allRegisterCompaniesUsersList", token],
    queryFn: () => getRegisterCompaniesList(token),
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

export const useDeleteRegisterCompany = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteRegisterCompany(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allRegisterCompaniesUsersList",
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

export const useGetCompanyFranchiseStats = (company: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["companyFranchiseStats", company, token],
    queryFn: () => getCompaniesFranchiseStats(company, token),
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

export const useGetAllCompanyFranchises = (company: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["companyFranchises", company, token],
    queryFn: () => getCompanyFranchises(company, token),
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

export const useVerifyCompany = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      verifyCompany(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allRegisterCompaniesUsersList",
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
