import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Menu, Space } from "antd";
import { usePathname, useRouter } from "next/navigation";

type MenuItem = Required<MenuProps>["items"][number];

const itemsL: MenuItem[] = [
  {
    label: "Dashboard",
    key: "/admin/dashboard",
  },
  {
    label: "Orders",
    key: "/admin/orders",
  },
  {
    label: "Products",
    key: "/admin/products",
  },
  {
    label: "Inventory",
    key: "/admin/inventory",
  },
  {
    label: "Users",
    key: "/admin/users",
  },
  {
    label: "Profile",
    key: "/admin/profile",
  },
];

const itemsR: MenuItem[] = [
  {
    label: (
      <Button className="bg-[#CF0000] rounded-2xl" type="primary" danger>
        Logout
      </Button>
    ),
    key: "logout",
  },
];

export const AdminNavigationMenu = () => {
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
        items={itemsR}
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
