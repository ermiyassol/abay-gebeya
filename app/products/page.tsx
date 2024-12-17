"use client";

import MainLayout from "@/components/mainLayout/main";
import { ProductItem } from "@/components/ui/cards/ProductItem";
import { DataPagination } from "@/components/ui/pagination/DataPagination";
import { useEffect, useState } from "react";
import { getAllProducts } from "../actions/abay-gebeya/products";
import { ProductRequest } from "@/components/ui/modal/ProductRequestModal";
import { LoadingSpinner } from "@/components/ui/loading-spinner/LoadingSpinner";
import { GetQueryParams, GetResponseType } from "@/types/next-auth";
import { queryParamsStarter } from "@/utils/constants";

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<GetResponseType>();
  const [params, setParams] = useState<GetQueryParams>(queryParamsStarter);
  // const [searchKey, setSearchKey] = useState("");

  const fetchData = async () => {
    setLoading(true);
    const response = await getAllProducts(params);
    setData(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const onChangeParams = (newParams: any) =>
    setParams((prevParams) => {
      return { ...prevParams, ...newParams };
    });

  const showModal = (item: any) => {
    console.log("Product - ", item);
    setDetail(item);
    setOpen(true);
  };

  const handleOk = () => {
    fetchData();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <MainLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      {open && (
        <ProductRequest
          handleCancel={handleCancel}
          handleOk={handleOk}
          open={open}
          data={detail!}
        />
      )}
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:px-10 px-4 pt-5">
            {data?.content?.map((itm, index) => (
              <div key={index} className="shadow-md">
                <ProductItem
                  width="full"
                  onItemSelected={showModal}
                  data={itm}
                />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <DataPagination
              totalElements={data?.totalElements!}
              current={data?.pageable.pageNumber!}
              onPageChange={onChangeParams}
            />
          </div>
        </>
      )}
    </MainLayout>
  );
}
