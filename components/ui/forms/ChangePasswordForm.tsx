import { Button, Form, FormProps, Input, message, Modal } from "antd";
import { useState } from "react";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { changePassword } from "@/app/actions/abay-gebeya/users";

type PropsData = {
  open: boolean;
  handleOk: any;
  handleCancel: any;
};

type FieldType = {
  currentPassword: string;
  newPassword: string;
  confirmationPassword: string;
};

export const ChangePasswordForm = ({
  open,
  handleOk,
  handleCancel,
}: PropsData) => {
  const [isLoading, setLoading] = useState(false);
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    const response = await changePassword(values);
    setLoading(false);

    if (response.error) {
      message.error(response.error);
      return;
    }

    message.success("Password changed successfully!");
    handleOk();
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      open={open}
      title="Change Password"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Form
          name="basic"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Previous Password"
            layout="vertical"
            name="currentPassword"
            rules={[
              { required: true, message: "Please input previous password!" },
            ]}
          >
            <Input.Password
              className="w-full"
              placeholder="Enter Your Previous Password"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="New Password"
            layout="vertical"
            name="newPassword"
            rules={[{ required: true, message: "Please input new password!" }]}
          >
            <Input.Password
              className="w-full"
              placeholder="Enter Your New Password"
            />
          </Form.Item>

          <Form.Item<FieldType>
            label="Confirm Password Password"
            layout="vertical"
            name="confirmationPassword"
            rules={[
              {
                required: true,
                message: "Please input confirmation Password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("The confirmation password does not match!")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              className="w-full"
              placeholder="Re-Enter Your New Password"
            />
          </Form.Item>
          <div className="flex space-x-5">
            <Form.Item className="w-full">
              <Button
                className="w-full rounded-full"
                type="default"
                htmlType="reset"
                onClick={handleCancel}
              >
                Cancel
              </Button>
            </Form.Item>

            <Form.Item className="w-full">
              <Button
                className="w-full rounded-full"
                type="primary"
                htmlType="submit"
              >
                Submit
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </Modal>
  );
};
