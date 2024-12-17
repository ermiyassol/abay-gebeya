import React from "react";
import { Dropdown, message, Space, Table, Tag } from "antd";
import type { MenuProps, TableProps } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteInventory } from "@/app/actions/abay-gebeya/inventories";
import {
  blockUsers,
  downgradeUsers,
  unblockUsers,
  upgradeUsers,
} from "@/app/actions/abay-gebeya/admin";
import { RolesType } from "@/types/enums/roleEnums";
import { completeOrder, deleteOrder } from "@/app/actions/abay-gebeya/orders";
interface DataType {
  id: number;
  productId: number;
  productName: string;
  requestedQuantity: number;
  status: string;
  createdAt: string;
}

const displayErrorMessage = () =>
  message.error("Something wend wrong! Try again");

export const OrdersTable = (props: { data: DataType[]; refreshData: any }) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Order Code",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    // {
    //   title: "Full Name",
    //   key: "fullName",
    //   render: (_, record) => {
    //     return <>{record.firstname + " " + record.lastname}</>
    //   }
    // },
    {
      title: "Quantity",
      dataIndex: "requestedQuantity",
      key: "requestedQuantity",
    },
    {
      title: "Order Status",
      key: "accountStatus",
      render: (_, record) => {
        if (record.status == "PENDING") {
          return (
            <div className="bg-gray-200 text-gray-700 px-5 w-fit rounded-full">
              {record.status}
            </div>
          );
        } else if (record.status.includes("INC")) {
          return (
            <div className="bg-red-200 text-red-700 px-5 w-fit rounded-full">
              {record.status}
            </div>
          );
        } else {
          return (
            <div className="bg-green-200 text-green-700 px-5 w-fit rounded-full">
              {record.status}
            </div>
          );
        }
      },
    },
    {
      title: "Date -Time",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value, record) => {
        return <>{ new Date(value).toDateString() }</>
      }
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items:
              record.status != "COMPLETED"
                ? [
                    {
                      key: "2",
                      danger: true,
                      label: "Delete Order",
                      onClick: () => {
                        deleteOrder(record.id).then(
                          () => {
                            props.refreshData(record);
                            message.success("Order Deleted successfully!");
                          },
                          (error) => {
                            console.log("ERROR - ", error);
                            displayErrorMessage();
                          }
                        );
                      },
                    },
                  ]
                : [],
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

  return (
    <Table<DataType>
      columns={columns}
      dataSource={props.data}
      pagination={false}
      
    />
  );
};
