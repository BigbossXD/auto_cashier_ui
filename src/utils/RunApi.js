import axios from "axios";

const toErrorHandleLog = (error) => {
  if (error.response) {
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  const errorData = {
    _error: true,
    _error_data: error,
  };
  return errorData;
};

export const RunAPI = async (Method, Url, Data) => {
  if (Method === "GET") {
    try {
      const response = await axios.get(Url);
      return response.data;
    } catch (error) {
      return toErrorHandleLog(error);
    }
  }
  if (Method === "POST") {
    try {
      const response = await axios.post(Url, Data);
      //console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return toErrorHandleLog(error);
    }
  }
  if (Method === "PUT") {
    try {
      const response = await axios.put(Url, Data);
      //console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return toErrorHandleLog(error);
    }
  }
  if (Method === "DELETE") {
    try {
      const response = await axios.delete(Url);
      //console.log(JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      return toErrorHandleLog(error);
    }
  }
};
