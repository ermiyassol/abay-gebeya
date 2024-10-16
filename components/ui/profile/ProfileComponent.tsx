import { Avatar, Button } from "antd";
import { ChangePasswordForm } from "../forms/ChangePasswordForm";
import { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

interface UserInfoType {
  role: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  id: string;
  profile: string;
}

export const ProfileComponent = () => {
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfoType>(null!);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await getSession();
      setUserInfo({
        profile: sessionData?.user.firstname[0] + "" + sessionData?.user.lastname[0]!,
        fullName:
          sessionData?.user.firstname! + " " + sessionData?.user.lastname!,
        role: sessionData?.user.role!,
        email: sessionData?.user.email!,
        phoneNumber: sessionData?.user.phoneNumber!,
        id: sessionData?.user.id!,
      }); // Set session data
      setLoading(false);
    };
    fetchSession(); // Fetch session inside useEffect
  }, []);

  const showModal = () => {
    setOpen(true);
  };

  const handleOk = () => {
      setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <>
      <ChangePasswordForm
        handleCancel={handleCancel}
        handleOk={handleOk}
        open={open}
      />
      {isLoading && <LoadingSpinner />}
      {!isLoading && <div className="mt-5 ml-10 w-1/3 space-y-7">
        <div className="flex justify-between">
          <Avatar
            style={{ backgroundColor: "#12B76A", verticalAlign: "middle" }}
            size="large"
            gap={1}
          >
            { userInfo?.profile }
          </Avatar>
          <div className="space-x-3 grid content-center">
          <h3 className="h-4 capitalize text-base font-semibold leading-[15px] text-gray-800 text-right flex-none order-1">
            { userInfo?.role }
          </h3>
            {/* <Button type="link" className="text-green-400">
              Edit
            </Button>
            <Button type="link" className="text-green-400">
              Remove
            </Button> */}
          </div>
        </div>

        <div className="flex justify-between">
          <h1 className="h-5 font-bold text-[20px] self-center leading-[19px] text-black flex-none order-0">
            Personal Information
          </h1>
          <Button
            type="primary"
            className="bg-green-200 text-green-600"
            onClick={showModal}
          >
            Change Password
          </Button>
        </div>

        <div className="flex justify-between">
          <h3 className="h-4  font-normal text-base leading-[15px] text-gray-600 flex-none order-0">
            Full Name
          </h3>
          <h3 className="h-4 text-base font-semibold leading-[15px] text-gray-800 text-right flex-none order-1">
            { userInfo?.fullName }
          </h3>
        </div>
        <div className="flex justify-between">
          <h3 className="h-4  font-normal text-base leading-[15px] text-gray-600 flex-none order-0">
            Email Address
          </h3>
          <h3 className="h-4 text-base font-semibold leading-[15px] text-gray-800 text-right flex-none order-1">
            { userInfo?.email }
          </h3>
        </div>
        <div className="flex justify-between">
          <h3 className="h-4  font-normal text-base leading-[15px] text-gray-600 flex-none order-0">
            Phone Number
          </h3>
          <h3 className="h-4 text-base font-semibold leading-[15px] text-gray-800 text-right flex-none order-1">
            { userInfo?.phoneNumber }
          </h3>
        </div>
      </div>}
    </>
  );
};
