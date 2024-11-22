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
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

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
