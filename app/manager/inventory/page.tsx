"use client";

import ManagerLayout from "@/components/mainLayout/manager";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { AdminInventoryTable } from "@/components/ui/table/AdminInventoryTable";
import { InventoryForm } from "@/components/ui/forms/InventoryForm";
import { getAllInventories } from "@/app/actions/abay-gebeya/inventories";
import { LoadingSpinner } from "@/components/ui/loading-spinner/LoadingSpinner";

export default function Inventory() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [inventories, setInventories] = useState();
  const [isLoading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editDetail, setEditDetail] = useState();

  const fetchInventory = async () => {
    setLoading(true);
    const response = await getAllInventories();
    setInventories(
      response.data.map((itm: any) => {
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
    );
    setLoading(false);
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setEditMode(false);
    fetchInventory();
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const onEdit = (detail: any) => {
    setEditDetail(detail);
    setEditMode(true);
    setOpen(true);
  }

  return (
    <ManagerLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <InventoryForm
        handleCancel={handleCancel}
        handleOk={handleOk}
        open={open}
        editMode={editMode}
        initialValue={editDetail}
      />
      <div className="px-10 space-y-2 mt-3">
        <div className="flex justify-between w-full">
          <h3 className="w-[158px] h-[22px] text-left font-mona-sans font-semibold text-[23px] leading-[22px] text-[#535353] flex-none order-0 flex-grow-0">
            Inventories
          </h3>
          <div className="space-x-2">
            <Input
              className="w-64"
              placeholder="Search For Inventories"
              prefix={<SearchOutlined className="opacity-40" />}
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
        {!isLoading && <AdminInventoryTable onEdit={onEdit} data={inventories!} refreshData={fetchInventory} />}
      </div>
    </ManagerLayout>
  );
}
