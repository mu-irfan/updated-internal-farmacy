// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormMessage,
// } from "@/components/ui/form";
// import { addManagerFormSchema } from "@/schemas/validation/validationSchema";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import LabelInputContainer from "../LabelInputContainer";
// import { useCreateManager, useUpdateManager } from "@/hooks/useDataFetch";
// import { useContextConsumer } from "@/context/Context";
// import { Toaster } from "react-hot-toast";
// import { Plus, Trash } from "lucide-react";
// import useCompanyDynamicFields from "@/hooks/useAddCompanyDynamicFields";

// const AddIngredientForm = ({
//   manager,
//   mode,
// }: {
//   showInsList?: boolean;
//   manager: any;
//   mode: "add" | "view" | "edit";
// }) => {
//   const isViewMode = mode === "view";
//   const { token } = useContextConsumer();
//   const { inputFields, handleAddField, handleDeleteField } =
//     useCompanyDynamicFields(0);

//   //
//   const { mutate: addManager, isPending: loading } = useCreateManager();
//   const { mutate: updateManager, isPending: updating } =
//     useUpdateManager(token);

//   const form = useForm<z.infer<typeof addManagerFormSchema>>({
//     resolver: zodResolver(addManagerFormSchema),
//     defaultValues: {
//       full_name: "",
//     },
//   });

//   const { reset } = form;
//   useEffect(() => {
//     if (manager) {
//       reset({
//         full_name: manager.full_name || "",
//       });
//     }
//   }, [manager, reset]);

//   const onSubmit = (data: z.infer<typeof addManagerFormSchema>) => {
//     if (mode === "add") {
//       addManager({ data, token });
//     } else if (mode === "edit") {
//       const updatedData = { ...data, uuid: manager?.uuid };
//       updateManager(updatedData);
//     }
//   };

//   return (
//     <>
//       <Toaster />
//       <Form {...form}>
//         <form className="2" onSubmit={form.handleSubmit(onSubmit)}>
//           <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
//             <LabelInputContainer>
//               <Label htmlFor="full_name" className="dark:text-farmacieGrey">
//                 Ingredient Name
//               </Label>
//               <FormField
//                 control={form.control}
//                 name="full_name"
//                 render={({ field }) => (
//                   <FormItem>
//                     <FormControl>
//                       <Input
//                         placeholder="Enter active ingredient name"
//                         type="text"
//                         id="full_name"
//                         className="outline-none focus:border-primary"
//                         {...field}
//                         disabled={isViewMode}
//                       />
//                     </FormControl>
//                     <FormMessage />
//                   </FormItem>
//                 )}
//               />
//             </LabelInputContainer>
//             {mode === "add" && (
//               <div className="flex items-center gap-2">
//                 <Button
//                   size="icon"
//                   className="bg-primary text-farmacieWhite mt-5"
//                   type="button"
//                   onClick={handleAddField}
//                   disabled={isViewMode}
//                 >
//                   <Plus className="w-4 h-4" />
//                 </Button>
//               </div>
//             )}
//           </div>
//           {inputFields.map((_, index) => (
//             <div
//               key={index}
//               className="flex flex-col md:flex-row items-center gap-3 mb-4"
//             >
//               <LabelInputContainer>
//                 <Label htmlFor="full_name" className="dark:text-farmacieGrey">
//                   Ingredient Name
//                 </Label>
//                 <FormField
//                   control={form.control}
//                   name="full_name"
//                   render={({ field }) => (
//                     <FormItem>
//                       <FormControl>
//                         <Input
//                           placeholder="Enter active ingredient name"
//                           type="text"
//                           id="full_name"
//                           className="outline-none focus:border-primary"
//                           {...field}
//                           disabled={isViewMode}
//                         />
//                       </FormControl>
//                       <FormMessage />
//                     </FormItem>
//                   )}
//                 />
//               </LabelInputContainer>
//               <div className="flex items-center gap-2">
//                 <Button
//                   size="icon"
//                   className="bg-red-500 hover:bg-red-600 text-black mt-5"
//                   type="button"
//                   onClick={() => handleDeleteField(index)}
//                   disabled={isViewMode}
//                 >
//                   <Trash className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>
//           ))}
//           <Button
//             className="w-full text-white font-medium mt-4"
//             type="submit"
//             disabled={isViewMode || loading || updating}
//           >
//             {mode === "add" ? "Submit" : "Update"}
//           </Button>
//           <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-6 h-[1px] w-full" />
//         </form>
//       </Form>
//     </>
//   );
// };

// export default AddIngredientForm;

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
import { useCreateIngredient } from "@/hooks/useDataFetch";
import { useContextConsumer } from "@/context/Context";
import { Plus, Trash } from "lucide-react";
import { addIngredientListFormSchema } from "@/schemas/validation/validationSchema";

const AddIngredientForm = ({
  company,
  mode,
  onClose,
}: {
  company: any;
  mode: "add" | "view" | "edit";
  onClose: () => void;
}) => {
  const isViewMode = mode === "view";
  const { token } = useContextConsumer();

  //
  const { mutate: addIngredient, isPending: loading } = useCreateIngredient();

  const form = useForm<AddIngredientFormData>({
    resolver: zodResolver(addIngredientListFormSchema),
    defaultValues: { ingredients: [""] },
    shouldUnregister: true,
  });

  const { reset } = form;

  useEffect(() => {
    if (company) {
      reset({
        ingredients: [company.company],
      });
    }
  }, [company, reset]);

  const { fields, append, remove } = useFieldArray({
    name: "ingredients",
    control: form.control,
  });

  useEffect(() => {
    if (fields.length === 0) append("");
  }, [fields, append]);

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
                  htmlFor={`company_${index}`}
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
            {mode === "add" ? "Submit" : "Update"}
          </Button>
        </form>
      </Form>
    </>
  );
};

export default AddIngredientForm;
