"use client";

import AuthLayout from "@/components/mainLayout/auth";
import { Button, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { signIn } from "next-auth/react";
import { SignUpForm } from "@/components/ui/forms/signUpForm";
import { RolesType } from "@/types/enums/roleEnums";
import { useState } from "react";
import Image from "next/image";
import successImge from "../../assets/images/Celebration-cuate 1.png";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const registerUser = (data: any) => {
    console.log("REgister USER - ", data);
    signIn("credentials", {
      data: JSON.stringify({ ...data, role: RolesType.USER }),
      key: "SIGN_UP",
      redirect: false,
    }).then(async ({ ok, error }: any) => {
      if (ok) {
        message.success("User Account Created Successfully");
        setSuccess(true);
      }

      if (error) {
        console.log(error);
      }
    });
  };
  return (
    <AuthLayout
      reloadSidebar={false}
      pageTitle="Dashboard"
      breadCrumb={["Dashboard"]}
    >
      <div className="pt-10">
        {!success && (
          <>
            <Button
              icon={<ArrowLeftOutlined />}
              className="text-green-500"
              type="text"
              iconPosition="start"
              onClick={() => router.push("/home")}
            >
              Back
            </Button>
            <div className=" font-mona-sans font-semibold text-[35px] text-[#1D2939]">
              Register as a Customer
            </div>
            <div className="font-mona-sans italic font-normal text-[15px] leading-[28px] text-[#475467]">
              Fill the form to register as a customer to order product from abay
              gebeya
            </div>
            <SignUpForm onSubmit={registerUser} />
          </>
        )}
        {success && (
          <div className="text-center">
            <div className=" font-mona-sans font-semibold text-[35px] text-[#1D2939]">
              Registration Successful
            </div>
            <div className="font-mona-sans italic font-normal text-[15px] leading-[28px] text-[#475467]">
              Congratulation! your registered on abay gebeya successfully
            </div>
            <Image
              src={successImge}
              className="w-full ml-7 py-5"
              alt="Login picture"
            />
            <Button className="w-1/2" type="primary" onClick={() => router.push("/products")}>
              Continue
            </Button>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}
