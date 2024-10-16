import Image from "next/image";
import { EditOutlined } from "@ant-design/icons";
import { Button, Switch } from "antd";

interface PropsData {
  width?: string; // 300 default
  data: DataType;
}

interface DataType {
  basePrice: number;
  code: string;
  description: string;
  featured: boolean;
  id: number;
  imageUrl: string;
  name: string;
}

export function AdminProductItem({ width, data }: PropsData) {
  const onFutureChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div
      className={`relative inline-block bg-white hover:bg-green-50 w-${
        width ? width : "[250px]"
      } rounded-md shadow-sm hover:shadow-md`}
    >
      <div className="flex justify-start">
        <div className="w-7/12 grid content-between p-5">
          <div className="flex justify-between">
            <h5 className="font-medium text-[15px] flex items-start text-gray-400">
              { data.name }
            </h5>
            <Button icon={<EditOutlined />} size="small" />
          </div>
          <div>
            <div className="flex justify-between">
              <h5 className="font-medium text-[14px] flex items-end text-gray-400">
                Base Price
              </h5>
              <h2 className="font-bold text-[14px] flex items-end text-gray-900">
                { data.basePrice } Birr
              </h2>
            </div>
            {/* <div className="flex justify-between">
              <h5 className="font-medium text-[14px] flex items-end text-gray-400">
                Fee
              </h5>
              <h2 className="font-bold text-[14px] flex items-end text-gray-900">
                40,000 Birr
              </h2>
            </div> */}
            <div className="flex justify-between">
              <h5 className="font-medium text-[14px] flex items-end text-gray-400">
                Future
              </h5>
              <Switch className="self-center" value={data.featured} defaultChecked onChange={onFutureChange} size="small" />
            </div>
          </div>
        </div>
        <img
          className="w-5/12 h-full"
          src={data.imageUrl} // Replace with your image URL
          alt="Product Image"
        />
      </div>
    </div>
  );
}
