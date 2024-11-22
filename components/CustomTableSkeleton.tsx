import { Skeleton, Table } from "antd";
import React from "react";
import "./CustomTableSkeleton.css";

interface Props {
  loading: boolean;
  rows: number;
  children: React.ReactNode;
}

const CustomTableSkeleton = ({ loading, rows, children }: Props) => {
  const columns = [
    {
      title: <Skeleton.Input active={true} />,
      dataIndex: "todo",
      key: "todo",
      className: "todo-column",
    },
    {
      title: <Skeleton.Input active={true} />,
      dataIndex: "completed",
      key: "completed",
      className: "completed-column",
    },
    {
      title: <Skeleton.Input active={true} />,
      dataIndex: "userId",
      key: "userId",
      className: "userId-column",
    },
    {
      title: <Skeleton.Input active={true} />,
      dataIndex: "actions",
      key: "actions",
      className: "actions-column",
    },
  ];

  const INITIAL_PAGE_SIZE = 10;
  const data = Array.from({ length: rows || INITIAL_PAGE_SIZE }).map(
    (_, index) => ({
      key: index,
      todo: <Skeleton.Input active={true} />,
      completed: <Skeleton.Input active={true} />,
      userId: <Skeleton.Input active={true} />,
      actions: (
        <>
          <Skeleton.Button active={true} style={{ marginRight: 8 }} />
          <Skeleton.Button active={true} />
        </>
      ),
    })
  );

  return (
    <>
      {loading ? (
        <Table
          className="responsive-table"
          columns={columns}
          dataSource={data}
          pagination={false}
        />
      ) : (
        children
      )}
    </>
  );
};

export default CustomTableSkeleton;
