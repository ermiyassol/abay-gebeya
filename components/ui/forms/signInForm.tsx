import {
  Button,
  Form,
  FormProps,
  Input,

} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
type PropsData = {
  // open: boolean;
  onSubmit: any;
  // handleCancel: any;
};

type FieldType = {
  email?: string;
  password?: string;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const SignInForm = ({ onSubmit }: PropsData) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    onSubmit(values);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email Address"
          layout="vertical"
          name="email"
          rules={[{ required: true, message: "Please input email address!" }]}
        >
          <Input className="w-full" placeholder="Enter Email Address" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          layout="vertical"
          name="password"
          rules={[{ required: true, message: "Please input password!" }]}
        >
          <Input.Password className="w-full" placeholder="Enter Password" />
        </Form.Item>
        
        <div className="flex space-x-5">
          <Form.Item className="w-full">
            <Button
              className="w-full rounded-full"
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form.Item>
        </div>
      </Form>
  );
};
