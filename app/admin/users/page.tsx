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

export default function Users() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [users, setUsers] = useState();
  const [isLoading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const response = await getUsers();
    setUsers(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <AdminLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <div className="px-10 space-y-2 mt-3">
        <div className="flex justify-between w-full">
          <h3 className="w-[158px] h-[22px] text-left font-mona-sans font-semibold text-[23px] leading-[22px] text-[#535353] flex-none order-0 flex-grow-0">
            Users
          </h3>
          <Input
            className="w-64"
            placeholder="Search For Users"
            prefix={<SearchOutlined className="opacity-40" />}
          />
        </div>
        {isLoading && <LoadingSpinner />}
        {!isLoading && <AdminUsersTable data={users!} refreshData={fetchUsers} />}
      </div>
    </AdminLayout>
  );
}
