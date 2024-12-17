import { Button, Form, FormProps, Input, message, Modal } from "antd";
import { useState } from "react";
import { LoadingSpinner } from "../loading-spinner/LoadingSpinner";
import { MinusOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { confirmOrder, createOrder } from "@/app/actions/abay-gebeya/orders";

type PropsData = {
  open: boolean;
  handleOk: any;
  handleCancel: any;
  data: any;
};

export const ProductRequest = ({
  open,
  handleOk,
  handleCancel,
  data,
}: PropsData) => {
  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [order, setOrder] = useState<any>();

  const onError = (errorMessage: string) => {
    message.error(errorMessage);
    setLoading(false);
  }

  const requestOrder = async () => {
    console.log(order ? "CONFIRM ORDER" : "REQUEST ORDER");
    setLoading(true);

    if(!order) {
        const response = await createOrder({
          quantity: quantity,
          productId: data.id,
        });
        if (response.error) {
            onError(response.error)
            return;
        }
        message.success("Confirm Your Order Request!");
        setOrder(response.data);
    } else {
        const response = await confirmOrder(order.id);
        if (response.error) {
            onError(response.error)
            return;
        }
        message.success("Order Requested Successfully!");
        handleOk();
    }
    setLoading(false);
  };

  return (
    <Modal
      open={open}
      title="Request Order"
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[]}
      width={600}
    >
      {isLoading && <LoadingSpinner />}
      {!isLoading && (
        <div className={`relative inline-block bg-white w-full`}>
          <div className="flex justify-center">
            <div className="w-1/2 grid content-around p-5">
              <div className="font-mona-sans capitalize font-semibold text-[20px] text-center text-black flex-none order-0 grow-0">
                {data?.name}
              </div>
              {order && <div className="space-y-1">
                <div className="flex justify-between">
                  <h3 className="font-mona-sans font-normal  text-[15px] leading-[15px] flex items-end text-black flex-none order-0 grow-0">
                    Quantity
                  </h3>
                  <h3 className="font-mona-sans font-normal  text-[15px] leading-[15px] flex items-end text-black flex-none order-0 grow-0">
                    { order?.requestedQuantity }
                  </h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-mona-sans font-normal  text-[15px] leading-[15px] flex items-end text-black flex-none order-0 grow-0">
                    Single Unit Fee
                  </h3>
                  <h3 className="font-mona-sans font-normal  text-[15px] leading-[15px] flex items-end text-black flex-none order-0 grow-0">
                  { order?.amount } birr
                  </h3>
                </div>
                <div className="flex justify-between">
                  <h3 className="font-mona-sans font-normal  text-[15px] leading-[15px] flex items-end text-black flex-none order-0 grow-0">
                    Total Payment
                  </h3>
                  <h3 className="font-mona-sans font-normal  text-[15px] leading-[15px] flex items-end text-black flex-none order-0 grow-0">
                  { order?.requestedQuantity } X { order?.amount }  birr
                  </h3>
                </div>
                <div className="flex justify-end border-t-2">
                  <h3 className="font-mona-sans font-bold mt-1  text-[15px] leading-[15px] flex items-end text-black flex-none order-0 grow-0">
                    { order?.requestedQuantity * order?.amount } birr
                  </h3>
                </div>
              </div>}
              {!order && <div className="mx-auto flex justify-center space-x-3">
                <Button
                  size="small"
                  type="primary"
                  shape="circle"
                  icon={<MinusOutlined />}
                  disabled={quantity <= 1}
                  onClick={() =>
                    setQuantity((prev: number) => (prev > 1 ? prev - 1 : prev))
                  }
                />
                <h3 className="font-lato font-medium text-[19px] leading-[9px] flex items-center text-center text-black grow-0">
                  {quantity}
                </h3>

                <Button
                  size="small"
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={() => setQuantity((prev: number) => prev + 1)}
                />
              </div>}
            </div>
            <div className="w-1/2 p-5">
              <img
                className="w-full h-full"
                src={data?.imageUrl} // Replace with your image URL
                alt="Product Image"
              />
            </div>
          </div>
          <div className="flex space-x-5">
            <Button
              className="w-full rounded-full"
              type="default"
              htmlType="reset"
              onClick={handleCancel}
            >
              Cancel
            </Button>

            <Button
              className="w-full rounded-full"
              type="primary"
              htmlType="submit"
              onClick={requestOrder}
            >
              {order ? "Confirm" : "Request"} Order
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
};
