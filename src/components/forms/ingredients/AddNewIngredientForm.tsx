import React, { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LabelInputContainer from "../LabelInputContainer";
import { useCreateIngredient, useUpdateIngredient } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { Plus, Trash } from "lucide-react";
import { addIngredientListFormSchema } from "@/schemas/validation/validationSchema";

const AddIngredientForm = ({
  ingredient,
  mode,
  onClose,
}: {
  ingredient: any;
  mode: "add" | "view" | "edit";
  onClose: () => void;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();

  //
  const { mutate: addIngredient, isPending: loading } = useCreateIngredient();
  const { mutate: updateIngredient, isPending: updating } =
    useUpdateIngredient(token);

  const form = useForm<AddIngredientFormData>({
    resolver: zodResolver(addIngredientListFormSchema),
    defaultValues: { ingredients: [""] },
    shouldUnregister: true,
  });

  const { reset } = form;

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  useEffect(() => {
    if (ingredient) {
      reset({
        ingredients: [ingredient.ingredient_name],
      });
    }
  }, [ingredient, reset]);

  useEffect(() => {
    if (mode === "add" && fields.length === 0) append("");
  }, [fields, append, mode]);

  const onSubmit = (data: AddIngredientFormData) => {
    if (mode === "add") {
      const ingredients = data.ingredients.filter((name) => name.trim() !== "");
      addIngredient(
        { data: { ingredients }, token },
        {
          onSuccess: (log) => {
            if (log?.success) onClose();
          },
        }
      );
    } else if (mode === "edit") {
      const updatedData = {
        ingredient: ingredient.ingredient_name,
        updatedIngredient: data.ingredients[0],
      };
      updateIngredient(
        { data: updatedData },
        {
          onSuccess: (log) => {
            if (log?.success) {
              onClose();
            }
          },
        }
      );
    }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="flex flex-col md:flex-row items-center gap-3 mb-4"
            >
              <LabelInputContainer>
                <Label
                  htmlFor={`ingredient_${index}`}
                  className="dark:text-farmacieGrey"
                >
                  Ingredient Name
                </Label>
                <FormField
                  control={form.control}
                  name={`ingredients.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Enter active ingredient name"
                          type="text"
                          {...field}
                          className="outline-none focus:border-primary"
                          disabled={isViewMode}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </LabelInputContainer>
              {mode === "add" && fields.length > 1 && (
                <Button
                  size="icon"
                  className="bg-red-500 hover:bg-red-600 text-black mt-5"
                  type="button"
                  onClick={() => remove(index)}
                  disabled={isViewMode}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              )}
              {index === fields.length - 1 && mode === "add" && (
                <Button
                  size="icon"
                  className="bg-primary text-farmacieWhite mt-5"
                  type="button"
                  onClick={() => append("")}
                  disabled={isViewMode}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
          <Button
            className="w-full text-white font-medium mt-4"
            type="submit"
            disabled={isViewMode || loading}
          >
            {mode === "add"
              ? "Submit"
              : loading
              ? "Creating..."
              : updating
              ? "Updating..."
              : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddIngredientForm;
