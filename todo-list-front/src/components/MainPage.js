import { Layout } from "antd";
import { Content } from "antd/es/layout/layout";
import React, { useEffect } from "react";
import ListOfTodos from "./ListOfTodos";
import AddTodo from "./AddTodo";
import { useQuery } from "@tanstack/react-query";
import TodoService from "../services/todolist";
import { useSnapshot } from "valtio";
import Filter from "./Filter";
import { state } from "../services/state";
import AppSideMenu from "./AppPages/AppSideMenu";
import AppHeader from "./AppPages/AppHeader";

const useFilteredTodos = () => {
  const { filter, todos, filteredStartDate, filteredEndDate } =
    useSnapshot(state);
  let filteredTodos = todos;
  if (filter === "done") {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.is_done === 1 || todo.is_done === true
    );
  }
  if (filter === "not_done") {
    filteredTodos = filteredTodos.filter(
      (todo) => todo.is_done === 0 || todo.is_done === false
    );
  }
  if (filteredStartDate !== null && filteredEndDate !== null) {
    filteredTodos = filteredTodos.filter((todo) => {
      const date = todo.due_date;
      return (
        Date.parse(date) >= Date.parse(filteredStartDate) &&
        Date.parse(date) <= Date.parse(filteredEndDate)
      );
    });
  }
  return filteredTodos;
};
export default function MainPage() {
  const { data: todos, isLoading: isLoadingTodos } = useQuery(["todos"], () =>
    TodoService.getTodos()
  );

  const filtered = useFilteredTodos();
  useEffect(() => {
    if (!isLoadingTodos) {
      state.todos = todos;
    }
  }, [isLoadingTodos]);

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <AppSideMenu></AppSideMenu>
      <Layout>
        <AppHeader></AppHeader>

        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
          }}
        >
          {state.createPermission ? <AddTodo state={state} /> : <></>}
          <Filter state={state} />
          <ListOfTodos
            isLoadingTodos={isLoadingTodos}
            filtered={filtered}
            state={state}
          ></ListOfTodos>
        </Content>
      </Layout>
    </Layout>
  );
}
