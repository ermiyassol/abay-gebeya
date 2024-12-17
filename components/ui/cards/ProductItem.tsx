import Image from "next/image";

interface PropsData {
  width?: string; // 300 default
  data: DataType;
  onItemSelected: any;
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

export function ProductItem({width, data, onItemSelected}: PropsData) {
  return (
    <div onClick={() => onItemSelected(data)} className={`relative inline-block bg-white hover:bg-green-50 w-${width ? width : "[250px]"} rounded-md shadow-sm hover:shadow-md`}>
      <div className="flex justify-start">
        <h2 className="absolute  top-0 left-0 rounded-tl-md w-[45px] font-normal text-[12px] leading-[18px] text-center text-white bg-green-600 flex-none order-0 flex-grow-0">
          New
        </h2>
        <div className="w-7/12 content-end p-5">
          <h5 className="font-medium text-[12px] flex items-end text-gray-400">
          { data.name }
          </h5>
          <h2 className="font-bold text-[16px] flex items-end text-gray-900">
          { data.basePrice } Birr
          </h2>
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
