import { RunAPI } from "../utils/RunApi";

var ENDPOINT = "http://localhost:9001/api/v1/";

export const getMachine = async () => {
  const url = `${ENDPOINT}machine`;
  const res = await RunAPI("GET", url, {});
  return res;
};

export const getMachineFull = async () => {
  const url = `${ENDPOINT}machine/full`;
  const res = await RunAPI("GET", url, {});
  return res;
};

export const getMachineEmpty = async () => {
  const url = `${ENDPOINT}machine/empty`;
  const res = await RunAPI("GET", url, {});
  return res;
};

export const createMachine = async (data) => {
  const url = `${ENDPOINT}machine`;
  const res = await RunAPI("POST", url, data);
  return res;
};

export const updateMachine = async (data) => {
  const url = `${ENDPOINT}machine`;
  const res = await RunAPI("PUT", url, data);
  return res;
};
export const deleteMachine = async (id) => {
  const url = `${ENDPOINT}machine/${id}`;
  const res = await RunAPI("DELETE", url, {});
  return res;
};
