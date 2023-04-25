import React, { useCallback, useEffect, useState } from "react";
import { Checkbox, Table, Space, Button, Radio } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
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
      // console.log("todo", todo);
    }
  }, [updateIsDone.isLoading]);
  const onChange = (e) => {
    updateIsDone.mutate(e.target.name);
    // console.log("e", e);
    // console.log(`checked = ${e.target.checked}`);
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
    },
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
    },
  ];

  return isLoadingTodos ? (
    <Spin indicator={antIcon} />
  ) : (
    <Table columns={columns} dataSource={filtered} />
  );
}
//deleteTodo
/*  setAllTodos((allTodos) =>
        allTodos.filter((todo) => todo.id !== parseInt(deleteTodo.data))
      ); */

//update specific todo isdone key
/*const updatedIndex = allTodos.findIndex(
        (todo) => todo.id === parseInt(updateIsDone.data)
      );
      setAllTodos((allTodos) => {
        const updatedTodosState = [...allTodos];
        const todo = updatedTodosState[updatedIndex];
        updatedTodosState[updatedIndex] = { ...todo, is_done: !todo.selected };
        return updatedTodosState;
      }); */

//get todos old
// const { data: todos, isLoading: isLoadingTodos } = useQuery(["todos"], () =>
//   TodoService.getTodos()
// );
// const allTodos = isLoadingTodos ? [] : Object.values(todos);
// // useEffect(() => {
// if (allTodos.length > 0) {
//   console.log("alltodos değiştiiiiiiii", allTodos);
//   // props.setTodos(allTodos);
//   // firstLoad(allTodos);
// }
// // }, [allTodos]);

/* function wait(duration) {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}
 */
/* 


// const fakeData = [
//   { id: 1, name: "todo1", dueDate: "11/22/22", desc: "sdasda", done: true },
//   { id: 2, name: "todo2", dueDate: "11/22/22", desc: "sdasda", done: false },
//   { id: 3, name: "todo3", dueDate: "11/22/22", desc: "sdasda", done: true },
// ];
 // const [todos, setTodos] = useState([]);
  // const [isLoadingTodos, setIsLoadingTodos] = useState(false);
  // useEffect(() => {
  //   TodoService.getTodos()
  //     .then((res) => {
  //       setTodos(res);
  //     })
  //     .finally(() => {
  //       setIsLoadingTodos(true);
  //     });
  // }, []);
  
    // const todoQuery = useQuery({
  //   queryKey: "todos",
  //   queryFn: () => wait(1000).then(() => [...fakeData]),
  // });
    // const newTodos = useMutation({
    // mutationFn: (title) =>
    //   wait(1000).then(() =>
    //     fakeData.push({
    //       id: 4,
    //       name: title,
    //       dueDate: "11/22/22",
    //       desc: "sdasda",
    //       done: false,
    //     })
    //   ),
  });

  // if (todoQuery.isLoading) {
  //   return <div>Loading...</div>;
  // }
  // if (todoQuery.isError) {
  //   return <div>{JSON.stringfy(todoQuery.error)}</div>;
  // }
  */

/*  <List
        className="demo-loadmore-list"
        itemLayout="horizontal"
        dataSource={allTodos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <a key="list-loadmore-edit">edit</a>,
              <a key="list-loadmore-more">more</a>,
              <Checkbox checked={item.is_done} onChange={onChange}>
                Done
              </Checkbox>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              avatar={<Checkbox checked={item.is_done} onChange={onChange} />}
            />
            <List.Item.Meta title={item.description} />
            <List.Item.Meta title={item.due_date} />
          </List.Item>
        )}
      /> */
