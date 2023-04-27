import React, { useEffect } from "react";
import { Table, Button, Radio } from "antd";
import { useMutation } from "@tanstack/react-query";
import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import TodoService from "../services/todolist";
import { DeleteOutlined } from "@ant-design/icons";

const antIcon = (
  <LoadingOutlined
    style={{
      fontSize: 24,
    }}
    spin
  />
);
export default function ListOfTodos({ isLoadingTodos, filtered, state }) {
  const deleteTodo = useMutation({
    mutationFn: (id) => TodoService.DeleteTodo(id),
  });
  const updateIsDone = useMutation({
    mutationFn: (id) => TodoService.updateTodo(id),
  });
  useEffect(() => {
    if (deleteTodo.isSuccess && deleteTodo.data !== undefined) {
      state.todos = state.todos.filter(
        (todo) => todo.id !== parseInt(deleteTodo.data)
      );
    }
  }, [deleteTodo.isLoading]);
  useEffect(() => {
    if (updateIsDone.isSuccess && updateIsDone.data !== undefined) {
      const todo = state.todos.find(
        (todo) => todo.id === parseInt(updateIsDone.data)
      );
      todo.is_done = todo.is_done ? 0 : 1;
    }
  }, [updateIsDone.isLoading]);
  const onChange = (e) => {
    updateIsDone.mutate(e.target.name);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Due Date",
      key: "due_date",
      dataIndex: "due_date",
    },
    state.updatePermission ? (
      {
        title: "Done",
        key: "is_done",
        render: (a, record) => (
          <Radio.Group
            name={record.id}
            value={record.is_done ? 1 : 0}
            size="large"
          >
            <Radio.Button value={1} onChange={onChange}>
              Done
            </Radio.Button>
            <Radio.Button value={0} onChange={onChange}>
              Not Done
            </Radio.Button>
          </Radio.Group>
        ),
      }
    ) : (
      <></>
    ),
    state.deletePermission ? (
      {
        title: "Action",
        dataIndex: "",
        key: "x",
        render: (_, record) => (
          <Button
            id={record.id}
            shape="circle"
            icon={<DeleteOutlined />}
            onClick={() => deleteTodo.mutate(record.id)}
          />
        ),
      }
    ) : (
      <></>
    ),
  ];

  return isLoadingTodos ? (
    <Spin indicator={antIcon} />
  ) : (
    <Table columns={columns} dataSource={filtered} />
  );
}
