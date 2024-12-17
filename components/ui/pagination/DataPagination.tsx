import { Button, Pagination } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";

interface PropData {
  current: number;
  totalElements: number;
  onPageChange: any;
}

export const DataPagination = ({ current, totalElements, onPageChange }: PropData) => {
  const onchange = (newPageNumber: number) => {
    onPageChange({page: newPageNumber-1});
  };
  return (
    <div className="w-full flex justify-between my-5 mx-10">
      <Button
        className="rounded-full px-6"
        icon={<ArrowLeftOutlined />}
        iconPosition="start"
        disabled={current == 0}
      >
        Prev
      </Button>
      <Pagination onChange={onchange} defaultCurrent={current + 1} total={totalElements} />
      <Button
        className="rounded-full px-6"
        icon={<ArrowRightOutlined />}
        iconPosition="end"
        disabled={totalElements / 10 < current + 1}
      >
        Next
      </Button>
    </div>
  );
};
