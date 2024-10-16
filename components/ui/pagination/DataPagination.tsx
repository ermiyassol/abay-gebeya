import { Button, Pagination } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

export const DataPagination = () => {
  return (
    <div className="w-full flex justify-between my-5 mx-10">
      <Button className="rounded-full px-6" icon={<ArrowLeftOutlined />} iconPosition="start">
        Prev
      </Button>
      <Pagination defaultCurrent={1} total={50} />
      <Button className="rounded-full px-6" icon={<ArrowRightOutlined />} iconPosition="end">
        Next
      </Button>
    </div>
  );
};
