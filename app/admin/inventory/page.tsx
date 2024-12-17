"use client";

import AdminLayout from "@/components/mainLayout/admin";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { AdminInventoryTable } from "@/components/ui/table/AdminInventoryTable";
import { InventoryForm } from "@/components/ui/forms/InventoryForm";
import { getAllInventories } from "@/app/actions/abay-gebeya/inventories";
import { LoadingSpinner } from "@/components/ui/loading-spinner/LoadingSpinner";
import { DataPagination } from "@/components/ui/pagination/DataPagination";
import { GetQueryParams, GetResponseType } from "@/types/next-auth";
import { queryParamsStarter } from "@/utils/constants";

export default function Inventory() {
  // const router = useRouter();
  const [open, setOpen] = useState(false);
  // const [inventories, setInventories] = useState();
  const [isLoading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editDetail, setEditDetail] = useState();
  const [data, setData] = useState<GetResponseType>();
  const [searchKey, setSearchKey] = useState("");
  const [params, setParams] = useState<GetQueryParams>(queryParamsStarter);

  const fetchInventory = async () => {
    setLoading(true);
    const response = await getAllInventories();

      const content = response.data.content.map((itm: any) => {
        return {
          id: itm.id,
          price: itm.price,
          quantity: itm.quantity,
          vendorName: itm.vendorName,
          vendorPhoneNumber: itm.vendorPhoneNumber,
          productName: itm.product.name,
          productId: itm.product.id,
        };
      })

    setData({ ...response.data, content });
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, [params]);

  const onChangeParams = (newParams: any) =>
    setParams((prevParams) => {
      return { ...prevParams, ...newParams };
    });

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setEditMode(false);
    fetchInventory();
    setOpen(false);
  };

  const handleCancel = () => {
    console.log("ONCANCLE CALLED");
    setEditMode(false);
    setEditDetail(undefined);

    setOpen(false);
  };

  const onEdit = (detail: any) => {
    console.log("onEdit - ", detail);
    setEditDetail(detail);
    setEditMode(true);

    setOpen(true);
  };

  return (
    <AdminLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      {open && (
        <InventoryForm
          handleCancel={handleCancel}
          handleOk={handleOk}
          open={open}
          editMode={editMode}
          initialValue={editDetail}
        />
      )}
      <div className="px-3 md:px-10 space-y-2 mt-3">
        <div className="flex justify-between w-full">
          <h3 className="w-[158px] h-[22px] text-left font-mona-sans font-semibold text-[23px] leading-[22px] text-[#535353] flex-none order-0 flex-grow-0">
            Inventories
          </h3>
          <div className="space-x-2">
            <Input
              className="w-64"
              placeholder="Search For Inventories"
              value={searchKey}
            prefix={<SearchOutlined className="opacity-40" />}
            onChange={(event: any) => {
              const value = event.target.value;
              setSearchKey(value);
              onChangeParams({ search: value });
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
          <AdminInventoryTable
            onEdit={onEdit}
            data={data?.content!}
            refreshData={fetchInventory}
          />
        )}
        <div className="flex justify-center">
          <DataPagination
            totalElements={data?.totalElements!}
            current={data?.pageable.pageNumber!}
            onPageChange={onChangeParams}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
