import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  Modal,
  Select,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import { createProduct } from "@/app/actions/abay-gebeya/products";
type PropsData = {
  open: boolean;
  handleOk: any;
  handleCancel: any;
};

type FieldType = {
  name: string;
  image: any;
  basePrice: number;
  fee: number;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const ProductForm = ({ open, handleOk, handleCancel }: PropsData) => {
  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    const formData = new FormData();
  formData.append('name', values.name);
  formData.append('basePrice', values.basePrice.toString());
  formData.append('fee', values.fee.toString());
  formData.append('image', values.image); // Attach image file

  const response = await createProduct(formData);
  console.log("ADD PRODUCT - ", response);
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
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          layout="vertical"
          name="image"
          valuePropName="fileList"
          getValueFromEvent={normFile}
          rules={[{ required: true, message: "Please upload image!" }]}
        >
          <Dragger maxCount={1} listType="picture">
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              <span className="text-green-600">Click to upload</span> or drag
              and drop
            </p>
            <p className="ant-upload-hint">JPEG, PNG (max 20 MB).</p>
          </Dragger>
        </Form.Item>

        <Form.Item<FieldType>
          label="Product Name"
          layout="vertical"
          name="name"
          rules={[{ required: true, message: "Please input product name!" }]}
        >
          <Input className="w-full" placeholder="Enter Product's Name" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Base Price"
          layout="vertical"
          name="basePrice"
          rules={[
            { required: true, message: "Please input product base price!" },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Enter Product's Base Price"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Fee"
          layout="vertical"
          name="fee"
          rules={[{ required: true, message: "Please input product fee!" }]}
        >
          <InputNumber className="w-full" placeholder="Enter Product's Fee" />
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
    </Modal>
  );
};
