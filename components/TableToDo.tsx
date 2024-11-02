"use client";
import React from "react";
import { Button, Table } from "antd";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import ToDo from "@/interface/ToDo";

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

const TableToDo = ({ dataSource }: { dataSource: ToDo[] }) => {
  return <Table dataSource={dataSource} columns={columns} rowKey="id" />;
};

export default TableToDo;
