import { RunAPI } from "../utils/RunApi";

var ENDPOINT = "http://localhost:9001/api/v1/";

export const getAllConfigs = async (machineId) => {
  const url = `${ENDPOINT}maximum?machineId=${machineId}`;
  const res = await RunAPI("GET", url, {});
  return res;
};

export const getTransection = async (machineId) => {
  const url = `${ENDPOINT}transections?machineId=${machineId}&limit=100`;
  const res = await RunAPI("GET", url, {});
  return res;
};

export const paymentReceive = async (data) => {
  const url = `${ENDPOINT}receive`;
  const res = await RunAPI("POST", url, data);
  return res;
};

export const adminDeposit = async (data) => {
  const url = `${ENDPOINT}deposit`;
  const res = await RunAPI("PUT", url, data);
  return res;
};

export const adminWithdraw = async (data) => {
  const url = `${ENDPOINT}withdraw`;
  const res = await RunAPI("PUT", url, data);
  return res;
};
