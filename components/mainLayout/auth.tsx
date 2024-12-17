"use client";
import { Button, Flex, Input } from "antd";
import { ReactNode } from "react";
import officeWorkImage from "../../assets/images/Office work-cuate 1.png";

import Image from "next/image";
interface AdminLayoutProps {
  children: ReactNode;
  pageTitle?: string;
  reloadSidebar?: boolean;
  breadCrumb?: string[];
}
export default function AuthLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex">
      <div className="md:w-1/3 hidden bg-[#12B76A] h-screen md:grid content-between">
        <div className="flex justify-start space-x-3 m-7">
          <div className="w-5 h-5 rotate-45 bg-white rounded-sm"></div>
          <h2 className="font-semibold text-[20px] leading-[24px] text-white">
            Abay Gebeya
          </h2>
        </div>

        <div className="space-y-6">
          <div className=" mx-5 font-mona-sans font-bold text-[25px] leading-[44px] text-white">
            Lorem Ipsum dolor sit amet
          </div>

          <div className="font-mona-sans text-justify mx-5 font-normal text-[15px] leading-[20px] text-white">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco.
          </div>
        </div>
        <Image
          src={officeWorkImage}
          className="w-full ml-7 py-5"
          alt="Login picture"
        />
      </div>

      <div className="md:w-2/3 w-full md:flex p-8 md:p-0 md:justify-center">
      <div className="flex justify-start space-x-3  md:hidden">
          <div className="w-5 h-5 rotate-45 bg-[#12B76A] rounded-sm"></div>
          <h2 className="font-semibold text-[20px] leading-[24px] text-[#12B76A]">
            Abay Gebeya
          </h2>
        </div>
      {children}</div>
    </div>
  );
}
