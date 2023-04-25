import axios from "axios";

// const token = localStorage.getItem("token");
// export default axios.create({
//   baseURL: `http://localhost:80/`,
//   headers: {
//     "Content-Type": "application/json",
//     // Authorization: `Bearer ${token}`,
//   },
// });

const client = (() => {
  return axios.create({
    baseURL: `http://localhost:82/api`,
    headers: {
      "Content-Type": "application/json",
      // Authorization: `Bearer ${token}`,
    },
  });
})();

const request = async function (options, store) {
  const onSuccess = function (response) {
    const {
      data: { data },
    } = response;
    return data;
  };
  const onError = function (error) {
    return Promise.reject(error.response);
  };
  return client(options).then(onSuccess).catch(onError);
};
export default request;
