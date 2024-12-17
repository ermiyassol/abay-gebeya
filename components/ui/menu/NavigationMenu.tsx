import React, { useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Menu, Space } from "antd";
import { usePathname, useRouter } from "next/navigation";
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
  const [itemsC, setItemsC] = useState<MenuItem[]>([
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/home");
            router.push("/home");
          }}
        >
          Home
        </a>
      ),
      key: "/home",
    },
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/about");
            router.push("/about");
          }}
        >
          About Us
        </a>
      ),
      key: "/about",
    },
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/contact");
            router.push("/contact");
          }}
        >
          Contact
        </a>
      ),
      key: "/contact",
    },
  ]);

  const itemsD: MenuItem[] = [
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/products");
            router.push("/products");
          }}
        >
          Product
        </a>
      ),
      key: "/products",
    },
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/orders");
            router.push("/orders");
          }}
        >
          Orders
        </a>
      ),
      key: "/orders",
    },
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/profile");
            router.push("/profile");
          }}
        >
          Profile
        </a>
      ),
      key: "/profile",
    },
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/home");
            router.push("/home");
          }}
        >
          Home
        </a>
      ),
      key: "/home",
    },
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/about");
            router.push("/about");
          }}
        >
          About Us
        </a>
      ),
      key: "/about",
    },
    {
      label: (
        <a
          onClick={() => {
            setCurrent("/contact");
            router.push("/contact");
          }}
        >
          Contact
        </a>
      ),
      key: "/contact",
    },
  ];

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      if (sessionData) {
        setItemsC(itemsD);
      }
      setSession(sessionData?.user ? true : false); // Set session data
    };
    fetchSession(); // Fetch session inside useEffect
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
    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      redirect: false,
    }).then(() => {
      document.cookie =
        "next-auth.session-token-abay-gebeya=; Max-Age=0; path=/;"; // Or the specific cookie you need to delete
    });
    signOut({
      callbackUrl: process.env.NEXT_PUBLIC_BASE_URL,
      redirect: false,
    }).then(() => {
      document.cookie =
        "next-auth.session-token-abay-gebeya=; Max-Age=0; path=/;"; // Or the specific cookie you need to delete
    });
  };

  return (
    <>
      <div className="hidden md:flex justify-between">
        {session && (
          <Menu
            className="w-full"
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={itemsL}
          />
        )}
        <Menu
          className=""
          onClick={onClick}
          selectedKeys={[current]}
          mode="horizontal"
          items={[
            ...itemsR,
            {
              label: session && (
                <Button
                  onClick={onLogout}
                  className="bg-[#CF0000] rounded-2xl"
                  type="primary"
                  danger
                >
                  Logout
                </Button>
              ),
              key: "logout",
            },
          ]}
        />
      </div>
      <div className="visible md:hidden p-3 flex justify-between">
        <Dropdown menu={{ items: itemsC }} trigger={["click"]}>
          <a onClick={(e) => e.preventDefault()}>
            <Space>
              <Button onClick={toggleCollapsed}>
                {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              </Button>
            </Space>
          </a>
        </Dropdown>
        {session && (
          <Button
            onClick={onLogout}
            className="bg-[#CF0000] rounded-2xl"
            type="primary"
            danger
          >
            Logout
          </Button>
        )}
      </div>
    </>
  );
};
