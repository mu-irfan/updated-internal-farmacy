"use client";

import React, { useEffect, useState } from "react";
import DashboardLayout from "@/app/(dashboard)/dashboard-layout";
import NoData from "@/components/alerts/NoData";
import { SweetAlert } from "@/components/alerts/SweetAlert";
import FranchiseStats from "@/components/forms-modals/franchice/FranchiseStats";
import AddProductModal from "@/components/forms-modals/products/AddProduct";
import AddSeedModal from "@/components/forms-modals/seeds/AddSeed";
import DataTable from "@/components/Table/DataTable";
import { Button } from "@/components/ui/button";
import { useContextConsumer } from "@/context/Context";
import {
  useDeleteSubscribedProduct,
  useDeleteSubscribedSeed,
  useGetAllFranchises,
  useGetProduct,
  useGetSeed,
  useGetSubscribedProduct,
  useGetSubscribedSeed,
} from "@/hooks/useDataFetch";
import { MoveLeft, ShieldCheck, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import ActivateFranchiseModal from "@/components/forms-modals/franchice/ActivateFranchise";

const FranchiseDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { token } = useContextConsumer();
  const [isViewSeedsModalOpen, setViewSeedsModalOpen] =
    useState<boolean>(false);
  const [selectedSeedToView, setSelectedSeedToView] = useState({});
  const [isViewProductModalOpen, setViewProductModalOpen] =
    useState<boolean>(false);
  const [selectedProductToView, setSelectedProductToView] = useState({});
  const [isActivateModalOpen, setActivateModalOpen] = useState<boolean>(false);
  const [visibleTable, setVisibleTable] = useState<"seeds" | "products" | null>(
    null
  );
  const [currentProductUuid, setCurrentProductUuid] = useState<string | null>(
    null
  );

  // franchise
  const { data: franchises, isLoading: loading } = useGetAllFranchises(token);
  const { data: subscribedProduct, isLoading: subsribedProductLoading } =
    useGetSubscribedProduct(params.id!, token);
  const { data: subscribedSeed, isLoading: subsribedSeedLoading } =
    useGetSubscribedSeed(params.id!, token);
  const { mutate: deleteSubscribedProduct, isPending: deletingSubscribedSeed } =
    useDeleteSubscribedProduct(token, params.id);
  const { mutate: deleteSubscribedSeed, isPending: deletingSubscribedProduct } =
    useDeleteSubscribedSeed(token, params.id);
  const { data: productDetails, isLoading: productLoading } = useGetProduct(
    currentProductUuid!,
    token
  );
  const { data: seedDetails, isLoading: seedLoading } = useGetSeed(
    currentProductUuid!,
    token
  );

  useEffect(() => {
    if (productDetails?.success && productDetails.data) {
      setSelectedProductToView(productDetails.data);
    }
  }, [productDetails]);

  useEffect(() => {
    if (seedDetails?.success && seedDetails.data) {
      setSelectedSeedToView(seedDetails.data);
    }
  }, [seedDetails]);

  const subscribedProductData = subscribedProduct?.data?.map((item: any) => {
    const { product } = item;
    return {
      uuid: item.uuid,
      product_uuid: product?.uuid,
      category: product?.category,
      company_fk: product?.company_fk,
      name: product?.name,
      sub_category: product?.sub_category,
    };
  });

  const subscribedSeedData = subscribedSeed?.data?.map((item: any) => {
    const { seed } = item;
    return {
      uuid: item.uuid,
      seed_uuid: seed?.uuid,
      crop_category: seed?.crop_category,
      company_fk: seed?.company_fk,
      seed_variety_name: seed?.seed_variety_name,
      crop: seed?.crop,
    };
  });

  const selectedFranchise = franchises?.data?.find(
    (franchise: any) => franchise.uuid === params.id
  );

  if (!selectedFranchise) {
    return <p>Franchise not found.</p>;
  }

  const handleView = (seed: any) => {
    setViewSeedsModalOpen(true);
    setCurrentProductUuid(seed.seed_uuid);
  };

  const handleProductView = (product: any) => {
    setViewProductModalOpen(true);
    setCurrentProductUuid(product.product_uuid);
  };

  const handleDelete = async (seedId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Subscribed Seed?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteSubscribedSeed(seedId);
    }
  };

  const handleProductDelete = async (productId: any) => {
    const isConfirmed = await SweetAlert(
      "Delete Subscribed Product?",
      "",
      "warning",
      "Yes, delete it!",
      "#15803D"
    );
    if (isConfirmed) {
      deleteSubscribedProduct(productId);
    }
  };

  const seedColumns: {
    Header: string;
    accessor: SeedColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Seed Variety Name", accessor: "seed_variety_name" },
    { Header: "Brand Name", accessor: "company_fk" },
    { Header: "Crop Category", accessor: "crop_category" },
    { Header: "Crop", accessor: "crop" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            View
          </Button>
          <Button
            size="icon"
            onClick={() => handleDelete(row.original.uuid)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deletingSubscribedSeed}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  const productColumns: {
    Header: string;
    accessor: ProductColumnAccessor;
    Cell?: ({ row }: any) => JSX.Element;
  }[] = [
    { Header: "Product Name", accessor: "name" },
    { Header: "Brand Name", accessor: "company_fk" },
    { Header: "Category", accessor: "category" },
    { Header: "Sub Category", accessor: "sub_category" },
    {
      Header: "",
      accessor: "actions",
      Cell: ({ row }: any) => (
        <div className="flex items-center gap-4">
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleProductView(row.original)}
            className="border-primary bg-primary/10 w-20 text-primary tracking-wider hover:text-primary/80"
          >
            View
          </Button>
          <Button
            size="icon"
            onClick={() => handleProductDelete(row.original.uuid)}
            className="bg-red-400 hover:bg-red-500 text-black"
            disabled={deletingSubscribedProduct}
          >
            <Trash className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <DashboardLayout>
        <div className="md:flex items-center justify-between">
          <h2 className="text-3xl font-bold text-primary">Franchise Details</h2>
          <h3
            className="text-md lg:pl-2 font-normal py-2 dark:text-gray-400 cursor-pointer"
            onClick={() => router.back()}
          >
            <MoveLeft className="inline mr-1 mb-1 w-6 h-6" />
            Back
          </h3>
        </div>
        <p className="text-md lg:pl-2 font-normal text-left pb-3 dark:text-farmacieGrey">
          Subscribe the products and seeds to make them available on farmacie in
          this franchise
        </p>
        <div className="md:flex justify-between">
          <div className="flex items-center gap-3">
            <Button
              disabled={!selectedFranchise.active}
              className="font-medium bg-yellow-500 hover:bg-yellow-600 text-black w-60 !disabled:cursor-not-allowed"
              onClick={() =>
                router.push(
                  `/franchises/manage-franchises/franchise/${params.id}/subscribe-new-product`
                )
              }
              type="button"
            >
              Subscribe New Products
            </Button>
            <Button
              variant="outline"
              className="font-medium border-primary dark:border-yellow-400 mt-2 md:mt-0 w-60 !disabled:cursor-not-allowed"
              type="button"
              onClick={() =>
                router.push(
                  `/franchises/manage-franchises/franchise/${params.id}/subscribe-new-seeds`
                )
              }
              disabled={!selectedFranchise.active}
            >
              Subscribe New Seeds
            </Button>
          </div>
          {!selectedFranchise.active && (
            <Button
              className="font-medium"
              onClick={() => setActivateModalOpen(true)}
            >
              Activate <ShieldCheck className="w-5 h-5 ml-1.5" />
            </Button>
          )}
        </div>
        <FranchiseStats
          franchiseStats={selectedFranchise}
          totalSubscribedProduct={subscribedProduct?.data?.length}
          totalSubscribedSeed={subscribedSeed?.data?.length}
        />
        <div className="flex items-center justify-end gap-3 mb-8">
          <Button
            variant="outline"
            className="font-medium border-primary dark:border-green-500 mt-2 md:mt-0 w-60"
            type="button"
            disabled={!selectedFranchise.active}
            onClick={() => setVisibleTable("seeds")}
          >
            View Subscribed Seeds
          </Button>
          <Button
            className="font-medium w-60"
            disabled={!selectedFranchise.active}
            onClick={() => setVisibleTable("products")}
          >
            View Subscribed Products
          </Button>
        </div>
        {visibleTable === "seeds" &&
        subscribedSeedData &&
        subscribedSeedData.length > 0 ? (
          <DataTable
            columns={seedColumns}
            data={subscribedSeedData as SeedTableRow[]}
          />
        ) : (
          visibleTable === "seeds" && (
            <NoData message="No Subscribe Seeds Available..." />
          )
        )}
        {visibleTable === "products" &&
        subscribedProductData &&
        subscribedProductData.length > 0 ? (
          <DataTable
            columns={productColumns}
            data={subscribedProductData as ProductTableRow[]}
            paginate
          />
        ) : (
          visibleTable === "products" && (
            <NoData message="No Subscribe Products Available..." />
          )
        )}
        <AddSeedModal
          open={isViewSeedsModalOpen}
          onOpenChange={setViewSeedsModalOpen}
          mode="view"
          seedData={selectedSeedToView}
        />
        <AddProductModal
          open={isViewProductModalOpen}
          onOpenChange={setViewProductModalOpen}
          mode="view"
          productData={selectedProductToView}
        />
      </DashboardLayout>
      <ActivateFranchiseModal
        open={isActivateModalOpen}
        onOpenChange={setActivateModalOpen}
        franchise={selectedFranchise}
      />
    </>
  );
};

export default FranchiseDetails;
