import {
  createIngredient,
  deleteIngredient,
  getAllIngredientsList,
  updateIngredient,
} from "@/api/ingredients";
import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from "@tanstack/react-query";
import toast from "react-hot-toast";

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
