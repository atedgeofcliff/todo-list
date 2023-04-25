import { Button, DatePicker, Input, Space } from "antd";
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
  });

  const onChange = (e, str = null) => {
    if (str != null) {
      setNewTodoData({ ...newTodoData, due_date: str });
    } else {
      setNewTodoData({ ...newTodoData, [e.target.id]: e.target.value });
    }
    console.log("newTodoData", newTodoData);
  };
  const addNewTodo = useMutation({
    mutationFn: (newData) => TodoService.addTodo(newData),
  });
  useEffect(() => {
    if (addNewTodo.data !== undefined && addNewTodo.isSuccess) {
      // setAllTodos([...allTodos, addNewTodo.data]);
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
      }}
    >
      <Space direction="vertical" style={{ width: "100%" }}>
        <Space wrap style={{ width: "100%", justifyContent: "center" }}>
          <Input
            placeholder="Name"
            flex="1 0 25%"
            id="name"
            onChange={onChange}
          />
          <DatePicker
            size={"middle"}
            flex="1 0 25%"
            id="due_date"
            onChange={onChange}
          />
          <TextArea
            placeholder="Description"
            flex="1 0 25%"
            rows={4}
            id="description"
            onChange={(e) => onChange(e)}
          />
        </Space>
      </Space>
      <Button
        type="primary"
        htmlType="submit"
        onClick={() => addNewTodo.mutate(newTodoData)}
      >
        Add
      </Button>
    </div>
  );
}

//add new todo usemutation
/* 

  //   const {
  //     data: todos,
  //     isLoading: isLoadingAddTodo,
  //     mutate: addTodo,
  //   } = useMutation((newTodoData) => TodoService.addTodo(newTodoData));
 */
