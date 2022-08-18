import http from "../http-common";

const getAll = () => {
  return http.get("/jyu/jyu");
};

const get = id => {
  return http.get(`/jyu/${id}`);
};

const create = data => {
  return http.post("/jyu", data);
};

const update = (id, data) => {
  return http.put(`/jyu/${id}`, data);
};

const remove = id => {
  return http.delete(`/jyu/${id}`);
};

const removeAll = () => {
  return http.delete(`/jyu`);
};

const findById = id => {
  return http.get(`/jyu?id=${id}`);
};
const login = (data) => {
  return http.post(`/login`,data);
};

const jyus001 = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findById,
  login
};

export default jyus001;
