import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Menu, Space } from "antd";
import { usePathname ,useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { signOut } from "next-auth/react";

type MenuItem = Required<MenuProps>["items"][number];

const itemsL: MenuItem[] = [
  {
    label: "Products",
    key: "/products",
  },
  {
    label: "Orders",
    key: "/orders",
  },
  {
    label: "Profile",
    key: "/profile",
  },
];

const itemsR: MenuItem[] = [
  {
    label: "Home",
    key: "/home",
  },
  {
    label: "About Us",
    key: "/about",
  },
  {
    label: "Contact",
    key: "/contact",
  },
  // {
  //   label: (
  //     // session?.user && 
  //     <Button className="bg-[#CF0000] rounded-2xl" type="primary" danger>
  //       Logout
  //     </Button>
  //   ),
  //   key: "logout",
  // },
];


export const NavigationMenu = () => {
  const [current, setCurrent] = useState<string>("");
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const [session, setSession] = useState(false);
  
  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setSession(sessionData?.user ? true : false);  // Set session data
    };
    fetchSession();  // Fetch session inside useEffect
  }, []);

  useEffect(() => {
    console.log("2nd use");
    setCurrent(pathname);
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    router.push(e.key);
  };

  const onLogout = () => {
    signOut({ callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
  }

  return (
    <div className="flex justify-between">
      {session && 
      <Menu
        className="w-full"
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={itemsL}
      />
      } 
      <Menu
        className=""
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={[...itemsR, {
          label: (
            session && 
            <Button onClick={onLogout} className="bg-[#CF0000] rounded-2xl" type="primary" danger>
              Logout
            </Button>
          ),
          key: "logout",
        }]}
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
}
