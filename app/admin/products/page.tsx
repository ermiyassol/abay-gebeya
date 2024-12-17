"use client";

import AdminLayout from "@/components/mainLayout/admin";
import { ProductForm } from "@/components/ui/forms/ProductForm";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { AdminProductsTable } from "@/components/ui/table/AdminProductsTable";
import {
  getAllProducts,
  updateProductFeatured,
} from "@/app/actions/abay-gebeya/products";
import { DataPagination } from "@/components/ui/pagination/DataPagination";
import { AdminProductItem } from "@/components/ui/cards/AdminProductItem";
import { LoadingSpinner } from "@/components/ui/loading-spinner/LoadingSpinner";
import { GetQueryParams, GetResponseType } from "@/types/next-auth";
import { queryParamsStarter } from "@/utils/constants";

export default function Products() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<GetResponseType>();
  const [isLoading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [detail, setDetail] = useState();
  const [searchKey, setSearchKey] = useState("");
  const [params, setParams] = useState<GetQueryParams>(queryParamsStarter);

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

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    fetchData();
    setOpen(false);
  };

  const handleCancel = () => {
    setDetail(undefined);
    setEditMode(false);
    setOpen(false);
  };

  const onEdit = (data: any) => {
    console.log("ONEDIT - ", data);
    setDetail(data);
    setEditMode(true);
    setOpen(true);
  };

  const onFeaturedChange = async (id: string, value: boolean) => {
    setLoading(true);
    await updateProductFeatured(id, value);
    fetchData();
  };

  return (
    <AdminLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      {open && <ProductForm
        handleCancel={handleCancel}
        handleOk={handleOk}
        open={open}
        editMode={editMode}
        initialValue={detail!}
      />}

      <div className="px-10 space-y-2 mt-3">
        <div className="flex justify-between w-full">
          <h3 className="w-[158px] h-[22px] text-left font-mona-sans font-semibold text-[23px] leading-[22px] text-[#535353] flex-none order-0 flex-grow-0">
            Products
          </h3>
          <div className="space-x-2">
            <Input
              className="w-64"
              placeholder="Search For Products"
              value={searchKey}
              prefix={<SearchOutlined className="opacity-40" />}
              onChange={(event: any) => {
                const value = event.target.value;
                setSearchKey(value);
                onChangeParams({search: value})
              }}
            />
            <Button
              onClick={showModal}
              className="rounded-md"
              type="primary"
              icon={<PlusOutlined />}
              />
          </div>
        </div>

        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <>
            <div className="grid grid-cols-3 gap-2 px-10 pt-5">
              {data?.content.map((itm, index) => (
                <div key={index} className="shadow-md">
                  <AdminProductItem
                    onEdit={onEdit}
                    width="full"
                    data={itm}
                    onFeaturedChange={onFeaturedChange}
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
      </div>
    </AdminLayout>
  );
}
