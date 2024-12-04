"use client";
import React, { useMemo, useState } from "react";
import DashboardLayout from "../dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Trash } from "lucide-react";
import Header from "@/components/Header";
import { Input } from "@/components/ui/input";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import AddIngredientModal from "@/components/forms-modals/ingredeints/AddNewIngredient";
import { useContextConsumer } from "@/context/Context";
import { debounce } from "lodash";
import { SkeletonCard } from "@/components/SkeletonLoader";
import NoData from "@/components/alerts/NoData";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import { Toaster } from "react-hot-toast";
import {
  useDeleteIngredient,
  useGetAllIngredients,
} from "@/hooks/apis/useIngredients";

const Ingredients = () => {
  const { token } = useContextConsumer();
  const [isAddIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isViewIngredientModalOpen, setViewIngredientModalOpen] =
    useState<boolean>(false);
  const [selectedIngredientToView, setSelectedIngredientToView] = useState({});

  const { data: ingredeintsList, isLoading: ingredeintsListLoading } =
    useGetAllIngredients(token);
  const { mutate: deleteIngredient, isPending: deletingIngredient } =
    useDeleteIngredient(token);

  const handleSearchChange = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  const filterIngredientData = useMemo(() => {
    if (!ingredeintsList?.data || !ingredeintsList?.data?.ingredients)
      return [];
    return ingredeintsList?.data?.ingredients?.filter((ingredient: any) =>
      ingredient.ingredient_name
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [ingredeintsList, searchQuery]);

  const handleView = (ingredient: any) => {
    setViewIngredientModalOpen(true);
    setSelectedIngredientToView(ingredient);
  };

  const handleDelete = async (ingredient: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Ingredient?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteIngredient(ingredient.ingredient_name);
    }
  };

  const IngredientColumns: {
    Header: string;
    accessor: IngredientListColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Ingredient Name", accessor: "ingredient_name" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex justify-end gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            Edit
          </Button>
          <Button
            size="icon"
            onClick={() => handleDelete(row.original)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deletingIngredient}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <Toaster />
      <DashboardLayout>
        <Header title="Ingredient List" />
        <p className="text-md lg:pl-2 font-normal pb-4 text-left dark:text-farmacieGrey">
          Find or add the new companies in the company list
        </p>
        <Card className="w-full py-6 rounded-xl text-center bg-primary/10 mb-8">
          <CardContent className="p-0 px-6">
            <div className="flex justify-between items-center gap-2">
              <div className="relative max-w-md lg:max-w-lg w-full">
                <Input
                  placeholder="Search ingredient by name..."
                  type="text"
                  className="outline-none border py-5 border-primary rounded-full pl-12 w-full"
                  onChange={(e) => handleSearchChange(e.target.value)}
                />
                <Search className="absolute left-3.5 -translate-y-1/2 bottom-0.5 w-5 h-5 text-gray-400" />
              </div>
              <Button
                className="text-farmacieWhite font-medium"
                type="button"
                onClick={() => setAddIngredientModalOpen((prev) => !prev)}
              >
                Add New Ingredient
              </Button>
            </div>
          </CardContent>
        </Card>
        <div className="grid lg:grid-cols-4 grid-cols-1 gap-4 xl:gap-14">
          <div className="w-full lg:col-span-3">
            {ingredeintsListLoading ? (
              <SkeletonCard className="w-full h-80" />
            ) : ingredeintsList?.data?.ingredients &&
              ingredeintsList?.data?.ingredients?.length > 0 ? (
              <DataTable
                columns={IngredientColumns}
                data={filterIngredientData as ingredientListTableRow[]}
                extendWidth
                paginate
              />
            ) : (
              <NoData message="No Data Available" />
            )}
          </div>
          <Card className="relative flex flex-col justify-center py-5 lg:col-span-1 rounded-xl text-center bg-primary/10 transition-all delay-75 group/number dark:shadow-2xl">
            <CardHeader className="space-y-0 pb-2">
              <CardTitle className="text-3xl lg:text-6xl font-bold text-primary dark:text-green-500">
                {ingredeintsList?.data?.count || "00"}
              </CardTitle>
            </CardHeader>
            <CardContent className="dark:text-farmacieGrey">
              <div className="text-sm font-medium lg:pt-4">
                Total ingredients in list
              </div>
            </CardContent>
            <div className="absolute top-2 lg:-top-8 left-1/2 transform -translate-x-1/2 w-full mx-auto h-96 bg-primary/5 dark:bg-primary/10 rounded blur-3xl z-0" />
          </Card>
        </div>
      </DashboardLayout>
      <AddIngredientModal
        open={isAddIngredientModalOpen}
        onOpenChange={setAddIngredientModalOpen}
        mode="add"
      />
      <AddIngredientModal
        open={isViewIngredientModalOpen}
        onOpenChange={setViewIngredientModalOpen}
        mode="view"
        ingredient={selectedIngredientToView}
      />
    </>
  );
};

export default Ingredients;
