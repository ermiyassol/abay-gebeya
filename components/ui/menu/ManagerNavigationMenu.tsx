import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Menu, Space } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

type MenuItem = Required<MenuProps>["items"][number];

const itemsL: MenuItem[] = [
  {
    label: "Inventory",
    key: "/manager/inventory",
  },
  {
    label: "Profile",
    key: "/manager/profile",
  },
];

export const ManagerNavigationMenu = () => {
  const [current, setCurrent] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setCurrent(pathname);
  }, [current]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  const onLogout = () => {

    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      redirect: false,
    }).then(() => {
      document.cookie = "next-auth.session-token-abay-gebeya=; Max-Age=0; path=/;"; // Or the specific cookie you need to delete
    });
    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      redirect: false,
    }).then(() => {
      document.cookie = "next-auth.session-token-abay-gebeya=; Max-Age=0; path=/;"; // Or the specific cookie you need to delete
    });
  }

  return (
    <div className="flex justify-between">
      <Menu
        className="w-full"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={itemsL}
      />

      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={[
          {
            label: (
              <Button onClick={onLogout} className="bg-[#CF0000] rounded-2xl" type="primary" danger>
                Logout
              </Button>
            ),
            key: "logout",
          },
        ]}
      />

      {/* <Dropdown menu={{ items: [...itemsL, ...itemsR] }} trigger={["click"]}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Button
              onClick={toggleCollapsed}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </Button>
          </Space>
        </a>
      </Dropdown> */}
    </div>
  );
};
