'use client'
import {
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import type { MenuProps } from 'antd';
import { getSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const items: MenuProps['items'] = [
  {
    label: <h5 className="text-red-600 text-sm">Logout</h5>,
    key: "3",
    icon: <LogoutOutlined className="text-red-600" />,
    // onclick: () => {
    //   console.log("Logout clicked");
    // },
  },
];

const ProfileDropDown = (props: any) => {
  const router = useRouter();

  useEffect(() => {
    const fetchToken = async () => {
      const session = await getSession();
      if (session != null) {
        console.log("Session from - ", session.user.firstName);
        // userInfo.current.firstName = session.user.firstName;
        // userInfo.current.lastName = session.user.lastName;
      }
    };

    fetchToken();
  }, []);

  const menuItemClickHandler = (event: any) => {
    console.log("Menu Item Selected - ", event);
    signOut({ callbackUrl: process.env.NEXTAUTH_URL })
  };

  // useEffect(() => {
  //   const session = getSession({ req });
  //   console.log("USER SESSION - ", session);
  //   // session.id // userId
  // }, [])

  return (
    <Dropdown
      menu={{
        items,
        onClick: menuItemClickHandler,
      }}
      trigger={["click"]}
      placement="bottomRight"
    >
      <div className="flex pr-3 cursor-pointer">
        <div className="flex items-center">
          <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          <div className="text-sm">
            <p className="text-gray-900 leading-none capitalize">{ props.user.username }</p>
            <p className="text-gray-600 capitalize">{ props.user.role }</p>
          </div>
        </div>
      </div>
    </Dropdown>
  );
};
export default ProfileDropDown;
