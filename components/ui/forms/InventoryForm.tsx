import { createInventory, updateInventory } from "@/app/actions/abay-gebeya/inventories";
import { getAllProducts } from "@/app/actions/abay-gebeya/products";
import {
  Button,
  Form,
  FormProps,
  Input,
  InputNumber,
  message,
  Modal,
  Select,
} from "antd";
import { useEffect, useState } from "react";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";

type PropsData = {
  open: boolean;
  handleOk: any;
  handleCancel: any;
  initialValue?: FieldType;
  editMode: boolean;
};

type FieldType = {
  id: number;
  quantity: number;
  price: number;
  vendorName: string;
  vendorPhoneNumber: string;
  productId: number;
};

export const InventoryForm = ({ open, handleOk, handleCancel, initialValue, editMode }: PropsData) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    console.log("INITIAL VALUE - ", initialValue);
    const fetchProducts = async () => {
      const response = await getAllProducts();
      setProducts(response.data.content.map((itm: any) => { return {value: itm.id, label: itm.name}}))
      setLoading(false);
    }

    fetchProducts();
  }, [])

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    setLoading(true);
    if(editMode) {
      console.log("Initial Value - ", initialValue);
      console.log("Values - ", values);
      updateInventory(initialValue?.id!, values).then(() => {
        message.success("Inventory updated successfully!")
        handleOk();
      }, (error) => {
        message.error("Something wend wrong!, Please try again");
        console.log("ERROR - ", error);
        handleCancel();
      }).finally(() => {
        setLoading(false);
      })
    } else {
      createInventory(values).then(() => {
        message.success("Inventory added successfully!")
        handleOk();
      }, (error) => {
        message.error("Something wend wrong!, Please try again");
        console.log("ERROR - ", error);
        handleCancel();
      }).finally(() => {
        setLoading(false);
      })
    }
    
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Modal
      open={open}
      title={editMode ? "Inventory Updating Form" : "Inventory Adding Form"}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
    >
      {isLoading && <LoadingSpinner /> }
      {!isLoading && <Form
        name="basic"
        layout="vertical"
        initialValues={editMode ? initialValue : {}}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Vendor's Name"
          layout="vertical"
          name="vendorName"
          rules={[
            { required: true, message: "Please input vendor's name!" },
          ]}
        >
          <Input
            className="w-full"
            placeholder="Enter Vendor's Name"
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Phone Number"
          layout="vertical"
          name="vendorPhoneNumber"
          rules={[{ required: true, message: "Please input vendor's phone number!" }]}
        >
          <Input className="w-full" placeholder="Enter Vendor's Phone Number" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Product"
          layout="vertical"
          name="productId"
          rules={[{ required: true, message: "Please select product!" }]}
        >
          <Select
            placeholder="Select Product"
            options={products}
          />
        </Form.Item>

        <Form.Item<FieldType>
          label="Price"
          layout="vertical"
          name="price"
          rules={[{ required: true, message: "Please input product price!" }]}
        >
          <InputNumber className="w-full" placeholder="Enter Product's Price" />
        </Form.Item>

        <Form.Item<FieldType>
          label="Quantity"
          layout="vertical"
          name="quantity"
          rules={[
            { required: true, message: "Please input product quantity!" },
          ]}
        >
          <InputNumber
            className="w-full"
            placeholder="Enter Product's Quantity"
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
      </Form>}
    </Modal>
  );
};
