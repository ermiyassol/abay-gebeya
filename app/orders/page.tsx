"use client";

import MainLayout from "@/components/mainLayout/main";
import { OrdersTable } from "@/components/ui/table/OrdersTable";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { getUserOrders, getUsersOrder } from "../actions/abay-gebeya/users";
import { DataPagination } from "@/components/ui/pagination/DataPagination";
import { LoadingSpinner } from "@/components/ui/loading-spinner/LoadingSpinner";
import { GetQueryParams, GetResponseType } from "@/types/next-auth";
import { queryParamsStarter } from "@/utils/constants";

export default function Dashboard() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<GetResponseType>();
  const [searchKey, setSearchKey] = useState("");
  const [params, setParams] = useState<GetQueryParams>(queryParamsStarter);

  const fetchData = async () => {
    setLoading(true);
    const response = await getUsersOrder();
      const content = response.data.content.map((itm: any) => {
        return {
          id: itm.id,
          productId: itm.product.id,
          productName: itm.product.name,
          requestedQuantity: itm.requestedQuantity,
          status: itm.status,
          createdAt: itm.updatedAt,
        };
      });
      setData({ ...response.data, content });
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [params]);

  const onChangeParams = (newParams: any) =>
    setParams((prevParams) => {
      return { ...prevParams, ...newParams };
    });

  return (
    <MainLayout
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
        {!isLoading && <OrdersTable data={data?.content!} refreshData={fetchData} />}
        <div className="flex justify-center">
          <DataPagination
            totalElements={data?.totalElements!}
            current={data?.pageable.pageNumber!}
            onPageChange={onChangeParams}
          />
        </div>
      </div>
    </MainLayout>
  );
}
