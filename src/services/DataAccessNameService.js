import http from "../http-common";

const findByShohinCd = shohincd => {
  return http.get(`/mst/shohin?shohincd=${shohincd}`);
};
const findByTokuiCd = tokuicd => {
  return http.get(`/mst/tokui?tokuicd=${tokuicd}`);
};

const DataAccessNameService = {
  findByShohinCd,
  findByTokuiCd,
};

export default DataAccessNameService;
