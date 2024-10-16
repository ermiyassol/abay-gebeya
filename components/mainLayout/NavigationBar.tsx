import {
  TeamOutlined,
  ShopOutlined,
  DashboardOutlined,
  AimOutlined,
  SettingOutlined,
  SnippetsOutlined,
  DatabaseOutlined,
  MenuUnfoldOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export const NavigationBar = () => {
  const pathname = usePathname();
  const session = useSession();
  // const isSndUser = session?.data?.domain === 'SND';
  const router = useRouter();

  console.log("pathname - ", pathname);

  function getItem(label: string, key: string, icon?: any, children?: any) {
    // if ((sndUserHiddenFeats.includes(key)) || !session?.data) return null;
    return {
      key,
      icon,
      children,
      label: <h2 className="font-semibold text-[17px]">{label}</h2>,
    };
  }

  const items3 = [
    getItem("Dashboard", "/mainDashboard", <DashboardOutlined />),

    getItem("POS Outlet Management", "/posOutletManagement", <AimOutlined />),
    getItem("Shop Visit", "/shopVisit", <ShopOutlined />),
    getItem("Configuration", "/configuration", <SettingOutlined />, [
      getItem("Categories", "/configuration/categories"),
      getItem("Channel Types", "/configuration/channelTypes"),
      getItem("Visit Questionnaires", "/configuration/visitQuestionnaires"),
      getItem("Question Answers", "/configuration/questionAnswers"),
      // getItem("Setting", "setting"),
    ]),
    // getItem("Reports", "reports", <SnippetsOutlined />, [
      // getItem("CRM", "crm"),
      // getItem("Business Till Update", "t&c's"),
    // ]),

    // getItem("Files", "9", <FileOutlined />),
  ];

  return (
    <Menu
      theme="dark"
      defaultSelectedKeys={[pathname]}
      mode="inline"
      items={items3}
      defaultOpenKeys={[pathname.includes("/configuration") ? "/configuration" : ""]}
      onClick={(item: any) => {
        const url = item.keyPath[0];
        console.log("url - ", url, item.keyPath);
        router.push(`${url}`);
      }}
    />
  );
};
