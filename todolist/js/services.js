export default class Services {
  fetchData() {
    return axios({
      url: "https://625bc0d2398f3bc782ae7e24.mockapi.io/api/todoList",
      method: "GET",
    });
  }
  deleteItemById(id) {
    return axios({
      url: `https://625bc0d2398f3bc782ae7e24.mockapi.io/api/todoList/${id}`,
      method: "DELETE",
    });
  }
  addItem(data) {
    return axios({
      url: "https://625bc0d2398f3bc782ae7e24.mockapi.io/api/todoList",
      method: "POST",
      data: data,
    });
  }

  updateItem(id, data) {
    return axios({
      url: `https://625bc0d2398f3bc782ae7e24.mockapi.io/api/todoList/${id}`,
      method: "PUT",
      data: data,
    });
  }
}
