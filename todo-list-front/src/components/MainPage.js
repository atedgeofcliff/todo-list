import { Layout } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import ListOfTodos from "./ListOfTodos";
import AddTodo from "./AddTodo";
import { useQuery } from "@tanstack/react-query";
import TodoService from "../services/todolist";
import { proxy, useSnapshot } from "valtio";
import { Radio } from "antd";
import Filter from "./Filter";

const state = proxy({
  filter: "all",
  filteredStartDate: null,
  filteredEndDate: null,
  todos: [],
});

const UseDateFilterTodos = (filteredStartDate, filteredEndDate) => {};

const useFilteredTodos = () => {
  const { filter, todos, filteredStartDate, filteredEndDate } =
    useSnapshot(state);
  let filteredTodos = todos;
  if (filter === "done") {
    console.log("bayrak1111");
    filteredTodos = filteredTodos.filter((todo) => todo.is_done === 1);
  }
  if (filter === "not_done") {
    console.log("bayrak222");

    filteredTodos = filteredTodos.filter((todo) => todo.is_done === 0);
  }
  console.log(filteredStartDate, filteredEndDate);
  if (filteredStartDate !== null && filteredEndDate !== null) {
    console.log("bayrak333");

    filteredTodos = filteredTodos.filter((todo) => {
      const date = todo.due_date;
      return (
        Date.parse(date) >= Date.parse(filteredStartDate) &&
        Date.parse(date) <= Date.parse(filteredEndDate)
      );
    });
    // return todos.filter((todo) => todo.due_date === 0);
  }
  return filteredTodos;
};
export default function MainPage() {
  const [allTodos, setAllTodos] = useState([]);
  const { data: todos, isLoading: isLoadingTodos } = useQuery(["todos"], () =>
    TodoService.getTodos()
  );

  const filtered = useFilteredTodos();
  console.log("filtereddddd", filtered);
  useEffect(() => {
    if (!isLoadingTodos) {
      // setAllTodos(todos);
      state.todos = todos;
    }
  }, [isLoadingTodos]);

  return (
    <Layout>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1,
          width: "100%",
        }}
      >
        sadadsa
        <div
          style={{
            float: "left",
            width: 120,
            height: 31,
            margin: "16px 24px 16px 0",
            background: "rgba(255, 255, 255, 0.2)",
          }}
        />
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "0 50px",
        }}
      >
        <Filter state={state} />
        <AddTodo
          // allTodos={allTodos}
          state={state}
          // setAllTodos={setAllTodos}
        />
        <ListOfTodos
          isLoadingTodos={isLoadingTodos}
          filtered={filtered}
          state={state}
          // setAllTodos={setAllTodos}
        ></ListOfTodos>
      </Content>
    </Layout>
  );
}

/*  const addnewTodo = (e) => {
    console.log("eeeeeee", e);
    setAllTodos([...allTodos, e]);
  }; */

/* <Row className="row">
            <Col flex="2 1 5%">
              <Input placeholder="Name" />
            </Col>
            <Col flex="2 1 5%">
              <DatePicker size={"middle"} />
            </Col>
            <Col flex="2 1 5%">
              <TextArea placeholder="Description" rows={4} />
            </Col>
          </Row> */
