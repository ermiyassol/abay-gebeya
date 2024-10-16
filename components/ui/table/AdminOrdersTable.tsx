import React from "react";
import { Dropdown, message, Space, Table, Tag } from "antd";
import type { MenuProps, TableProps } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteInventory } from "@/app/actions/abay-gebeya/inventories";
import { blockUsers, downgradeUsers, unblockUsers, upgradeUsers } from "@/app/actions/abay-gebeya/admin";
import { RolesType } from "@/types/enums/roleEnums";
import { completeOrder, deleteOrder } from "@/app/actions/abay-gebeya/orders";
interface DataType {
  id: number;
  productId: number;
  productName: string;
  requestedQuantity: number;
  status: string;
  firstname: string;
  lastname: string;
  phoneNumber: string;
}

const displayErrorMessage = () => message.error("Something wend wrong! Try again")

export const AdminOrdersTable = (props: {
  data: DataType[];
  refreshData: any;
}) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "Order Code",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Full Name",
      key: "fullName",
      render: (_, record) => {
        return <>{record.firstname + " " + record.lastname}</>
      }
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
    },
    {
      title: "Order Status",
      key: "accountStatus",
      render: (_, record) => {
        if(record.status == "NEW") {
          return <div className="bg-gray-200 text-gray-700 px-5 w-fit rounded-full">{ record.status }</div>
        } else if(record.status.includes("INC")) {
          return <div className="bg-red-200 text-red-700 px-5 w-fit rounded-full">{ record.status }</div>
        } else {
          return <div className="bg-green-200 text-green-700 px-5 w-fit rounded-full">{ record.status }</div>
        }
      }
    },    
    {
      title: "Date -Time",
      // dataIndex: "createdAt",
      key: "createdAt",
      // render: (value, record) => {
      //   return <>{ new Date(value).toDateString() }</>
      // }
    },
    {
      title: "",
      key: "action",
      render: (_, record) => (
        <Dropdown
          menu={{
            items: record.status != "COMPLETED" ? [
               {
                key: "1",
                label: "Complete Order",
                onClick: () => {
                  completeOrder(record.id).then(() => {
                    props.refreshData(record)
                    message.success("Order Completed successfully!");
                  }, (error) => {
                    console.log("ERROR - ", error);
                    displayErrorMessage();
                  })
                },
              },
              {
                key: "2",
                danger: true,
                label: "Delete Order",
                onClick: () => {
                  deleteOrder(record.id).then(() => {
                    props.refreshData(record)
                    message.success("Order Deleted successfully!");
                  }, (error) => {
                    console.log("ERROR - ", error);
                    displayErrorMessage();
                  })
                },
              },
              
              // {
              //   key: "1",
              //   danger: true,
              //   icon: <DeleteOutlined />,
              //   label: "Delete",
              //   onClick: () => {
              //     console.log("DELETE - ", record);
              //     deleteInventory(record.id!).then(
              //       () => {
              //         props.refreshData();
              //         message.success("Inventory deleted successfully!");
              //       },
              //       (error) => {
              //         console.log("ERROR - ", error);
              //         message.error("Something wend wrong@, Please try again");
              //       }
              //     );
              //   },
              // },
            ] : [],
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
