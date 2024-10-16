import React from "react";
import { Dropdown, message, Space, Table, Tag } from "antd";
import type { MenuProps, TableProps } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteInventory } from "@/app/actions/abay-gebeya/inventories";
interface DataType {
  id: number;
  price: number;
  productName: string;
  productId: string;
  quantity: number;
  vendorName: string;
  vendorPhoneNumber: string;
}


export const AdminInventoryTable = (props: { data: DataType[], refreshData: any, onEdit: any }) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Inventory Code",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Vendor Name",
      dataIndex: "vendorName",
      key: "vendorName",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Phone Number",
      dataIndex: "vendorPhoneNumber",
      key: "vendorPhoneNumber",
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "2",
                icon: <EditOutlined />,
                label: "Edit",
                onClick: () => props.onEdit(record),
              },
              {
                key: "1",
                danger: true,
                icon: <DeleteOutlined />,
                label: "Delete",
                onClick: () => {
                  console.log("DELETE - ", record);
                  deleteInventory(record.id!).then(() => {
                    props.refreshData();
                    message.success("Inventory deleted successfully!")
                  }, (error) => {
                    console.log("ERROR - ", error);
                    message.error("Something wend wrong@, Please try again")
                  })
                },
              },
              
            ],
          }}
        >
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <MoreOutlined />
            </Space>
          </a>
        </Dropdown>
      ),
    },
  ];
  

  return <Table<DataType>
  columns={columns}
  dataSource={props.data}
  pagination={false}
/>
};
