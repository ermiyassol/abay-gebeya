import {
  Button,
  Form,
  FormProps,
  Image,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
  Upload,
} from "antd";
import { InboxOutlined } from "@ant-design/icons";
import Dragger from "antd/es/upload/Dragger";
import {
  createProduct,
  updateProduct,
  updateProductImage,
} from "@/app/actions/abay-gebeya/products";
import { useState } from "react";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

const { TextArea } = Input;

type PropsData = {
  open: boolean;
  handleOk: any;
  handleCancel: any;
  editMode: boolean;
  initialValue: FieldType;
};

type FieldType = {
  id: string;
  name: string;
  image: any;
  imageUrl: any;
  basePrice: number;
  fee: number;
  description: string;
};

const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const ProductForm = ({
  open,
  handleOk,
  handleCancel,
  editMode,
  initialValue,
}: PropsData) => {
  const [isLoading, setLoading] = useState(false);

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log(editMode, values);
    if (editMode) {
      onUpdate(values);
    } else {
      onAdd(values);
    }
  };

  const onUpdate = async (values: any) => {
    setLoading(true);
    const body = {
      name: values.name,
      Description: values.Description,
      basePrice: values.basePrice.toString(),
      fee: values.fee.toString(),
    };

    const response = await updateProduct(initialValue.id, body);
    if (values.image) {
      const formData = new FormData();
      formData.append("image", values.image[0]?.originFileObj);
      const imageResponse = await updateProductImage(initialValue.id, formData);
      if (imageResponse.error) {
        console.log("Error - ", imageResponse.error);
        message.error(imageResponse.error);
        return;
      }
    }

    setLoading(false);
    console.log("Response - ", response);
    if (response.error) {
      console.log("Error - ", response.error);
      message.error(response.error);
      return;
    }

    message.success("Product updated successfully!");
    handleOk();
  };

  const onAdd = async (values: any) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("basePrice", values.basePrice.toString());
    formData.append("fee", values.fee.toString());
    formData.append("image", values.image[0]?.originFileObj); // Attach image file

    const response = await createProduct(formData);
    setLoading(false);
    console.log("Response - ", response);
    if (response.error) {
      console.log("Error - ", response.error);
      message.error(response.error);
      return;
    }

    message.success("Product added successfully!");
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
      title={editMode ? "Product Updating Form" : "New Product Adding Form"}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <Form
          name="basic"
          layout="vertical"
          initialValues={editMode ? initialValue : {}}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            layout="vertical"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            rules={[{ required: !editMode, message: "Please upload image!" }]}
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

          {editMode && <Image className="w-full" src={initialValue.imageUrl} />}

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

          <Form.Item<FieldType>
            label="Description - (Optional)"
            layout="vertical"
            name="description"
            rules={[]}
          >
            <TextArea
              className="w-full"
              placeholder="Enter Product's Fee"
              rows={4}
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
