import Image from "next/image";

interface PropsData {
  width?: string; // 300 default
}

export function ProductItem({width}: PropsData) {
  return (
    <div className={`relative inline-block bg-white hover:bg-green-50 w-${width ? width : "[250px]"} rounded-md shadow-sm hover:shadow-md`}>
      <div className="flex justify-start">
        <h2 className="absolute  top-0 left-0 rounded-tl-md w-[45px] font-normal text-[12px] leading-[18px] text-center text-white bg-green-600 flex-none order-0 flex-grow-0">
          New
        </h2>
        <div className="w-7/12 content-end p-5">
          <h5 className="font-medium text-[12px] flex items-end text-gray-400">
            Product Name Here
          </h5>
          <h2 className="font-bold text-[16px] flex items-end text-gray-900">
            40,000 Birr
          </h2>
        </div>
        <img
          className="w-5/12 h-full"
          src="https://static.vecteezy.com/system/resources/thumbnails/024/841/285/small_2x/wireless-headphone-isolated-on-transparent-background-high-quality-bluetooth-headphone-for-advertising-and-product-catalogs-generative-ai-png.png" // Replace with your image URL
          alt="Product Image"
        />
      </div>
    </div>
  );
}
