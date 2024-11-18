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
  createFurtherQuery,
  createQuery,
  getAllQueries,
  getQueriesChats,
  getSuggestionsStats,
  queryResponseViewed,
} from "@/api/suggestions";
import {
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getProduct,
  getProductStats,
  updateProduct,
  verifyProduct,
} from "@/api/products";
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
import { getCompanyProfile, updateCompanyProfile } from "@/api/companyProfile";
import {
  createSeedTrail,
  getAllSeedTrail,
  getSeedTrailStages,
  getSeedTrailStagesFormFields,
  updateSeedTrailStages,
} from "@/api/seedTrail";
import {
  createCompany,
  deleteCompany,
  getAllCompaniesList,
  getCompaniesStats,
  updateCompany,
} from "@/api/company/companies";
import {
  deleteRegisterCompany,
  getAllCompaniesUserList,
  getCompaniesFranchiseStats,
  getCompanyFranchises,
  getRegisterCompaniesList,
  verifyCompany,
} from "@/api/company/companiesUser";
import {
  createIngredient,
  deleteIngredient,
  getAllIngredientsList,
  updateIngredient,
} from "@/api/ingredients";
import {
  createCrop,
  deleteCrop,
  getAllCrops,
  getCrop,
  getCropStats,
  updateCrop,
} from "@/api/crop/crop";
import {
  createVarietyStage,
  deleteCropVariety,
  deleteVarietyStage,
  getAllCropVarieties,
  getCropVariety,
  getVarietyStage,
  updateVarietyStage,
} from "@/api/crop/varietyStages";
import {
  createCropStage,
  deleteCropStage,
  getAllCropStages,
  getCropStage,
} from "@/api/crop/cropStages";
import { createCropVariety, updateCropVariety } from "@/api/crop/cropVariety";

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

export const useGetAllProducts = (token: string, filters: any) => {
  return useQuery<any, Error>({
    queryKey: ["allProducts", token, filters],
    queryFn: () => getAllProducts(token, filters),
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

export const useVerifyProduct = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ uuid }: { uuid: any }) => verifyProduct(uuid, token),
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

// companies
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

export const useGetAllIngredients = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allIngredientsList", token],
    queryFn: () => getAllIngredientsList(token),
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

// ingredients
export const useCreateIngredient = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createIngredient(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allIngredientsList",
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

export const useUpdateIngredient = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data }: { data: any }) => updateIngredient(data, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allIngredientsList", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteIngredient = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: any) => deleteIngredient(name, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allIngredientsList",
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

// Crops  API's Functions
export const useGetCropStats = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["seedsStats", token],
    queryFn: () => getCropStats(token),
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

export const useCreateCrop = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createCrop(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allCrops", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useGetAllCrops = (token: string) => {
  return useQuery<any, Error>({
    queryKey: ["allCrops", token],
    queryFn: () => getAllCrops(token),
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

export const useGetCrop = (crop_name: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["crop", crop_name, token],
    queryFn: () => getCrop(crop_name, token),
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
    enabled: !!crop_name,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useUpdateCrop = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, crop_name }: { data: any; crop_name: any }) =>
      updateCrop(data, crop_name, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["allCrops", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteCrop = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteCrop(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["allCrops", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// variety stages functions
export const useCreateVarietyStage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createVarietyStage(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "allVarietyStages",
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

export const useGetCropAllStages = (token: string, filters: any) => {
  return useQuery<any, Error>({
    queryKey: ["cropAllStages", token, filters],
    queryFn: () => getAllCropStages(token, filters),
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

// crop stages functions
export const useGetCropStage = (crop_name: string, token: string) => {
  return useQuery<any, Error>({
    queryKey: ["cropStage", crop_name, token],
    queryFn: () => getCropStage(crop_name, token),
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
    enabled: !!crop_name,
    staleTime: 60000,
    refetchOnWindowFocus: false,
  } as UseQueryOptions);
};

export const useCreateCropStage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }: { data: any; token: string }) =>
      createCropStage(data, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["cropStage", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

export const useUpdateCropStage = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, uuid }: { data: any; uuid: any }) =>
      updateCrop(data, uuid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["cropStage", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteVarietyStage = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteVarietyStage(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries([
          "cropAllStages",
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

export const useUpdateVarietyStage = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, uid }: { data: any; uid: any }) =>
      updateVarietyStage(data, uid, token),
    onSuccess: (data: any) => {
      if (data?.success) {
        toast.success(data.message);
        queryClient.invalidateQueries(["cropAllStages", token] as any);
      } else {
        toast.error(data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message);
    },
  });
};

export const useDeleteCropStage = (token: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (uuid: any) => deleteCropStage(uuid, token),
    onSuccess: (data: any, variables: { data: any; token: string }) => {
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["cropStage", variables.token] as any);
      } else {
        toast.error(data?.response?.data?.message);
      }
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message);
    },
  });
};

// varaiteis API's Functions

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

// crop varieties
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
