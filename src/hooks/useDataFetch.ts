import {
  forgotPassword,
  forgotPasswordOtpVerify,
  forgotPasswordResetPassword,
  loginCompany,
  registerCompany,
} from "@/api/auth";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "./useAuth";
import {
  createManager,
  deleteManager,
  getAllManagers,
  getManagerStats,
  updateManager,
} from "@/api/manager";
import {
  createFurtherQuery,
  createQuery,
  deleteQuery,
  getAllQueries,
  getQueriesChats,
  getSuggestionsStats,
  queryResponseViewed,
} from "@/api/suggestions";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAlActiveIngredient,
  getAllProducts,
  getProduct,
  getProductStats,
  updateProduct,
} from "@/api/products";
import {
  createSeed,
  deleteSeed,
  deleteSeedImage,
  getAllSeeds,
  getSeed,
  getSeedsStats,
  updateSeed,
} from "@/api/seeds";
import {
  createFranchise,
  deleteFranchise,
  getAllFranchises,
  getAllInActiveFranchise,
  getFranchisesStats,
  updateFranchise,
} from "@/api/franchises";
import {
  deleteSubscribedProduct,
  deleteSubscribedSeed,
  getAllUnSubProducts,
  getAllUnSubSeeds,
  getSubscribedProduct,
  getSubscribedSeed,
  getSubsribedsStats,
  subscribeProducts,
  subscribeSeeds,
} from "@/api/subscribe";
import { getCompanyProfile, updateCompanyProfile } from "@/api/companyProfile";
import { createBulkPayment, inquiryPayment } from "@/api/payment";
import {
  createSeedTrail,
  getAllSeedTrail,
  getSeedTrailStages,
  getSeedTrailStagesFormFields,
  updateSeedTrailStages,
} from "@/api/seedTrail";

export const useRegisterCompany = () => {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: RegisterCompanyPayload) => registerCompany(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        router.push("/");
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useLoginCompany = () => {
  const { loginCompanyAuth } = useAuth();
  return useMutation({
    mutationFn: (data: any) => loginCompany(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
        loginCompanyAuth(data?.data.accessToken, data?.data.refreshToken);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: any) => forgotPassword(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useForgotPasswordOtpVerify = () => {
  return useMutation({
    mutationFn: (data: any) => forgotPasswordOtpVerify(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useForgotPasswordResetPassword = () => {
  return useMutation({
    mutationFn: (data: any) => forgotPasswordResetPassword(data),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data?.message);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// managers API's Functions
export const useGetManagerStats = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["managerStats", token],
    queryFn: () => getManagerStats(token),
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

export const useCreateManager = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createManager(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allManagers", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetAllManagers = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allManagers", token],
    queryFn: () => getAllManagers(token),
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

export const useUpdateManager = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      updateManager(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allManagers", variables.token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteManager = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteManager(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allManagers", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// Suggestion  API's Functions
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

export const useDeleteQuery = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteQuery(uuid, token),
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

// Products  API's Functions
export const useGetProductStats = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["productStats", token],
    queryFn: () => getProductStats(token),
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

export const useGetAllProducts = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allProducts", token],
    queryFn: () => getAllProducts(token),
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

export const useGetAllActiveIngredients = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allActiveIngredients", token],
    queryFn: () => getAlActiveIngredient(token),
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

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createProduct(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allProducts", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetProduct = (uuid: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["product", uuid, token],
    queryFn: () => getProduct(uuid, token),
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

export const useUpdateProduct = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, uuid }: { data: any; uuid: any }) =>
      updateProduct(data, uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allProducts", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteProductImage = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteProductImage(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["product", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useDeleteProduct = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteProduct(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allProducts", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// Seeds  API's Functions
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

// Products  API's Functions

export const useGetFranchiseStats = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["franchiseStats", token],
    queryFn: () => getFranchisesStats(token),
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

export const useCreateFranchise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createFranchise(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allFranchises",
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

export const useGetAllFranchises = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allFranchises", token],
    queryFn: () => getAllFranchises(token),
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

export const useGetInActiveFranchises = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["inactiveFranchises", token],
    queryFn: () => getAllInActiveFranchise(token),
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

export const useDeleteFranchise = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteFranchise(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allFranchises",
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

export const useUpdateFranchise = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      updateFranchise(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries([
          "allFranchises",
          variables.token,
        ] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

// Subscribed Integrations Functions
export const useGetSubscribedProduct = (uuid: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["subsribedProduct", uuid, token],
    queryFn: () => getSubscribedProduct(uuid, token),
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

export const useGetSubscribedSeed = (uuid: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["subsribedSeed", uuid, token],
    queryFn: () => getSubscribedSeed(uuid, token),
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

export const useGetSubscribedStats = (uuid: string, token: string) => {
  return useQuery({
    queryKey: ["subsribedStats", uuid, token],
    queryFn: () => getSubsribedsStats(uuid, token),
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

export const useDeleteSubscribedProduct = (token: string, fk: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteSubscribedProduct(uuid, token, fk),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "subsribedProduct",
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

export const useDeleteSubscribedSeed = (token: string, fk: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteSubscribedSeed(uuid, token, fk),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "subsribedSeed",
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

export const useGetUnSubscribedProduct = (fk: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["unSubsribedProduct", fk, token],
    queryFn: () => getAllUnSubProducts(fk, token),
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
    enabled: !!fk,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useGetUnSubscribedSeed = (fk: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["unSubsribedSeed", fk, token],
    queryFn: () => getAllUnSubSeeds(fk, token),
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
    enabled: !!fk,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useSubscribeProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      subscribeProducts(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "unSubsribedProduct",
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

export const useSubscribeSeed = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      subscribeSeeds(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "unSubsribedSeed",
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

// company profile
export const useGetCompanyProfile = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["companyProfile", token],
    queryFn: () => getCompanyProfile(token),
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

export const useUpdateCompanyProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      updateCompanyProfile(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries([
          "companyProfile",
          variables.token,
        ] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

// payment
export const useCreateBulkPayment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createBulkPayment(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allFranchises",
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

export const useGetInquiryPayment = (token: string) => {
  return useQuery({
    queryKey: ["", token],
    queryFn: () => inquiryPayment(token),
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
    enabled: false,
  } as UseQueryOptions);
};

// seed trail

export const useCreateSeedTrail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createSeedTrail(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allSeedTrails",
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

export const useGetAllSeedTrailsStagesFormFields = (
  crop_name: string,
  token: string
) => {
  return useQuery<any, Error>({
    queryKey: ["allSeedTrails", crop_name, token],
    queryFn: () => getSeedTrailStagesFormFields(crop_name, token),
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

export const useUpdateSeedTrail = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      data,
      token,
      uuid,
    }: {
      data: any;
      token: string;
      uuid: string;
    }) => updateSeedTrailStages(data, token, uuid),
    onSuccess: (
      data: any,
      variables: { data: any; token: string; uuid: string }
    ) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries([
          "allSeedTrailsStages",
          variables.token,
        ] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};
