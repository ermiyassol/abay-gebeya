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
import { getUsers } from "@/app/actions/abay-gebeya/users";
import { AdminUsersTable } from "@/components/ui/table/AdminUsersTable";
import { getAllOrders } from "@/app/actions/abay-gebeya/orders";
import { AdminOrdersTable } from "@/components/ui/table/AdminOrdersTable";
import { DataPagination } from "@/components/ui/pagination/DataPagination";
import { GetQueryParams, GetResponseType } from "@/types/next-auth";
import { queryParamsStarter } from "@/utils/constants";

export default function Orders() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [orders, setOrders] = useState();
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<GetResponseType>();
  const [searchKey, setSearchKey] = useState("");
  const [params, setParams] = useState<GetQueryParams>(queryParamsStarter);

  const fetchOrders = async () => {
    setLoading(true);
    const response = await getAllOrders();
    const content = response.data.content.map((itm: any) => {
      return {
        id: itm.id,
        productId: itm.product.id,
        productName: itm.product.name,
        requestedQuantity: itm.requestedQuantity,
        status: itm.status,
        firstname: itm.user.firstname,
        lastname: itm.user.lastname,
        phoneNumber: itm.user.phoneNumber,
      };
    });
    setData({ ...response.data, content });
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [params]);

  const onChangeParams = (newParams: any) =>
    setParams((prevParams) => {
      return { ...prevParams, ...newParams };
    });

  return (
    <AdminLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <div className="px-3 md:px-10 space-y-2 mt-3">
        <div className="flex justify-between w-full">
          <h3 className="w-[158px] h-[22px] text-left font-mona-sans font-semibold text-[23px] leading-[22px] text-[#535353] flex-none order-0 flex-grow-0">
            Order History
          </h3>
          <Input
            className="w-64"
            placeholder="Search For Orders"
            value={searchKey}
            prefix={<SearchOutlined className="opacity-40" />}
            onChange={(event: any) => {
              const value = event.target.value;
              setSearchKey(value);
              onChangeParams({ search: value });
            }}
          />
        </div>
        {isLoading && <LoadingSpinner />}
        {!isLoading && (
          <AdminOrdersTable data={data?.content!} refreshData={fetchOrders} />
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
