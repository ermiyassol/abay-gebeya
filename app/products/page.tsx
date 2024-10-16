"use client";

import MainLayout from "@/components/mainLayout/main";
import { ProductItem } from "@/components/ui/cards/ProductItem";
import { DataPagination } from "@/components/ui/pagination/DataPagination";

export default function Dashboard() {
  return (
    <MainLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <div className="grid grid-cols-4 gap-2 px-10 pt-5">
        <div className="shadow-md">
          <ProductItem width="full" />
        </div>
        <div className="shadow-md">
          <ProductItem width="full" />
        </div>
        <div className="shadow-md">
          <ProductItem width="full" />
        </div>
        <div className="shadow-md">
          <ProductItem width="full" />
        </div>
        <div className="shadow-md">
          <ProductItem width="full" />
        </div>
      </div>
      <div className="flex justify-center">
        <DataPagination />
      </div>
    </MainLayout>
  );
}
