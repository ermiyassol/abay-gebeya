"use client";
import { Avatar, Badge, Button, Flex, Input } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { BellOutlined, SearchOutlined } from "@ant-design/icons";
import { ProductItem } from "../ui/cards/ProductItem";
import { NavigationMenu } from "../ui/menu/NavigationMenu";
import { AdminNavigationMenu } from "../ui/menu/AdminNavigationMenu";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
interface AdminLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  reloadSidebar?: boolean;
  breadCrumb?: string[];
}

interface UserInfoType {
  role: string;
  firstname: string;
  lastname: string;
}


export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<UserInfoType>(null!);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      console.log("object - ", sessionData);
      setUserInfo({
        firstname: sessionData?.user.firstname!,
        lastname: sessionData?.user.lastname!,
        role: sessionData?.user.role.toLowerCase()!,
      }); // Set session data
    };
    fetchSession(); // Fetch session inside useEffect
  }, []);
  
  return (
    <div>
      <div className="flex justify-between py-6 px-16">
        <div className="flex justify-start space-x-3">
          <div className="w-5 h-5 rotate-45 bg-[#12B76A] rounded-sm"></div>
          <h2 className="font-semibold text-[20px] leading-[24px] text-gray-900">
            Abay Gebeya
          </h2>
        </div>
        <div className="flex justify-end">
        {!userInfo?.role && <Flex gap="small" wrap>
            <Button
              className="rounded-2xl w-32"
              type="primary"
              onClick={() => router.push("/signin")}
            >
              Login
            </Button>
            <Button
              className="rounded-2xl border-2 border-[#12B76A] text-[#12B76A] w-32"
              onClick={() => router.push("/signup")}
            >
              Register
            </Button>
          </Flex>}

          {!!userInfo?.role && <Flex className="flex items-center" gap="15px" wrap>
            <Badge className="mr-4" dot>
              <BellOutlined style={{ fontSize: 25 }} />
            </Badge>

            <Avatar
            className="capitalize"
              style={{ backgroundColor: "green", verticalAlign: "middle" }}
              size="large"
              gap={1}
            >
              {userInfo?.firstname[0] + userInfo?.lastname[0]}
            </Avatar>
            <div className="space-y-2">
              <h3 className="font-mono-sans font-medium text-[18px] leading-[17px] text-black flex-none order-0 grow-0">
              {userInfo?.firstname + " " + userInfo?.lastname}</h3>
              <h4 className="w-[75px] h-[15px] font-mono-sans font-light text-[16px] leading-[15px] text-[#475467] flex-none order-1 grow-0">
              {userInfo?.role}
              </h4>
            </div>
          </Flex>}
        </div>
      </div>
      <div>
        {/* Menu */}
        <AdminNavigationMenu />
      </div>
      <div className="py-1">{children}</div>
    </div>
  );
}
