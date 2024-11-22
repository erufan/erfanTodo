"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Table, Pagination, Button } from "antd";
import DeleteButton from "./DeleteButton";
import ToDo from "@/interface/ToDo";
import { useEffect, useState } from "react";
import CustomTableSkeleton from "./CustomTableSkeleton";

interface Props {
  dataSource: ToDo[];
  total: number;
  currentPage: number;
  pageSize: number;
}

const TableToDo = ({ dataSource, total, currentPage, pageSize }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (dataSource) setLoading(false);
  }, [dataSource]);

  const handlePageChange = (page: number, pageSize: number) => {
    setLoading(true);
    router.push(`/?page=${page}&pageSize=${pageSize}`, { scroll: false });
  };
  return (
    <>
      <CustomTableSkeleton loading={loading} rows={pageSize}>
        <Table
          dataSource={dataSource}
          columns={columns}
          rowKey="id"
          pagination={false}
        />
      </CustomTableSkeleton>

      <Pagination
        current={currentPage}
        total={total}
        pageSize={pageSize}
        onChange={handlePageChange}
      />
    </>
  );
};

export default TableToDo;

const columns = [
  {
    title: "Todo",
    dataIndex: "todo",
    key: "todo",
    sorter: (a: ToDo, b: ToDo) => a.todo.localeCompare(b.todo),
  },
  {
    title: "Completed",
    dataIndex: "completed",
    key: "completed",
    render: (_: any, record: ToDo) => (record.completed ? "✅" : "❌"),
    sorter: (a: ToDo, b: ToDo) => Number(a.completed) - Number(b.completed),
  },
  {
    title: "User ID",
    dataIndex: "userId",
    key: "userId",
    sorter: (a: ToDo, b: ToDo) => a.userId - b.userId,
  },
  {
    title: "Actions",
    key: "actions",
    render: (_: any, record: ToDo) => (
      <>
        <Link href={`/add-task/${record.id}`} scroll={false}>
          <Button type="primary" style={{ marginRight: 8 }}>
            Edit
          </Button>
        </Link>
        <DeleteButton toDoid={record.id} />
      </>
    ),
  },
];
