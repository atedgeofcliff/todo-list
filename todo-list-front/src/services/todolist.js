import axios from "./axios";
// export const getTodos = () => (dispatch) => {
//   return axios
//     .get("allTodos")
//     .then((res) => {
//       console.log("res", res);
//     })
//     .catch((e) => {
//       console.log("e.message", e.message);
//     });
// };

export default class TodoService {
  static getTodos() {
    return axios({
      url: "/todos",
      method: "GET",
    });
  }
  static updateTodo(id) {
    return axios({
      url: `/todos/${id}`,
      method: "PUT",
    });
  }
  static addTodo(data) {
    console.log("data", data);
    return axios({
      url: `/todos`,
      method: "POST",
      data: data,
    });
  }
  static DeleteTodo(id) {
    return axios({
      url: `/todos/${id}`,
      method: "DELETE",
    });
  }
}
