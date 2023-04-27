import axios from "./axios";
export default class UserService {
  static login(data) {
    return axios({
      url: "/login",
      method: "POST",
      data: data,
    });
  }
  static getUsers() {
    return axios({
      url: "/users",
      method: "GET",
    });
  }
  static updatePermission(data) {
    return axios({
      url: `/UpdateUsersPermission`,
      method: "POST",
      data: data,
    });
  }
  static addNewUser(data) {
    return axios({
      url: `/users`,
      method: "POST",
      data: data,
    });
  }
  static getPermissions(id) {
    return axios({
      url: `/usersPermissions/${id}`,
      method: "GET",
    });
  }
}
