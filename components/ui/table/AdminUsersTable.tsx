import React from "react";
import { Dropdown, message, Space, Table, Tag } from "antd";
import type { MenuProps, TableProps } from "antd";
import { MoreOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { deleteInventory } from "@/app/actions/abay-gebeya/inventories";
import { blockUsers, downgradeUsers, unblockUsers, upgradeUsers } from "@/app/actions/abay-gebeya/admin";
import { RolesType } from "@/types/enums/roleEnums";
interface DataType {
  firstname: string;
  lastname: string;
  email: string;
  phoneNumber: string;
  role: string;
  verified: string;
  blocked: string;
  id: number;
  createdAt: string;
  updatedAt: string;
}

const displayErrorMessage = () => message.error("Something wend wrong! Try again")

export const AdminUsersTable = (props: {
  data: DataType[];
  refreshData: any;
}) => {
  const columns: TableProps<DataType>["columns"] = [
    {
      title: "User Id",
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
      title: "Role",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Account Status",
      key: "accountStatus",
      render: (_, record) => {
        if(record.blocked) {
          return <div className="bg-red-200 text-red-700 px-5 w-fit rounded-full">Blocked</div>
        } else if(record.verified) {
          return <div className="bg-green-200 text-green-700 px-5 w-fit rounded-full">Verified</div>
        } else {
          return <div className="bg-gray-200 text-gray-700 px-5 w-fit rounded-full">Not Verified</div>
        }
      }
    },
    {
      title: "Email Address",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "Registered On",
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
            items: [
              record.role == RolesType.USER ? {
                key: "1",
                label: "Upgrade User",
                onClick: () => {
                  upgradeUsers(record.id).then(() => {
                    props.refreshData(record)
                    message.success("User upgraded successfully!");
                  }, (error) => {
                    console.log("ERROR - ", error);
                    displayErrorMessage();
                  })
                },
              } :
              {
                key: "2",
                label: "Downgrade User",
                onClick: () => {
                  downgradeUsers(record.id).then(() => {
                    props.refreshData(record)
                    message.success("User upgraded successfully!");
                  }, (error) => {
                    console.log("ERROR - ", error);
                    displayErrorMessage();
                  })
                },
              },
              record.blocked ? {
                key: "4",
                label: "Unblock User",
                onClick: () => {
                  unblockUsers(record.id).then(() => {
                    props.refreshData(record)
                    message.success("User upgraded successfully!");
                  }, (error) => {
                    console.log("ERROR - ", error);
                    displayErrorMessage();
                  })
                },
              } : {
                key: "3",
                label: "Block User",
                onClick: () => {
                  blockUsers(record.id).then(() => {
                    props.refreshData(record)
                    message.success("User upgraded successfully!");
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

  return (
    <Table<DataType>
      columns={columns}
      dataSource={props.data}
      pagination={false}
    />
  );
};
