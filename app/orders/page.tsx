"use client";

import MainLayout from "@/components/mainLayout/main";
import { OrdersTable } from "@/components/ui/table/OrdersTable";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export default function Dashboard() {
  return (
    <MainLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <div className="px-10 space-y-2 mt-3">
        <div className="flex justify-between w-full">
          <h3 className="w-[158px] h-[22px] text-left font-mona-sans font-semibold text-[23px] leading-[22px] text-[#535353] flex-none order-0 flex-grow-0">
            Order History
          </h3>
          <Input
            className="w-64"
            placeholder="Search For Orders"
            prefix={<SearchOutlined className="opacity-40" />}
          />
        </div>

        <OrdersTable />
      </div>
    </MainLayout>
  );
}
