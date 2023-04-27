import { proxy } from "valtio";

export const state = proxy({
  filter: "all",
  filteredStartDate: null,
  filteredEndDate: null,
  todos: [],
  createPermission: true,
  readPermission: true,
  updatePermission: true,
  deletePermission: true,
  masterPermissions: [],
  userId: null,
});
