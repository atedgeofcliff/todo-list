import { Button, DatePicker, Form, Input, Space, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import TodoService from "../services/todolist";
import { useMutation } from "@tanstack/react-query";

export default function AddTodo({ state }) {
  const [newTodoData, setNewTodoData] = useState({
    name: "",
    description: "",
    due_date: "",
    is_done: false,
    user_id: localStorage.getItem("user"),
  });
  const onFinish = () => {
    message.success("Submit success!");
  };
  const onFinishFailed = () => {
    message.error("Submit failed!");
  };
  const control = () => {
    newTodoData.name && newTodoData.description && newTodoData.due_date
      ? addNewTodo.mutate(newTodoData)
      : message.error("Please fill in the blanks!");
  };

  const onChange = (e, str = null) => {
    if (str != null) {
      setNewTodoData({ ...newTodoData, due_date: str });
    } else {
      setNewTodoData({ ...newTodoData, [e.target.id]: e.target.value });
    }
  };
  const addNewTodo = useMutation({
    mutationFn: (newData) => TodoService.addTodo(newData),
  });
  useEffect(() => {
    if (addNewTodo?.data && addNewTodo?.isSuccess) {
      state.todos.push(addNewTodo.data);
    }
  }, [addNewTodo.isLoading]);

  return addNewTodo.isLoading ? (
    "Loooooodiiiiiiiiiiiinggggg........"
  ) : (
    <div
      style={{
        padding: 24,
        minHeight: 180,
        background: "#fff",
        marginTop: 35,
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space wrap style={{ width: "100%", justifyContent: "center" }}>
          <Form
            name="control-hooks"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              name="Name"
              label="Name"
              rules={[
                {
                  required: true,
                  message: "Name cannot be empty",
                },
                {
                  type: "string",
                },
              ]}
            >
              <Input
                placeholder="Name"
                flex="1 0 25%"
                id="name"
                onChange={onChange}
              />
            </Form.Item>

            <Form.Item
              name="due_date"
              label="Due Date"
              rules={[
                {
                  required: true,
                  message: "Date cannot be empty",
                },
              ]}
            >
              <DatePicker
                size={"middle"}
                flex="1 0 25%"
                id="due_date"
                onChange={onChange}
              />
            </Form.Item>
            <Form.Item
              name="Description"
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Description cannot be empty",
                },
              ]}
            >
              <TextArea
                placeholder="Description"
                flex="1 0 25%"
                rows={4}
                id="description"
                onChange={(e) => onChange(e)}
              />
            </Form.Item>
          </Form>
        </Space>
      </Space>
      <Button type="primary" htmlType="submit" onClick={() => control()}>
        Add
      </Button>
    </div>
  );
}
