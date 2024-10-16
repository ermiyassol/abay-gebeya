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
  firstname?: string;
  lastname?: string;
  email?: string;
  phoneNumber?: string;
  password?: string;
  confirmationPassword?: string;
  role?: string;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const SignUpForm = (props: PropsData) => {
  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    console.log("Success:", values);
    props.onSubmit(values);
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
          label="First Name"
          layout="vertical"
          name="firstname"
          rules={[{ required: true, message: "Please input first name!" }]}
        >
          <Input className="w-full" placeholder="Enter First Name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Last Name"
          layout="vertical"
          name="lastname"
          rules={[{ required: true, message: "Please input last name!" }]}
        >
          <Input className="w-full" placeholder="Enter Last Name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone Number"
          layout="vertical"
          name="phoneNumber"
          rules={[{ required: true, message: "Please input phone number!" }]}
        >
          <Input className="w-full" placeholder="Enter Phone Number" />
        </Form.Item>

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

        <Form.Item<FieldType>
          label="Confirmation Password"
          layout="vertical"
          name="confirmationPassword"
          rules={[{ required: true, message: "Please input confirmation password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The confirmation password does not match!'));
              },
            }),
          ]}
        >
          <Input.Password className="w-full" placeholder="Enter Confirmation Password" />
        </Form.Item>
        
        <div className="flex space-x-5">
          <Form.Item className="w-full">
            <Button
              className="w-full rounded-full"
              type="primary"
              htmlType="submit"
            >
              Create Account
            </Button>
          </Form.Item>
        </div>
      </Form>
  );
};
