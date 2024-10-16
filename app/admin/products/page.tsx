"use client";

import AdminLayout from "@/components/mainLayout/admin";
import { ProductForm } from "@/components/ui/forms/ProductForm";
import { Button, Input } from "antd";
import { useRouter } from "next/navigation";
import { SearchOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { AdminProductsTable } from "@/components/ui/table/AdminProductsTable";
import { getAllProducts } from "@/app/actions/abay-gebeya/products";
import { DataPagination } from "@/components/ui/pagination/DataPagination";
import { AdminProductItem } from "@/components/ui/cards/AdminProductItem";

export default function Products() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllProducts();
      setData(response.data);
    };

    fetchData();
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <AdminLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <ProductForm
        handleCancel={handleCancel}
        handleOk={handleOk}
        open={open}
      />
      <div className="px-10 space-y-2 mt-3">
        <div className="flex justify-between w-full">
          <h3 className="w-[158px] h-[22px] text-left font-mona-sans font-semibold text-[23px] leading-[22px] text-[#535353] flex-none order-0 flex-grow-0">
            Products
          </h3>
          <div className="space-x-2">
            <Input
              className="w-64"
              placeholder="Search For Products"
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

        <div className="grid grid-cols-3 gap-2 px-10 pt-5">
          {data?.map((itm) => (
            <div key={itm} className="shadow-md">
              <AdminProductItem width="full" data={itm} />
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <DataPagination />
        </div>
      </div>
    </AdminLayout>
  );
}
