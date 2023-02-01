import { RunAPI } from "../utils/RunApi";

var ENDPOINT = "http://localhost:9001/api/v1/";

export const getAllConfigs = async (machineId) => {
  const url = `${ENDPOINT}configs?machineId=${machineId}`;
  const res = await RunAPI("GET", url, {});
  return res;
};

export const createConfig = async (data) => {
  const url = `${ENDPOINT}configs`;
  const res = await RunAPI("POST", url, data);
  return res;
};

export const deleteConfig = async (id) => {
  const url = `${ENDPOINT}configs/${id}`;
  const res = await RunAPI("DELETE", url, {});
  return res;
};

export const updateConfig = async (data) => {
  const url = `${ENDPOINT}configs`;
  const res = await RunAPI("PUT", url, data);
  return res;
};
