"use client";

import AuthLayout from "@/components/mainLayout/auth";
import { Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { getSession, signIn, useSession } from "next-auth/react";
import { SignInForm } from "@/components/ui/forms/signInForm";
import { RolesType } from "@/types/enums/roleEnums";
import { useRouter } from "next/navigation";

export default function SignIn() {
const router = useRouter();

  const registerUser = (formData: any) => {
    signIn("credentials", {
      data: JSON.stringify({...formData}),
      key: "SIGN_IN",
      redirect: false,
    }).then(async ({ok, error}: any) => {
      const session = await getSession();
      console.log("data.OK - ", session);
      console.log("Error - ", error);
      if(ok) {
        const session = await getSession();
        if (session?.user.role == RolesType.USER) {
          router.push("/products")
          message.success("User Authenticated Successfully");
        }
        if (session?.user.role == RolesType.ADMIN) {
          router.push("/admin/dashboard")
          message.success("Admin Authenticated Successfully");
        }
        if (session?.user.role == RolesType.MANAGER) {
          router.push("/manager/inventory")
          message.success("Manager Authenticated Successfully");
        }
      }

      if(error) {
        console.log(error);
      }
    })
  }
  return (
    <AuthLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <div className="pt-10">
        <Button onClick={() => router.push("/home")} icon={<ArrowLeftOutlined />} className="text-green-500" type="text" iconPosition="start">
          Back
        </Button>
        <div className=" font-mona-sans font-semibold text-[25px] md:text-[35px] text-[#1D2939]">
          Login
        </div>
        <div className="font-mona-sans italic font-normal text-[15px] leading-[28px] text-[#475467]">
          Login using email address
        </div>
       <SignInForm onSubmit={registerUser} />
      </div>
    </AuthLayout>
  );
}
