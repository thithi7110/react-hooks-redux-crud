import http from "../http-common";

const getAll = () => {
  return http.get("/tutorials/jyu/jyu");
};

const get = id => {
  return http.get(`/tutorials/jyu/${id}`);
};

const create = data => {
  return http.post("/tutorials/jyu", data);
};

const update = (id, data) => {
  return http.put(`/tutorials/jyu/${id}`, data);
};

const remove = id => {
  return http.delete(`/tutorials/jyu/${id}`);
};

const removeAll = () => {
  return http.delete(`/tutorials/jyu`);
};

const findByTitle = title => {
  return http.get(`/tutorials/jyu?title=${title}`);
};

const jyus001 = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle
};

export default jyus001;
